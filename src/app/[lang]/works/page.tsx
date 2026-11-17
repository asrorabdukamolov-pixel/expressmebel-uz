import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { contacts } from "@/lib/site";
import { getWorks } from "@/lib/telegramWorks";
import { Header } from "@/components/Header";
import { WorksCatalog } from "@/components/WorksCatalog";
import { Title } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/works">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  const works = await getWorks();
  return {
    title: t.works.metaTitle,
    description: t.works.metaDescription,
    alternates: {
      canonical: `/${lang}/works`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/works`])),
    },
    openGraph: { title: t.works.metaTitle, description: t.works.metaDescription, images: [works[0].photos[0]] },
  };
}

export default async function WorksPage({ params }: PageProps<"/[lang]/works">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const works = await getWorks();
  const photoCount = works.reduce((s, w) => s + w.photos.length, 0);

  return (
    <>
      <Header lang={lang} dict={t} path="/works" />
      <main>
        <section className="section light works-sec">
          <div className="wrap">
            <div className="works-head">
              <div className="sec-head !m-0">
                <div className="eyebrow">{t.works.eyebrow}</div>
                <Title as="h1" parts={t.works.title} />
                <p className="lead">{t.works.lead}</p>
              </div>
              <div className="works-nums">
                <div>
                  <b className="h-display">{works.length}</b>
                  <span>{t.works.projects}</span>
                </div>
                <div>
                  <b className="h-display">{photoCount}</b>
                  <span>{t.works.photos}</span>
                </div>
              </div>
            </div>
            <WorksCatalog works={works} t={t.works} categories={t.catalog.items} quizHref={`/${lang}#quiz`} />
            <p className="works-tg">
              <a href={contacts.telegramCatalog} target="_blank" rel="noopener">
                {t.works.telegram} ↗
              </a>
            </p>
          </div>
        </section>
      </main>
      <footer className="site-footer dark">
        <div className="wrap foot">
          <Image src="/brand/logo-light.webp" alt="Express Mebel" width={2000} height={515} className="h-10 w-auto" />
          <span>{t.footer.rights}</span>
        </div>
      </footer>
      <div className="mbar">
        <a className="btn btn-ghost" href={contacts.phoneHref}>{t.nav.call}</a>
        <a className="btn btn-gold" href={`/${lang}#quiz`}>{t.nav.cta}</a>
      </div>
    </>
  );
}
