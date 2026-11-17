import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./uz";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  uz: () => import("./uz").then((m) => m.default),
  ru: () => import("./ru").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
export type { Dictionary };
