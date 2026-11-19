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
import { Bars } from "@/components/ui";

/* Bosh sahifa (brendbuk bo'yicha). Ko'rinish: Mossman (bo'sh joy, katta asimmetrik rasmlar, kam matn).
   Sotuv: Lovekuhnya (afzallik kartalari, kviz, videolar). 10 bo'lim:
   bosh ekran · raqamlar · katalog · afzalliklar · loyihalar · video · ish tartibi · fabrika · kviz · bog'lanish.
   Eski sahifa: src/app/old-page.tsx.txt */

/** Katalog setkasi: Mossman kabi har xil kenglik va rasm nisbati (12 ustunli setka). */
const catLayout = [
  { span: "c-8", ratio: "r-wide" },
  { span: "c-4", ratio: "r-tall" },
  { span: "c-5", ratio: "r-tall" },
  { span: "c-7", ratio: "r-wide" },
  { span: "c-7", ratio: "r-wide" },
  { span: "c-5", ratio: "r-tall" },
];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const h = home2[lang];

  return (
    <>
      <Header lang={lang} dict={t} />
      <main id="top">
        {/* 1. Bosh ekran: bitta taklif, bitta asosiy tugma */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">{h.hero.eyebrow}</div>
              <h1 className="h-display hero-title">
                {h.hero.title}
                <br />
                <span className="plate">{h.hero.plate}</span>
              </h1>
              <p className="lead">{h.hero.lead}</p>
              <div className="hero-actions">
                <a className="btn btn-teal" href="#quiz">
                  <span>{h.hero.cta1}</span>
                  <span className="arr">→</span>
                </a>
                <a className="btn btn-line" href="#projects">{h.hero.cta2}</a>
              </div>
              <p className="trust">{h.hero.trust}</p>
            </div>
            <div className="hero-media">
              <div className="hero-photo">
                <Image src="/img/editorial/e-living.jpg" alt={h.hero.photo} fill priority sizes="(max-width: 860px) 100vw, 50vw" className="object-cover" />
              </div>
              <span className="hero-cap">{h.hero.photo}</span>
              <Bars />
            </div>
          </div>
        </section>

        {/* 2. Raqamlar */}
        <section className="stats-band" aria-label="Express Mebel raqamlarda">
          <div className="wrap stats">
            {h.stats.map((s) => (
              <div className="stat" key={s.value}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Katalog: katta, asimmetrik rasmlar */}
        <section className="section" id="catalog">
          <div className="wrap">
            <div className="sec-row">
              <div className="sec-head">
                <div className="eyebrow">{h.catalog.eyebrow}</div>
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
                  <div className={`ph ${catLayout[i].ratio}`}>
                    <Image src={img} alt={name} fill sizes="(max-width: 860px) 100vw, 60vw" className="object-cover" />
                  </div>
                  <div className="meta">
                    <h3 className="h-display">{name}</h3>
                    <span className="go">{h.catalog.go} →</span>
                  </div>
                </PrefillLink>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Afzalliklar (Lovekuhnya usuli, brendbuk ranglarida) */}
        <section className="section benefits-sec">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">{h.benefits.eyebrow}</div>
              <h2 className="h-display h2">{h.benefits.title}</h2>
            </div>
            <div className="benefits">
              {h.benefits.items.map((b) => (
                <div className="benefit" key={b.title}>
                  <b className="h-display">{b.value}</b>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Loyihalar */}
        <section className="section" id="projects">
          <div className="wrap">
            <div className="sec-row">
              <div className="sec-head">
                <div className="eyebrow">{h.projects.eyebrow}</div>
                <h2 className="h-display h2">{h.projects.title}</h2>
              </div>
              <Link className="btn btn-dark" href={`/${lang}/works`}>
                <span>{h.projects.all}</span>
                <span className="arr">→</span>
              </Link>
            </div>

            <div className="nest">
              <div className="nest-copy">
                <h3 className="h-display">{h.projects.nest.title}</h3>
                <p>{h.projects.nest.text}</p>
              </div>
              <div className="nest-grid">
                {h.projects.nest.photos.map((p, i) => (
                  <figure key={p.src} className={`n-item n-${i}`}>
                    <Image src={p.src} alt={p.cap} fill sizes={i === 0 ? "(max-width: 860px) 100vw, 60vw" : "(max-width: 860px) 50vw, 30vw"} className="object-cover" />
                    <figcaption>{p.cap}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="clients">
              {h.projects.clients.map((c) => (
                <article className="client" key={c.name}>
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

        {/* 6. Videolar */}
        <section className="section dark-sec" id="video">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow eyebrow-light">{h.videos.eyebrow}</div>
              <h2 className="h-display h2">{h.videos.title}</h2>
              <p className="lead">{h.videos.lead}</p>
            </div>
            <div className="videos">
              {h.videos.items.map((v) => (
                <div className="video" key={v.src}>
                  <VideoReel src={v.src} coverAt={v.cover} label={h.videos.play} />
                  <h3 className="h-display">{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Ish tartibi */}
        <section className="section">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">{h.process.eyebrow}</div>
              <h2 className="h-display h2">{h.process.title}</h2>
            </div>
            <ol className="steps">
              {h.process.steps.map((s) => (
                <li key={s.title}>
                  <h3 className="h-display">{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 8. Fabrika */}
        <section className="section light-sec" id="factory">
          <div className="wrap fac-grid">
            <div className="fac-ph">
              <Image src={h.factory.img} alt="" fill sizes="(max-width: 860px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="fac-copy">
              <div className="sec-head !m-0">
                <div className="eyebrow">{h.factory.eyebrow}</div>
                <h2 className="h-display h2">{h.factory.title}</h2>
                <p className="lead">{h.factory.lead}</p>
              </div>
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

        {/* 9. Kviz: asosiy ariza */}
        <section className="section" id="quiz">
          <div className="wrap quiz-grid">
            <div className="quiz-side">
              <div className="eyebrow">{h.quiz.eyebrow}</div>
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
              <div className="eyebrow eyebrow-light">{h.contact.eyebrow}</div>
              <h2 className="h-display h2">{h.contact.title}</h2>
              <p className="lead">{h.contact.lead}</p>
              <div className="contacts">
                <div>
                  <small>{h.contact.phoneLabel}</small>
                  <a href={contacts.phoneHref}>{contacts.phone}</a>
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
