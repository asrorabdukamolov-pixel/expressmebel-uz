"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/uz";
import type { Locale } from "@/i18n/config";
import { categoryIds, segmentIds } from "@/lib/site";
import { submitLead } from "@/lib/submitLead";
import { PREFILL_EVENT, type Prefill } from "./PrefillLink";

type Status = "idle" | "sending" | "ok" | "error" | "invalid";

export function LeadForm({
  lang,
  t,
  segments,
  categories,
}: {
  lang: Locale;
  t: Dictionary["lead"];
  segments: Dictionary["segments"]["items"];
  categories: Dictionary["catalog"]["items"];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [segment, setSegment] = useState<string>("owners");
  const [category, setCategory] = useState<string>("kitchen");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { segment: s, category: c } = (e as CustomEvent<Prefill>).detail;
      if (s) setSegment(s);
      if (c) setCategory(c);
      setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 500);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!data.name?.trim() || !data.phone?.trim()) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      await submitLead({ ...data, segment: data.segment, lang, source: "form" });
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  const invalid = status === "invalid";
  const message = { ok: t.ok, error: t.error, invalid: t.required }[status as "ok" | "error" | "invalid"];

  return (
    <form className="lead-form relative" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="f-name">{t.fields.name}</label>
        <input id="f-name" name="name" ref={nameRef} autoComplete="name" required aria-invalid={invalid || undefined} />
      </div>
      <div className="field">
        <label htmlFor="f-company">{t.fields.company}</label>
        <input id="f-company" name="company" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="f-phone">{t.fields.phone}</label>
        <input id="f-phone" name="phone" type="tel" autoComplete="tel" placeholder="+998" required aria-invalid={invalid || undefined} />
      </div>
      <div className="field">
        <label htmlFor="f-segment">{t.fields.segment}</label>
        <select id="f-segment" name="segment" value={segment} onChange={(e) => setSegment(e.target.value)}>
          {segmentIds.map((id) => (
            <option key={id} value={id}>{segments[id].tab}</option>
          ))}
        </select>
      </div>
      <div className="field full">
        <label htmlFor="f-category">{t.fields.category}</label>
        <select id="f-category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categoryIds.map((id) => (
            <option key={id} value={id}>{categories[id]}</option>
          ))}
        </select>
      </div>
      <div className="field full">
        <label htmlFor="f-message">{t.fields.message}</label>
        <textarea id="f-message" name="message" />
      </div>
      {/* Honeypot: bots fill it, people never see it. */}
      <div className="hp" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="btn btn-teal" type="submit" disabled={status === "sending"}>
        <span>{status === "sending" ? t.sending : t.send}</span>
        <span className="arr">→</span>
      </button>
      {message && <p className="form-msg" role="status">{message}</p>}
      <p className="fine">{t.consent}</p>
    </form>
  );
}
