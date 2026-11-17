"use client";

import type { ReactNode } from "react";

export type Prefill = { segment?: string; category?: string };
export const PREFILL_EVENT = "lead:prefill";

/** Jumps to the lead form and preselects the segment or category the visitor came from. */
export function PrefillLink({ prefill, className, children }: { prefill: Prefill; className?: string; children: ReactNode }) {
  return (
    <a
      href="#lead"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: prefill }))}
    >
      {children}
    </a>
  );
}
