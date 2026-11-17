import "server-only";
import uz from "@/i18n/uz";
import { categoryIds, segmentIds } from "./site";

type QuizAnswers = {
  categories: string[];
  scale?: string;
  material?: string;
  timing?: string;
  channel?: string;
  /** Free-text "Other" answers keyed by question */
  other?: Partial<Record<"segment" | "category" | "scale" | "material" | "timing", string>>;
};
const otherKeys = ["segment", "category", "scale", "material", "timing"] as const;

export type Lead = {
  source: "form" | "quiz";
  quiz?: QuizAnswers;
  name: string;
  phone: string;
  company?: string;
  segment: string;
  category: string;
  message?: string;
  lang: string;
  page?: string;
  utm?: Record<string, string>;
  createdAt: string;
};

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Validates the raw form body. Returns null for bots (honeypot) or missing required fields. */
export function parseLead(body: Record<string, unknown>): Lead | null {
  if (clip(body.website, 200)) return null; // honeypot filled → bot
  const name = clip(body.name, 120);
  const phone = clip(body.phone, 40);
  if (!name || phone.replace(/\D/g, "").length < 7) return null;

  const segment = (segmentIds as readonly string[]).includes(String(body.segment)) ? String(body.segment) : "owners";
  const category = (categoryIds as readonly string[]).includes(String(body.category)) ? String(body.category) : "complex";
  const utmRaw = typeof body.utm === "object" && body.utm ? (body.utm as Record<string, unknown>) : {};
  const utm = Object.fromEntries(
    Object.entries(utmRaw)
      .filter(([k]) => /^utm_[a-z]{1,20}$/.test(k))
      .map(([k, v]) => [k, clip(v, 200)]),
  );

  const pickFrom = (v: unknown, allowed: object) => (typeof v === "string" && v in allowed ? v : undefined);
  const q = typeof body.quiz === "object" && body.quiz ? (body.quiz as Record<string, unknown>) : null;
  const steps = uz.quiz.steps;
  const quiz: QuizAnswers | undefined = q
    ? {
        categories: Array.isArray(q.categories)
          ? q.categories.filter((c): c is string => (categoryIds as readonly string[]).includes(String(c))).slice(0, 10)
          : [],
        scale: pickFrom(q.scale, steps.scale.options),
        material: pickFrom(q.material, steps.material.options),
        timing: pickFrom(q.timing, steps.timing.options),
        channel: pickFrom(q.channel, uz.quiz.contact.channels),
        other: (() => {
          const raw = typeof q.other === "object" && q.other ? (q.other as Record<string, unknown>) : {};
          const entries = otherKeys.map((k) => [k, clip(raw[k], 300)] as const).filter(([, v]) => v);
          return entries.length ? Object.fromEntries(entries) : undefined;
        })(),
      }
    : undefined;

  return {
    source: body.source === "quiz" ? "quiz" : "form",
    quiz,
    name,
    phone,
    company: clip(body.company, 160) || undefined,
    segment,
    category,
    message: clip(body.message, 2000) || undefined,
    lang: ["uz", "ru", "en"].includes(String(body.lang)) ? String(body.lang) : "uz",
    page: clip(body.page, 500) || undefined,
    utm: Object.keys(utm).length ? utm : undefined,
    createdAt: new Date().toISOString(),
  };
}

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

/** Telegram channel: TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID. */
async function toTelegram(lead: Lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  // Manager-facing labels always in Uzbek, whatever language the visitor used.
  const segLabel = uz.segments.items[lead.segment as keyof typeof uz.segments.items]?.tab ?? lead.segment;
  const catLabel = (id: string) => uz.catalog.items[id as keyof typeof uz.catalog.items] ?? id;
  const q = lead.quiz;
  const s = uz.quiz.steps;
  const o = q?.other ?? {};
  const own = (text?: string) => (text ? `Boshqa: «${esc(text)}»` : "");
  const cats = [...(q?.categories.map(catLabel) ?? []), own(o.category)].filter(Boolean);
  const pickLabel = (opts: Record<string, string>, id?: string, text?: string) => (id && opts[id]) || own(text);
  const lines = [
    `<b>🟢 Yangi ariza${lead.source === "quiz" ? " (kviz)" : ""}</b>`,
    `👤 ${esc(lead.name)}${lead.company ? ` · ${esc(lead.company)}` : ""}`,
    `📞 ${esc(lead.phone)}`,
    `🏷 ${o.segment ? own(o.segment) : segLabel} · ${cats.length ? cats.join(", ") : catLabel(lead.category)}`,
    q?.scale || o.scale ? `📐 Hajm: ${pickLabel(s.scale.options, q?.scale, o.scale)}` : "",
    q?.material || o.material ? `🪵 Material: ${pickLabel(s.material.options, q?.material, o.material)}` : "",
    q?.timing || o.timing ? `⏱ Muddat: ${pickLabel(s.timing.options, q?.timing, o.timing)}` : "",
    q?.channel ? `💬 Aloqa: ${uz.quiz.contact.channels[q.channel as keyof typeof uz.quiz.contact.channels]}` : "",
    `🌐 Til: ${lead.lang}`,
    lead.message ? `✉️ ${esc(lead.message)}` : "",
    lead.utm ? `📈 ${esc(Object.entries(lead.utm).map(([k, v]) => `${k}=${v}`).join(" "))}` : "",
  ].filter(Boolean);

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: lines.join("\n"), parse_mode: "HTML", disable_web_page_preview: true }),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}`);
  return true;
}

/**
 * CRM channel for the company's own ERP: POSTs the lead as JSON to CRM_WEBHOOK_URL
 * (optional bearer CRM_API_TOKEN). When the ERP's API spec arrives, map fields here.
 */
async function toCrm(lead: Lead) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.CRM_API_TOKEN ? { Authorization: `Bearer ${process.env.CRM_API_TOKEN}` } : {}),
    },
    body: JSON.stringify({ origin: "website", ...lead }),
  });
  if (!res.ok) throw new Error(`CRM ${res.status}`);
  return true;
}

/** Sends to every configured channel. Succeeds if at least one channel accepted the lead. */
export async function deliverLead(lead: Lead) {
  const results = await Promise.allSettled([toTelegram(lead), toCrm(lead)]);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);
  const configured = results.some((r) => r.status === "rejected" || r.value === true);
  results.forEach((r) => r.status === "rejected" && console.error("[lead] channel failed:", r.reason));

  if (!configured) {
    // No channel set up yet (local development): log so the lead is not silently lost.
    console.warn("[lead] no delivery channel configured; lead:", JSON.stringify(lead));
    return process.env.NODE_ENV !== "production";
  }
  return delivered;
}
