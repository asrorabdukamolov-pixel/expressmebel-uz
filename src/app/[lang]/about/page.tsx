import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { home2 } from "@/i18n/home2";
import { pages } from "@/i18n/pages";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { VideoReel } from "@/components/VideoReel";
import { CtaBlock, MobileBar, PageTitle, SiteFooter } from "@/components/SiteParts";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const p = pages[lang].about;
  return {
    title: `${p.title} — Express Mebel`,
    description: p.processLead,
    alternates: { canonical: `/${lang}/about`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}/about`])) },
  };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const h = home2[lang];
  const a = pages[lang].about;

  return (
    <>
      <Header lang={lang} path="/about" />
      <Reveal />
      <main className="page">
        <div className="wrap">
          <PageTitle title={a.title} />
          <div className="about-hero" data-reveal>
            <Image src="/img/stock/s-cnc.jpg" alt={h.factory.title} fill sizes="100vw" className="object-cover" priority />
          </div>

          {/* Raqamlar: chapda katta yil, o'ngda 4 ta kartochka */}
          <div className="nums">
            <div className="num num-big" data-reveal>
              <b>{a.founded.value}</b>
              <span>{a.founded.label}</span>
            </div>
            {a.stats.map((s, i) => (
              <div className="num" key={s.label} data-reveal style={{ transitionDelay: `${(i + 1) * 70}ms` }}>
                <b data-count>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Ish bosqichlari */}
          <section className="about-sec">
            <div className="sec-line">
              <h2 className="sec-title">{a.processTitle}</h2>
              <p className="lead">{a.processLead}</p>
            </div>
            <ol className="stages">
              {h.process.steps.map((s, i) => (
                <li key={s.title} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Surat + izoh */}
          <div className="split" data-reveal>
            <div className="split-ph">
              <Image src="/img/editorial/e-shelf.jpg" alt={h.factory.title} fill sizes="(max-width: 860px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="split-box">
              <p>{a.note}</p>
              <div className="sites">
                {h.factory.sites.map((s) => (
                  <div key={s.value}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mijozlar */}
          <section className="about-sec">
            <h2 className="sec-title">{a.clientsTitle}</h2>
            <div className="clients">
              {h.clients.items.map((c) => (
                <article className="client" key={c.name} data-reveal>
                  <div className="client-ph">
                    <Image src={c.img} alt={c.name} fill sizes="(max-width: 860px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div className="client-top">
                    <Image src={c.logo} alt={c.name} width={120} height={80} className="client-logo" />
                    <h3>{c.name}</h3>
                  </div>
                  <p>{c.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Videolar */}
          <section className="about-sec">
            <h2 className="sec-title">{h.videos.title}</h2>
            <div className="videos">
              {h.videos.items.map((v) => (
                <div className="video" key={v.src} data-reveal>
                  <VideoReel src={v.src} coverAt={v.cover} label={h.videos.play} />
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <CtaBlock lang={lang} />
      </main>
      <SiteFooter lang={lang} rights={t.footer.rights} />
      <MobileBar lang={lang} call={t.nav.call} cta={t.nav.cta} />
    </>
  );
}
