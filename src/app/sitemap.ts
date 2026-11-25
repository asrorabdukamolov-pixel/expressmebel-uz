import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

const pages = [
  { path: "", priority: 1 },
  { path: "/catalog", priority: 0.9 },
  { path: "/projects", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/office", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority }) =>
    locales.map((l) => ({
      url: `${siteUrl}/${l}${path}`,
      changeFrequency: "weekly" as const,
      priority: l === "uz" ? priority : priority - 0.1,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${siteUrl}/${x}${path}`])) },
    })),
  );
}
