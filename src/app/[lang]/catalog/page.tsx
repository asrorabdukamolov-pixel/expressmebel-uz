import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { pages } from "@/i18n/pages";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { CtaBlock, MobileBar, PageTitle, SiteFooter } from "@/components/SiteParts";
import { catalogCards } from "@/lib/catalogCards";

export async function generateMetadata({ params }: PageProps<"/[lang]/catalog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const p = pages[lang].catalog;
  return {
    title: `${p.title} — Express Mebel`,
    description: p.lead,
    alternates: { canonical: `/${lang}/catalog`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}/catalog`])) },
  };
}

export default async function CatalogPage({ params }: PageProps<"/[lang]/catalog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const p = pages[lang];
  const [big, a, b, ...rest] = catalogCards(lang);

  return (
    <>
      <Header lang={lang} path="/catalog" />
      <Reveal />
      <main className="page">
        <div className="wrap">
          <PageTitle title={p.catalog.title} lead={p.catalog.lead} />
          <div className="mosaic">
            {[big, a, b].map((c, i) => (
              <Link key={c.name} href={c.href} className={`tile ${i === 0 ? "tile-big" : ""}`} data-reveal>
                <Image src={c.img} alt={c.name} fill sizes={i === 0 ? "(max-width: 860px) 100vw, 50vw" : "(max-width: 860px) 100vw, 25vw"} className="object-cover" priority={i === 0} />
                <span className="tile-name">{c.name}</span>
              </Link>
            ))}
            <div className="tile-list" data-reveal>
              {rest.map((c) => (
                <Link key={c.name} href={c.href}>{c.name}</Link>
              ))}
              <Link href={`/${lang}/projects`} className="tile-more">{p.catalog.more} →</Link>
            </div>
          </div>
        </div>
        <CtaBlock lang={lang} />
      </main>
      <SiteFooter lang={lang} rights={t.footer.rights} />
      <MobileBar lang={lang} call={t.nav.call} cta={t.nav.cta} />
    </>
  );
}
