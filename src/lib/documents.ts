import "server-only";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";

/**
 * Documents block: every PDF or image dropped into `public/docs/` appears on the
 * site automatically after the next deploy. The title comes from the file name:
 * "01-Sertifikat ISO 9001.pdf" → "Sertifikat ISO 9001" (a leading number sets the order).
 * Read synchronously so the list is fixed at build time (static prerender).
 */
export type SiteDocument = { href: string; title: string; kind: "pdf" | "image"; ext: string; sizeKb: number };

const DOCS_DIR = path.join(process.cwd(), "public", "docs");
const IMAGE = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export function getDocuments(): SiteDocument[] {
  let names: string[];
  try {
    names = readdirSync(DOCS_DIR);
  } catch {
    return [];
  }
  return names
    .filter((n) => {
      const ext = path.extname(n).toLowerCase();
      return ext === ".pdf" || IMAGE.has(ext);
    })
    .sort((a, b) => a.localeCompare(b, "uz", { numeric: true }))
    .map((name): SiteDocument => {
      const ext = path.extname(name).toLowerCase();
      const { size } = statSync(path.join(DOCS_DIR, name));
      const title = path
        .basename(name, path.extname(name))
        .replace(/^\d+[\s._-]*/, "")
        .replace(/_+/g, " ")
        .trim();
      return {
        href: `/docs/${encodeURIComponent(name)}`,
        title: title || name,
        kind: ext === ".pdf" ? "pdf" : "image",
        ext: ext.slice(1).toUpperCase().replace("JPEG", "JPG"),
        sizeKb: Math.max(1, Math.round(size / 1024)),
      };
    });
}
