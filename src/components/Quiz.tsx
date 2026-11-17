"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/uz";
import type { Locale } from "@/i18n/config";
import { categoryIds, segmentIds } from "@/lib/site";
import { submitLead } from "@/lib/submitLead";

type SingleKey = "segment" | "scale" | "material" | "timing";
type QuestionKey = SingleKey | "category";
type StepKey = QuestionKey | "contact";
type Answers = Partial<Record<SingleKey, string>> & { categories: string[] };

const steps: StepKey[] = ["segment", "category", "scale", "material", "timing", "contact"];
const QUESTIONS = 5;
const OTHER = "other";

function Option({ selected, label, onClick, multi }: { selected: boolean; label: string; onClick: () => void; multi?: boolean }) {
  return (
    <button type="button" className="q-opt" aria-pressed={selected} onClick={onClick}>
      <span className={`q-mark${multi ? " q-mark-sq" : ""}`} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

/**
 * Five-question lead quiz. Every question also offers "Other" with a free-text answer.
 * All answers travel with the lead, so the manager calls already knowing the brief.
 */
export function Quiz({
  lang,
  t,
  lead,
  segments,
  categories,
}: {
  lang: Locale;
  t: Dictionary["quiz"];
  lead: Dictionary["lead"];
  segments: Dictionary["segments"]["items"];
  categories: Dictionary["catalog"]["items"];
}) {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({ categories: [] });
  const [other, setOther] = useState<Partial<Record<QuestionKey, string>>>({});
  const [channel, setChannel] = useState("telegram");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error" | "invalid">("idle");

  const key = steps[step];
  const go = (d: number) => setStep((s) => Math.min(steps.length - 1, Math.max(0, s + d)));

  const pick = (field: SingleKey, value: string) => {
    setA((prev) => ({ ...prev, [field]: value }));
    if (value !== OTHER) setTimeout(() => go(1), 220); // fixed answers advance on their own
  };
  const toggleCategory = (id: string) =>
    setA((prev) => ({
      ...prev,
      categories: prev.categories.includes(id) ? prev.categories.filter((c) => c !== id) : [...prev.categories, id],
    }));

  const otherChosen = key !== "contact" && (key === "category" ? a.categories.includes(OTHER) : a[key] === OTHER);
  const otherText = key !== "contact" ? (other[key] ?? "").trim() : "";
  const canNext =
    key === "category"
      ? a.categories.length > 0 && (!otherChosen || otherText.length > 0)
      : otherChosen && otherText.length > 0;
  const showNext = key === "category" || otherChosen;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!data.name?.trim() || !data.phone?.trim()) return setStatus("invalid");
    setStatus("sending");
    const fixedCategories = a.categories.filter((c) => c !== OTHER);
    try {
      await submitLead({
        name: data.name,
        phone: data.phone,
        website: data.website,
        segment: a.segment && a.segment !== OTHER ? a.segment : "owners",
        category: fixedCategories[0] ?? "complex",
        lang,
        source: "quiz",
        quiz: {
          categories: fixedCategories,
          scale: a.scale,
          material: a.material,
          timing: a.timing,
          channel,
          // free-text answers, only for questions where "Other" was chosen
          other: Object.fromEntries(
            (Object.keys(other) as QuestionKey[])
              .filter((k) => (k === "category" ? a.categories.includes(OTHER) : a[k] === OTHER) && other[k]?.trim())
              .map((k) => [k, other[k]!.trim()]),
          ),
        },
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const restart = () => {
    setA({ categories: [] });
    setOther({});
    setStep(0);
    setStatus("idle");
  };

  const progress = status === "done" ? 100 : Math.round((step / QUESTIONS) * 100);

  const qKey: QuestionKey | null = key === "contact" ? null : key;
  const otherField = otherChosen && qKey && (
    <input
      className="q-other"
      autoFocus
      value={other[qKey] ?? ""}
      maxLength={300}
      placeholder={t.otherPlaceholder}
      aria-label={t.otherPlaceholder}
      onChange={(e) => setOther((prev) => ({ ...prev, [qKey]: e.target.value }))}
      onKeyDown={(e) => {
        if (e.key === "Enter" && canNext) go(1);
      }}
    />
  );

  return (
    <div className="quiz">
      <div className="q-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      {status === "done" ? (
        <div className="q-body q-done" role="status">
          <h3 className="h-display q-title">{t.done.title}</h3>
          <p className="lead">{t.done.text}</p>
          <div>
            <button type="button" className="btn btn-ghost" onClick={restart}>{t.done.restart}</button>
          </div>
        </div>
      ) : (
        <div className="q-body" key={key}>
          {key !== "contact" && (
            <div className="q-count">
              {t.questionOf} {step + 1} / {QUESTIONS}
            </div>
          )}

          {key === "segment" && (
            <>
              <h3 className="h-display q-title">{t.steps.segment.q}</h3>
              <div className="q-grid">
                {segmentIds.map((id) => (
                  <Option key={id} selected={a.segment === id} label={segments[id].tab} onClick={() => pick("segment", id)} />
                ))}
                <Option selected={a.segment === OTHER} label={t.other} onClick={() => pick("segment", OTHER)} />
              </div>
            </>
          )}

          {key === "category" && (
            <>
              <h3 className="h-display q-title">{t.steps.category.q}</h3>
              <p className="q-hint">{t.multiHint}</p>
              <div className="q-grid">
                {categoryIds.map((id) => (
                  <Option key={id} multi selected={a.categories.includes(id)} label={categories[id]} onClick={() => toggleCategory(id)} />
                ))}
                <Option multi selected={a.categories.includes(OTHER)} label={t.other} onClick={() => toggleCategory(OTHER)} />
              </div>
            </>
          )}

          {(key === "scale" || key === "material" || key === "timing") && (
            <>
              <h3 className="h-display q-title">{t.steps[key].q}</h3>
              <div className="q-grid">
                {Object.entries(t.steps[key].options).map(([id, label]) => (
                  <Option key={id} selected={a[key] === id} label={label} onClick={() => pick(key, id)} />
                ))}
                <Option selected={a[key] === OTHER} label={t.other} onClick={() => pick(key, OTHER)} />
              </div>
            </>
          )}

          {otherField}

          {key === "contact" && (
            <form className="q-contact" onSubmit={onSubmit} noValidate>
              <h3 className="h-display q-title">{t.contact.q}</h3>
              <p className="q-hint">{t.contact.text}</p>
              <div className="q-fields">
                <div className="field">
                  <label htmlFor="q-name">{lead.fields.name}</label>
                  <input id="q-name" name="name" autoComplete="name" aria-invalid={status === "invalid" || undefined} />
                </div>
                <div className="field">
                  <label htmlFor="q-phone">{lead.fields.phone}</label>
                  <input id="q-phone" name="phone" type="tel" autoComplete="tel" placeholder="+998" aria-invalid={status === "invalid" || undefined} />
                </div>
              </div>
              <div className="hp" aria-hidden="true">
                <input name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="q-channel" role="radiogroup" aria-label={t.contact.channel}>
                <span>{t.contact.channel}</span>
                {Object.entries(t.contact.channels).map(([id, label]) => (
                  <button key={id} type="button" role="radio" aria-checked={channel === id} onClick={() => setChannel(id)}>
                    {label}
                  </button>
                ))}
              </div>
              <button className="btn btn-gold" type="submit" disabled={status === "sending"}>
                <span>{status === "sending" ? lead.sending : t.contact.send}</span>
                <span className="arr">→</span>
              </button>
              {status === "invalid" && <p className="form-msg" role="alert">{lead.required}</p>}
              {status === "error" && <p className="form-msg" role="alert">{lead.error}</p>}
              <p className="fine">{lead.consent}</p>
            </form>
          )}

          <div className="q-nav">
            {step > 0 ? (
              <button type="button" className="q-back" onClick={() => go(-1)}>← {t.back}</button>
            ) : (
              <span />
            )}
            {showNext && (
              <button type="button" className="btn btn-gold" disabled={!canNext} onClick={() => go(1)}>
                <span>{t.next}</span>
                <span className="arr">→</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
