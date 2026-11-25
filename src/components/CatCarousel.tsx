"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

/** Katalog karuseli: katta rasm, ustida nom; barmoq yoki tugmalar bilan suriladi. */
export function CatCarousel({ items, prev, next }: { items: { href: string; name: string; img: string }[]; prev: string; next: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>(".cc-item");
    el.scrollBy({ left: dir * ((item?.offsetWidth ?? 400) + 20), behavior: "smooth" });
  };
  return (
    <div className="cc">
      <div className="cc-track" ref={ref}>
        {items.map((it) => (
          <Link className="cc-item" href={it.href} key={it.href + it.name}>
            <Image src={it.img} alt={it.name} fill sizes="(max-width: 860px) 82vw, 40vw" className="object-cover" />
            <span className="cc-name">{it.name}</span>
          </Link>
        ))}
      </div>
      <button type="button" className="cc-btn cc-prev" onClick={() => go(-1)} aria-label={prev}>‹</button>
      <button type="button" className="cc-btn cc-next" onClick={() => go(1)} aria-label={next}>›</button>
    </div>
  );
}
