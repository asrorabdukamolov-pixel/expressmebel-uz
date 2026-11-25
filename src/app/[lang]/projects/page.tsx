import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { pages } from "@/i18n/pages";
import { getWorks } from "@/lib/telegramWorks";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { WorksCatalog } from "@/components/WorksCatalog";
import { CtaBlock, MobileBar, PageTitle, SiteFooter } from "@/components/SiteParts";
import { contacts } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  const works = await getWorks();
  return {
    title: t.works.metaTitle,
    description: t.works.metaDescription,
    alternates: { canonical: `/${lang}/projects`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}/projects`])) },
    openGraph: { title: t.works.metaTitle, description: t.works.metaDescription, images: [works[0].photos[0]] },
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const p = pages[lang];
  const works = await getWorks();

  return (
    <>
      <Header lang={lang} path="/projects" />
      <Reveal />
      <main className="page">
        <div className="wrap">
          <PageTitle title={p.projects.title} lead={p.projects.lead} />
          <WorksCatalog works={works} t={t.works} categories={t.catalog.items} quizHref={`/${lang}#quiz`} />
          <p className="works-tg">
            <a href={contacts.telegramCatalog} target="_blank" rel="noopener">{t.works.telegram} ↗</a>
          </p>
        </div>
        <CtaBlock lang={lang} />
      </main>
      <SiteFooter lang={lang} rights={t.footer.rights} />
      <MobileBar lang={lang} call={t.nav.call} cta={t.nav.cta} />
    </>
  );
}
