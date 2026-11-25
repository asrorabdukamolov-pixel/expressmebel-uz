import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { home2 } from "@/i18n/home2";
import { pages } from "@/i18n/pages";
import { Header } from "@/components/Header";
import { Quiz } from "@/components/Quiz";
import { VideoReel } from "@/components/VideoReel";
import { Reveal } from "@/components/Reveal";
import { DreamSlider } from "@/components/DreamSlider";
import { CatCarousel } from "@/components/CatCarousel";
import { CtaBlock, MobileBar, SiteFooter } from "@/components/SiteParts";
import { catalogCards } from "@/lib/catalogCards";

/* Bosh sahifa, 6-variant (2026-11-25, Asror aka: mossman.ru uslubida, nusxa emas).
   Qoldi: kirish animatsiyasi, slogan, orzu/haqiqat slayderi, qadriyatlar, kompaniya videolari, kviz.
   Katalog, loyihalar, biz haqimizda va ofis alohida sahifalarga ko'chdi. Oldingi variant: git 92d5a8c. */

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const h = home2[lang];
  const p = pages[lang];

  return (
    <>
      <Header lang={lang} overlay />
      <Reveal />
      <div className="intro" aria-hidden="true">
        <Image src="/brand/logo-dark.webp" alt="" width={2000} height={516} priority className="intro-logo" />
        <span className="intro-bar" />
      </div>
      <main id="top">
        {/* Bosh ekran: kompaniya videosi, ustida slogan */}
        <section className="hero6">
          {/* Showroom videosi (egasi yubordi, IMG_8023; oxiridagi CapCut yozuvi kesildi) */}
          <video className="hero6-video" src="/video/showroom.mp4" poster="/video/showroom-poster.jpg" autoPlay muted loop playsInline preload="auto" aria-label={h.hero.photo} />
          <div className="hero6-shade" />
          <div className="wrap hero6-in">
            <h1 className="hero-title">
              <span className="ln"><span>{h.hero.title}</span></span>
              <span className="ln"><span className="plate">{h.hero.plate}</span></span>
            </h1>
            <div className="hero6-bottom">
              <p className="hero-lead">{h.hero.lead}</p>
              <div className="hero-actions">
                <a className="btn btn-teal" href="#quiz">
                  <span>{h.hero.cta1}</span>
                  <span className="arr">→</span>
                </a>
                <Link className="link-light" href={`/${lang}/projects`}>{h.hero.cta2} →</Link>
              </div>
            </div>
            <div className="hero-stats">
              {h.hero.stats.map((s) => (
                <div key={s.label}>
                  <b data-count>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Missiya: markazda qisqa matn */}
        <section className="section intro6">
          <div className="wrap intro6-in" data-reveal>
            <h2 className="sec-title">{h.about.eyebrow}</h2>
            <p>
              {h.about.before} <em>{h.about.accent}</em> {h.about.after}
            </p>
          </div>
        </section>

        {/* Katalog karuseli */}
        <section className="cc-sec">
          <div className="wrap sec-line">
            <h2 className="sec-title">{p.home.catalogTitle}</h2>
            <Link className="more" href={`/${lang}/catalog`}>{p.home.catalogAll} →</Link>
          </div>
          <CatCarousel items={catalogCards(lang)} prev={h.nest.prev} next={h.nest.next} />
        </section>

        {/* Orzudan haqiqatga */}
        <section className="section">
          <div className="wrap dream-grid">
            <div className="dream-copy">
              <h2 className="sec-title">{h.dream.title}</h2>
              <p className="lead">{h.dream.lead}</p>
              <ul className="checks">
                {h.dream.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
            <DreamSlider src={h.dream.img} alt={h.dream.title} dream={h.dream.dreamLabel} reality={h.dream.realLabel} hint={h.dream.hint} />
          </div>
        </section>

        {/* Qadriyatlar: Mossman "yondashuv" to'ri kabi */}
        <section className="section sec-top">
          <div className="wrap">
            <h2 className="sec-title">{h.about.valuesTitle}</h2>
            <div className="approach">
              {h.about.values.map((v, i) => (
                <div key={v.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                  <h3>{v.title}</h3>
                  <p>{v.proof}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kompaniya videolari */}
        <section className="section sec-top" id="video">
          <div className="wrap">
            <div className="sec-line">
              <h2 className="sec-title">{p.home.videosTitle}</h2>
              <p className="lead">{h.videos.lead}</p>
            </div>
            <div className="videos">
              {h.videos.items.map((v) => (
                <div className="video" key={v.src} data-reveal>
                  <VideoReel src={v.src} coverAt={v.cover} label={h.videos.play} />
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kviz */}
        <section className="section" id="quiz">
          <div className="wrap quiz-grid">
            <div className="quiz-side">
              <h2 className="sec-title">{h.quiz.eyebrow}</h2>
              <p className="lead">{h.quiz.lead}</p>
              <ul className="checks">
                {h.quiz.perks.map((pk) => (
                  <li key={pk}>{pk}</li>
                ))}
              </ul>
            </div>
            <Quiz lang={lang} t={t.quiz} lead={t.lead} segments={t.segments.items} categories={t.catalog.items} />
          </div>
        </section>

        <CtaBlock lang={lang} />
      </main>
      <SiteFooter lang={lang} rights={t.footer.rights} />
      <MobileBar lang={lang} call={t.nav.call} cta={t.nav.cta} />
    </>
  );
}
