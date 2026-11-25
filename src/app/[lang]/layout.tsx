import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope } from "next/font/google";
import { hasLocale, htmlLang, locales, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { siteUrl } from "@/lib/site";
import { Analytics } from "@/components/Analytics";
import "../globals.css";

/* 2026-11-25, Asror aka: mossman.ru shrifti - Manrope (lotin + kirill bitta shriftda). */
const manrope = Manrope({
  variable: "--font-display-face",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: ogLocale[lang],
      type: "website",
      images: ["/img/projects/p-dining.jpg"],
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={htmlLang[lang]} className={manrope.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
