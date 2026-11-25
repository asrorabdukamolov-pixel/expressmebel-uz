import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { home2 } from "@/i18n/home2";
import { officeQuery, pages } from "@/i18n/pages";
import { contacts } from "@/lib/site";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { MobileBar, PageTitle, SiteFooter } from "@/components/SiteParts";

export async function generateMetadata({ params }: PageProps<"/[lang]/office">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const p = pages[lang].office;
  return {
    title: `${p.title} — Express Mebel`,
    description: p.lead,
    alternates: { canonical: `/${lang}/office`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}/office`])) },
  };
}

export default async function OfficePage({ params }: PageProps<"/[lang]/office">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const o = pages[lang].office;
  const c = home2[lang].contact;
  const q = encodeURIComponent(officeQuery);

  return (
    <>
      <Header lang={lang} path="/office" />
      <Reveal />
      <main className="page">
        <div className="wrap">
          <PageTitle title={o.title} lead={o.lead} />
          <div className="office">
            <div className="office-map" data-reveal>
              <iframe title={o.title} src={`https://maps.google.com/maps?q=${q}&z=16&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div className="office-info" data-reveal>
              <div>
                <small>{c.officeLabel}</small>
                <p>{c.address}</p>
                <a className="more" href={`https://yandex.uz/maps/?text=${q}`} target="_blank" rel="noopener">{o.map} ↗</a>
              </div>
              <div>
                <small>{c.phoneLabel}</small>
                <a className="office-phone" href={contacts.phoneHref}>{contacts.phone}</a>
              </div>
              <div>
                <small>{o.social}</small>
                <p>
                  <a href={contacts.instagram} target="_blank" rel="noopener">@express_mebel__uz</a>
                  {" · "}
                  <a href={contacts.telegramCatalog} target="_blank" rel="noopener">Telegram</a>
                </p>
              </div>
            </div>
          </div>
          <section className="about-sec office-form" id="lead">
            <h2 className="sec-title">{o.formTitle}</h2>
            <LeadForm lang={lang} t={t.lead} segments={t.segments.items} categories={t.catalog.items} />
          </section>
        </div>
      </main>
      <SiteFooter lang={lang} rights={t.footer.rights} />
      <MobileBar lang={lang} call={t.nav.call} cta={t.nav.cta} />
    </>
  );
}
