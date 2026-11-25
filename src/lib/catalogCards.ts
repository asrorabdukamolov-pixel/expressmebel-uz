import type { Locale } from "@/i18n/config";
import { home2 } from "@/i18n/home2";
import type { CategoryId } from "./site";

/** Katalog turlari uchun eng yorug' suratlar (Mossman uslubida: keng, havodor interyer). */
export const catalogImages: Partial<Record<CategoryId, string>> = {
  kitchen: "/img/premium/seg-home.jpg",
  wardrobe: "/img/premium/cat-wardrobe2.jpg",
  living: "/img/premium/cat-living.jpg",
  bedroom: "/img/premium/cat-bedroom.jpg",
  horeca: "/img/premium/cat-horeca.jpg",
  bath: "/img/premium/cat-hall2.jpg",
};

/** Loyihalar sahifasida filtri bor turlar. */
export const projectCats = ["kitchen", "wardrobe", "living", "bedroom"] as const;

export function catHref(lang: Locale, id: CategoryId) {
  return (projectCats as readonly string[]).includes(id) ? `/${lang}/projects?c=${id}` : `/${lang}/office`;
}

export function catalogCards(lang: Locale) {
  return home2[lang].catalog.items.map((c) => ({ href: catHref(lang, c.id), name: c.name, img: catalogImages[c.id] ?? c.img }));
}
