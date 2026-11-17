/** Public site address; tolerant of stray whitespace/BOM in the env value, falls back if it is not a valid URL. */
export const siteUrl = (() => {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/[﻿\s]/g, "").replace(/\/+$/, "");
  try {
    return new URL(raw).origin;
  } catch {
    return "https://expressmebel.uz";
  }
})();

export const contacts = {
  phone: "+998 78 555 54 53",
  phoneHref: "tel:+998785555453",
  instagram: "https://www.instagram.com/express_mebel__uz/",
  instagramB2B: "https://www.instagram.com/express_mebel_b2b/",
  telegramCatalog: "https://t.me/Express_Mebel_Katalog",
};

/** Segment and category ids shared by the page, the form and the lead API. */
export const segmentIds = ["owners", "horeca", "build", "design", "foreman"] as const;
export type SegmentId = (typeof segmentIds)[number];

export const categoryIds = ["kitchen", "wardrobe", "horeca", "bedroom", "living", "bath", "doors", "complex"] as const;
export type CategoryId = (typeof categoryIds)[number];
