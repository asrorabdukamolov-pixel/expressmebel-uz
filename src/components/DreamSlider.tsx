"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

/**
 * Signature hero piece for the slogan: the same room shown as a gold line sketch ("dream")
 * and as the finished interior ("reality"). Drag, tap or use arrow keys to move the divider.
 */
export function DreamSlider({ src, alt, dream, reality, hint }: { src: string; alt: string; dream: string; reality: string; hint: string }) {
  const [pos, setPos] = useState(52);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => dragging.current && moveTo(e.clientX);
  const onUp = () => (dragging.current = false);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
  };

  return (
    <div
      ref={box}
      className="dream chamfer"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <Image src={src} alt={alt} fill priority sizes="(max-width: 860px) 100vw, 46vw" className="object-cover" />
      <div className="dream-sketch" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden="true">
        <Image src={src} alt="" fill priority sizes="(max-width: 860px) 100vw, 46vw" className="object-cover" />
      </div>
      <div
        className="dream-handle"
        style={{ left: `${pos}%` }}
        role="slider"
        tabIndex={0}
        aria-label={hint}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKey}
      >
        <span className="dream-knob">‹ ›</span>
      </div>
      <span className="dream-label dream-label-l">{dream}</span>
      <span className="dream-label dream-label-r">{reality}</span>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="dream-sketch" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" />
          <feGaussianBlur stdDeviation="1.4" />
          <feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="11" intercept="-0.06" />
            <feFuncG type="linear" slope="11" intercept="-0.06" />
            <feFuncB type="linear" slope="11" intercept="-0.06" />
          </feComponentTransfer>
          <feColorMatrix type="matrix" values="0.29 0.29 0.29 0 0  0.23 0.23 0.23 0 0  0.11 0.11 0.11 0 0  0 0 0 1 0" />
        </filter>
      </svg>
    </div>
  );
}
