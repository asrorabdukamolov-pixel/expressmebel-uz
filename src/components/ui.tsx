import type { ElementType } from "react";

/** Heading with the second half set in gold italic: ["Sizning g‘oyangiz,", "bizning ijromiz"]. */
export function Title({ parts, as: Tag = "h2", className = "h2" }: { parts: string[]; as?: ElementType; className?: string }) {
  const [plain, accent] = parts;
  return (
    <Tag className={`h-display ${className}`}>
      {plain} {accent && <em className="accent">{accent}</em>}
    </Tag>
  );
}

export function Bars({ className = "" }: { className?: string }) {
  return (
    <div className={`bars ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}
