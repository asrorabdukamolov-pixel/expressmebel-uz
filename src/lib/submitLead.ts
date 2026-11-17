import { trackLead } from "./track";

/** Client-side: posts a lead (form or quiz) to /api/lead with page + UTM context, then fires ad conversions. */
export async function submitLead(payload: Record<string, unknown> & { segment: string; lang: string }) {
  const params = new URLSearchParams(window.location.search);
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      page: window.location.href,
      utm: Object.fromEntries([...params].filter(([k]) => k.startsWith("utm_"))),
    }),
  });
  if (!res.ok) throw new Error(String(res.status));
  trackLead(payload.segment);
}
