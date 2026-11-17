/** Fires a conversion event on every connected ad/analytics tag after a lead is sent. */
export function trackLead(segment: string) {
  const w = window as unknown as {
    gtag?: (...a: unknown[]) => void;
    fbq?: (...a: unknown[]) => void;
    ym?: (...a: unknown[]) => void;
  };
  w.gtag?.("event", "generate_lead", { segment });
  w.fbq?.("track", "Lead", { content_category: segment });
  const ym = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (ym) w.ym?.(Number(ym), "reachGoal", "lead");
}
