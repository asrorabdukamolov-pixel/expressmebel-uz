"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Dictionary } from "@/i18n/uz";
import type { Work, WorkStyle } from "@/lib/works";

type Cat = Work["category"];
const CATS: Cat[] = ["kitchen", "wardrobe", "living", "bedroom"];
const STYLES: WorkStyle[] = ["neo", "modern", "classic", "hitech"];

export function WorksCatalog({
  works,
  t,
  categories,
  quizHref,
}: {
  works: Work[];
  t: Dictionary["works"];
  categories: Dictionary["catalog"]["items"];
  quizHref: string;
}) {
  const [cat, setCat] = useState<Cat | "all">("all");
  const [style, setStyle] = useState<WorkStyle | "all">("all");
  const [open, setOpen] = useState<{ work: Work; i: number } | null>(null);

  const list = useMemo(
    () => works.filter((w) => (cat === "all" || w.category === cat) && (style === "all" || w.style === style)),
    [works, cat, style],
  );
  const count = (c: Cat | "all") => (c === "all" ? works.length : works.filter((w) => w.category === c).length);

  const step = useCallback(
    (d: number) => setOpen((o) => (o ? { work: o.work, i: (o.i + d + o.work.photos.length) % o.work.photos.length } : o)),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <>
      <div className="w-filters">
        <div className="tabs" role="tablist" aria-label={t.eyebrow}>
          {(["all", ...CATS] as const).map((c) => (
            <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)}>
              {c === "all" ? t.all : categories[c]} <small>{count(c)}</small>
            </button>
          ))}
        </div>
        <div className="w-styles" aria-label={t.styleLabel}>
          <span className="lbl">{t.styleLabel}</span>
          {(["all", ...STYLES] as const).map((s) => (
            <button key={s} type="button" aria-pressed={style === s} onClick={() => setStyle(s)}>
              {s === "all" ? t.all : t.styles[s]}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <p className="w-empty">{t.empty}</p>
      ) : (
        <div className="w-grid">
          {list.map((w, n) => (
            <button key={w.id} type="button" className="w-card" onClick={() => setOpen({ work: w, i: 0 })}>
              <span className="ph art relative block aspect-[4/5]">
                <Image
                  src={w.photos[0]}
                  alt={`${categories[w.category]} · ${t.styles[w.style]}`}
                  fill
                  sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 33vw"
                  className="object-cover"
                  priority={n < 3}
                />
                <span className="w-count">{w.photos.length} {t.photos}</span>
              </span>
              <span className="w-meta">
                <b className="h-display">{categories[w.category]}</b>
                <span>{t.styles[w.style]}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {open && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={categories[open.work.category]} onClick={() => setOpen(null)}>
          <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
            <div className="lb-media">
              <Image
                key={open.work.photos[open.i]}
                src={open.work.photos[open.i]}
                alt={`${categories[open.work.category]} · ${open.i + 1}`}
                fill
                sizes="(max-width: 860px) 100vw, 60vw"
                className="object-contain"
              />
              {open.work.photos.length > 1 && (
                <>
                  <button type="button" className="lb-nav prev" onClick={() => step(-1)} aria-label={t.prev}>‹</button>
                  <button type="button" className="lb-nav next" onClick={() => step(1)} aria-label={t.next}>›</button>
                  <span className="lb-pos">{open.i + 1} / {open.work.photos.length}</span>
                </>
              )}
            </div>
            <aside className="lb-side">
              <button type="button" className="lb-close" onClick={() => setOpen(null)} aria-label={t.close}>×</button>
              <div className="eyebrow">{t.styles[open.work.style]}</div>
              <h3 className="h-display">{categories[open.work.category]}</h3>
              {open.work.brands.length > 0 && (
                <div className="lb-brands">
                  <small>{t.materials}</small>
                  <div>
                    {open.work.brands.map((b) => (
                      <span key={b}>{b}</span>
                    ))}
                  </div>
                </div>
              )}
              <p>{t.priceNote}</p>
              <div className="lb-thumbs">
                {open.work.photos.map((p, i) => (
                  <button key={p} type="button" aria-label={`${i + 1}`} aria-current={i === open.i} onClick={() => setOpen({ work: open.work, i })}>
                    <Image src={p} alt="" fill sizes="72px" className="object-cover" />
                  </button>
                ))}
              </div>
              <a className="btn btn-teal" href={quizHref}>
                <span>{t.cta}</span>
                <span className="arr">→</span>
              </a>
            </aside>
          </div>
        </div>
      )}
    </>
  );
}
