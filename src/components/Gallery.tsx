"use client";

import Image from "next/image";
import { useRef } from "react";

/** Gorizontal galereya: katta rasmlar, barmoq yoki tugmalar bilan suriladi. */
export function Gallery({ photos, prev, next }: { photos: { src: string; cap: string }[]; prev: string; next: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>(".g-item");
    el.scrollBy({ left: dir * ((item?.offsetWidth ?? 400) + 24), behavior: "smooth" });
  };
  return (
    <div className="gallery">
      <div className="g-track" ref={ref}>
        {photos.map((p, i) => (
          <figure className="g-item" key={p.src}>
            <div className="g-ph">
              <Image src={p.src} alt={p.cap} fill sizes="(max-width: 860px) 80vw, 34vw" className="object-cover" />
            </div>
            <figcaption>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {p.cap}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="g-nav">
        <button type="button" onClick={() => go(-1)} aria-label={prev}>←</button>
        <button type="button" onClick={() => go(1)} aria-label={next}>→</button>
      </div>
    </div>
  );
}
