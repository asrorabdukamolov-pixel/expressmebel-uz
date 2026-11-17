"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dictionary } from "@/i18n/uz";
import { segmentIds, type SegmentId } from "@/lib/site";
import { PrefillLink } from "./PrefillLink";

const images: Record<SegmentId, string> = {
  owners: "/img/stock/s-office.jpg",
  horeca: "/img/stock/s-horeca-emerald.jpg",
  build: "/img/stock/s-dark-kitchen.jpg",
  design: "/img/stock/s-fluted.jpg",
  foreman: "/img/stock/s-facades.jpg",
};

export function Segments({ t }: { t: Dictionary["segments"] }) {
  const [active, setActive] = useState<SegmentId>("owners");
  const item = t.items[active];

  return (
    <>
      <div className="tabs" role="tablist" aria-label={t.eyebrow}>
        {segmentIds.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`tab-${id}`}
            aria-controls="seg-panel"
            aria-selected={id === active}
            onClick={() => setActive(id)}
          >
            {t.items[id].tab}
          </button>
        ))}
      </div>
      <div className="panel" role="tabpanel" id="seg-panel" aria-labelledby={`tab-${active}`}>
        <div className="panel-copy">
          <h3 className="h-display panel-title">{item.title}</h3>
          <ul className="checks">
            {item.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div>
            <PrefillLink prefill={{ segment: active }} className="btn btn-gold">
              <span>{t.cta}</span>
              <span className="arr">→</span>
            </PrefillLink>
          </div>
        </div>
        <div className="chamfer art relative aspect-square w-full">
          <Image key={active} src={images[active]} alt={item.title} fill sizes="(max-width: 860px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </>
  );
}
