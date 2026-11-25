import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { home2 } from "@/i18n/home2";
import { contacts } from "@/lib/site";
import { Header } from "@/components/Header";
import { PrefillLink } from "@/components/PrefillLink";
import { Quiz } from "@/components/Quiz";
import { LeadForm } from "@/components/LeadForm";
import { VideoReel } from "@/components/VideoReel";
import { Gallery } from "@/components/Gallery";
import { Reveal } from "@/components/Reveal";
import { Bars } from "@/components/ui";
import { DreamSlider } from "@/components/DreamSlider";

/* Bosh sahifa, 3-variant (premium, brendbuk ichida).
   To'liq ekranli bosh ekran (to'q panel + katta surat), raqamlangan bo'limlar, katta rasmlar,
   ingichka chiziqlar, yengil chiqish animatsiyasi. Oldingi variant: src/app/page-v2.tsx.txt */

const catLayout = [
  { span: "c-8", ratio: "r-wide" },
  { span: "c-4", ratio: "r-tall" },
  { span: "c-5", ratio: "r-tall" },
  { span: "c-7", ratio: "r-wide" },
  { span: "c-7", ratio: "r-wide" },
  { span: "c-5", ratio: "r-tall" },
];

function Eyebrow({ n, text, light = false }: { n: string; text: string; light?: boolean }) {
  return (
    <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span className="num">{n}</span>
      {text}
    </div>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const h = home2[lang];

  return (
    <>
      <Header lang={lang} dict={t} />
      <Reveal />
      <div className="intro" aria-hidden="true">
        <Image src="/brand/logo-dark.webp" alt="" width={2000} height={516} priority className="intro-logo" />
        <span className="intro-bar" />
      </div>
      <main id="top">
        {/* Bosh ekran: to'q panel + to'liq balandlikdagi surat */}
        <section className="hero">
          <div className="hero-panel">
            <div className="hero-copy">
              <div className="eyebrow eyebrow-light">{h.hero.eyebrow}</div>
              <h1 className="h-display hero-title">
                <span className="ln"><span>{h.hero.title}</span></span>
                <span className="ln"><span className="plate">{h.hero.plate}</span></span>
              </h1>
              <p className="hero-lead">{h.hero.lead}</p>
              <div className="hero-actions">
                <a className="btn btn-teal" href="#quiz">
                  <span>{h.hero.cta1}</span>
                  <span className="arr">→</span>
                </a>
                <a className="link-light" href="#projects">{h.hero.cta2} →</a>
              </div>
            </div>
            <div className="hero-stats">
              {h.hero.stats.map((s) => (
                <div key={s.value}>
                  <b className="h-display" data-count>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-media">
            <video className="hero-video" src="/video/overview.mp4" poster="/video/overview-poster.jpg" autoPlay muted loop playsInline preload="auto" aria-label={h.hero.photo} />
            <span className="hero-cap">{h.hero.photo}</span>
            <Bars />
          </div>
        </section>

        {/* Yuguruvchi tasma */}
        <div className="marquee" aria-hidden="true">
          <div className="mq-track">
            {[0, 1].map((k) => (
              <span key={k}>
                {h.marquee.map((w) => (
                  <b key={w}>{w}</b>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* 01. Biz haqimizda: bitta katta gap */}
        <section className="section about">
          <div className="wrap about-grid">
            <Eyebrow n="01" text={h.about.eyebrow} />
            <div>
              <p className="about-text" data-reveal>
                {h.about.before} <em>{h.about.accent}</em> {h.about.after}
              </p>
              <div className="about-facts" data-reveal>
                {h.about.facts.map((f) => (
                  <div key={f.label}>
                    <b className="h-display" data-count>{f.value}</b>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
              <div className="values" data-reveal>
                <h3 className="h-display">{h.about.valuesTitle}</h3>
                <ol>
                  {h.about.values.map((v) => (
                    <li key={v.title}>
                      <b>{v.title}</b>
                      <span>{v.proof}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 02. Kim uchun: har segmentga o'z gapi */}
        <section className="section sec-top">
          <div className="wrap">
            <div className="sec-head">
              <Eyebrow n="02" text={h.segments.eyebrow} />
              <h2 className="h-display h2">{h.segments.title}</h2>
            </div>
            <div className="segs">
              {h.segments.items.map((s) => (
                <PrefillLink key={s.id} prefill={s.id === "home" ? {} : { segment: s.id }} className="seg" >
                  <div className="seg-ph" data-reveal>
                    <Image src={s.img} alt={s.label} fill sizes="(max-width: 860px) 100vw, 25vw" className="object-cover" />
                  </div>
                  <small>{s.label}</small>
                  <h3 className="h-display">{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="go">{h.segments.go} →</span>
                </PrefillLink>
              ))}
            </div>
          </div>
        </section>

        {/* 03. Orzudan haqiqatga: surib solishtirish */}
        <section className="section dark-sec">
          <div className="wrap dream-grid">
            <div className="sec-head !m-0">
              <Eyebrow n="03" text={h.dream.eyebrow} light />
              <h2 className="h-display h2">{h.dream.title}</h2>
              <p className="lead">{h.dream.lead}</p>
              <ul className="checks">
                {h.dream.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <DreamSlider src={h.dream.img} alt={h.dream.title} dream={h.dream.dreamLabel} reality={h.dream.realLabel} hint={h.dream.hint} />
          </div>
        </section>

        {/* 04. Katalog */}
        <section className="section sec-top" id="catalog">
          <div className="wrap">
            <div className="sec-row">
              <div className="sec-head">
                <Eyebrow n="04" text={h.catalog.eyebrow} />
                <h2 className="h-display h2">{h.catalog.title}</h2>
                <p className="lead">{h.catalog.lead}</p>
              </div>
              <Link className="btn btn-dark" href={`/${lang}/works`}>
                <span>{h.catalog.all}</span>
                <span className="arr">→</span>
              </Link>
            </div>
            <div className="cat-grid">
              {h.catalog.items.map(({ id, name, img }, i) => (
                <PrefillLink key={id} prefill={{ category: id }} className={`card ${catLayout[i].span} ${i % 2 ? "card-low" : ""}`}>
                  <div className={`ph ${catLayout[i].ratio}`} data-reveal>
                    <Image src={img} alt={name} fill sizes="(max-width: 860px) 100vw, 60vw" className="object-cover" />
                  </div>
                  <div className="meta">
                    <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="h-display">{name}</h3>
                    <span className="go">{h.catalog.go} →</span>
                  </div>
                </PrefillLink>
              ))}
            </div>
          </div>
        </section>

        {/* 03. Loyiha: gorizontal galereya, to'q fon */}
        <section className="section dark-sec nest-sec" id="projects">
          <div className="wrap nest-head">
            <div className="sec-head !m-0">
              <Eyebrow n="05" text={h.nest.eyebrow} light />
              <h2 className="h-display h2">{h.nest.title}</h2>
            </div>
            <p className="lead">{h.nest.text}</p>
          </div>
          <Gallery photos={h.nest.photos} prev={h.nest.prev} next={h.nest.next} />
        </section>

        {/* 04. Hamkorlar */}
        <section className="section">
          <div className="wrap">
            <div className="sec-row">
              <div className="sec-head">
                <Eyebrow n="06" text={h.clients.eyebrow} />
                <h2 className="h-display h2">{h.clients.title}</h2>
              </div>
              <Link className="btn btn-dark" href={`/${lang}/works`}>
                <span>{h.catalog.all}</span>
                <span className="arr">→</span>
              </Link>
            </div>
            <div className="clients">
              {h.clients.items.map((c) => (
                <article className="client" key={c.name} data-reveal>
                  <div className="client-ph">
                    <Image src={c.img} alt={c.name} fill sizes="(max-width: 860px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div className="client-body">
                    <div className="client-top">
                      <Image src={c.logo} alt={c.name} width={120} height={80} className="client-logo" />
                      <h3 className="h-display">{c.name}</h3>
                    </div>
                    <p>{c.text}</p>
                    <div className="client-stats">
                      {c.stats.map((s) => (
                        <div key={s.label}>
                          <b className="h-display">{s.value}</b>
                          <span>{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 05. Nega biz: surat + 4 qator */}
        <section className="section light-sec">
          <div className="wrap ben-grid">
            <div className="ben-ph" data-reveal>
              <Image src={h.benefits.img} alt="" fill sizes="(max-width: 860px) 100vw, 40vw" className="object-cover" />
            </div>
            <div>
              <div className="sec-head">
                <Eyebrow n="07" text={h.benefits.eyebrow} />
                <h2 className="h-display h2">{h.benefits.title}</h2>
              </div>
              <div className="ben-list">
                {h.benefits.items.map((b) => (
                  <div className="ben-row" key={b.title} data-reveal>
                    <b className="h-display">{b.value}</b>
                    <div>
                      <h3>{b.title}</h3>
                      <p>{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 06. Ish tartibi */}
        <section className="section">
          <div className="wrap">
            <div className="sec-head">
              <Eyebrow n="08" text={h.process.eyebrow} />
              <h2 className="h-display h2">{h.process.title}</h2>
            </div>
            <ol className="steps" data-reveal>
              {h.process.steps.map((s) => (
                <li key={s.title}>
                  <h3 className="h-display">{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 07. Fabrika: keng surat ustida to'q panel */}
        <section className="factory" id="factory">
          <div className="fac-ph">
            <Image src={h.factory.img} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="wrap">
            <div className="fac-card" data-reveal>
              <Eyebrow n="09" text={h.factory.eyebrow} light />
              <h2 className="h-display h2">{h.factory.title}</h2>
              <p className="lead">{h.factory.lead}</p>
              <div className="sites">
                {h.factory.sites.map((s) => (
                  <div key={s.value}>
                    <b className="h-display">{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="facts">
                {h.factory.facts.map((f) => (
                  <div key={f.title}>
                    <b>{f.title}</b>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 08. Videolar */}
        <section className="section dark-sec" id="video">
          <div className="wrap">
            <div className="sec-head">
              <Eyebrow n="10" text={h.videos.eyebrow} light />
              <h2 className="h-display h2">{h.videos.title}</h2>
              <p className="lead">{h.videos.lead}</p>
            </div>
            <div className="videos">
              {h.videos.items.map((v) => (
                <div className="video" key={v.src} data-reveal>
                  <VideoReel src={v.src} coverAt={v.cover} label={h.videos.play} />
                  <h3 className="h-display">{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 09. Kviz */}
        <section className="section" id="quiz">
          <div className="wrap quiz-grid">
            <div className="quiz-side">
              <Eyebrow n="11" text={h.quiz.eyebrow} />
              <h2 className="h-display h2">{h.quiz.title}</h2>
              <p className="lead">{h.quiz.lead}</p>
              <ul className="checks">
                {h.quiz.perks.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <Quiz lang={lang} t={t.quiz} lead={t.lead} segments={t.segments.items} categories={t.catalog.items} />
          </div>
        </section>

        {/* 10. Bog'lanish */}
        <section className="section dark-sec" id="lead">
          <div className="wrap form-grid">
            <div className="form-side">
              <Eyebrow n="12" text={h.contact.eyebrow} light />
              <h2 className="h-display h2">{h.contact.title}</h2>
              <p className="lead">{h.contact.lead}</p>
              <div className="contacts">
                <div>
                  <small>{h.contact.phoneLabel}</small>
                  <a className="big" href={contacts.phoneHref}>{contacts.phone}</a>
                </div>
                <div>
                  <small>{h.contact.officeLabel}</small>
                  <span>{h.contact.address}</span>
                </div>
                <div>
                  <small>Instagram · Telegram</small>
                  <span>
                    <a href={contacts.instagram} target="_blank" rel="noopener">@express_mebel__uz</a>
                    {" · "}
                    <a href={contacts.telegramCatalog} target="_blank" rel="noopener">Telegram katalog</a>
                  </span>
                </div>
              </div>
            </div>
            <LeadForm lang={lang} t={t.lead} segments={t.segments.items} categories={t.catalog.items} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap foot">
          <Image src="/brand/logo-light.webp" alt="Express Mebel" width={2000} height={516} className="h-10 w-auto" />
          <span>{t.footer.rights}</span>
        </div>
      </footer>

      <div className="mbar">
        <a className="btn btn-line" href={contacts.phoneHref}>{t.nav.call}</a>
        <a className="btn btn-teal" href="#quiz">{t.nav.cta}</a>
      </div>
    </>
  );
}
