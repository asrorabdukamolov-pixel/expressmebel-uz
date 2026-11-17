import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

const pages = [
  { path: "", priority: 1 },
  { path: "/works", priority: 0.8 },
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
