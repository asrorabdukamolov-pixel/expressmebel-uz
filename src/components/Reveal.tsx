"use client";

import { useEffect } from "react";

/** Ekranga kirgan [data-reveal] bloklarni sekin chiqaradi, [data-count] raqamlarni 0 dan sanaydi.
 *  JS bo'lmasa hammasi oddiy ko'rinadi (yashirish faqat html.rv klassi qo'shilgandan keyin ishlaydi). */
function countUp(el: HTMLElement) {
  const text = el.textContent ?? "";
  const m = text.match(/^([\d\s ]+)(.*)$/);
  if (!m) return;
  const target = Number(m[1].replace(/[\s ]/g, ""));
  if (!target || target < 10) return;
  const suffix = m[2];
  const fmt = (n: number) => (target >= 1000 ? n.toLocaleString("ru-RU").replace(/,/g, " ") : String(n));
  const start = performance.now();
  const dur = 1400;
  const step = (t: number) => {
    const k = Math.min(1, (t - start) / dur);
    const eased = 1 - Math.pow(1 - k, 3);
    el.textContent = fmt(Math.round(target * eased)) + suffix;
    if (k < 1) requestAnimationFrame(step);
    else el.textContent = text;
  };
  requestAnimationFrame(step);
}

export function Reveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("rv");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          if (el.dataset.count !== undefined) countUp(el);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal], [data-count]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
