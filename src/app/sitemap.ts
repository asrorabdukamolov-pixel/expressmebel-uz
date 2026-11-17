import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((l) => ({
    url: `${siteUrl}/${l}`,
    changeFrequency: "weekly",
    priority: l === "uz" ? 1 : 0.9,
    alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${siteUrl}/${x}`])) },
  }));
}
