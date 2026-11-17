import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { contacts, type CategoryId } from "@/lib/site";
import { Header } from "@/components/Header";
import { Segments } from "@/components/Segments";
import { LeadForm } from "@/components/LeadForm";
import { PrefillLink } from "@/components/PrefillLink";
import { DreamSlider } from "@/components/DreamSlider";
import { Quiz } from "@/components/Quiz";
import { Bars, Title } from "@/components/ui";

const catalogCards: { id: CategoryId; img: string }[] = [
  { id: "kitchen", img: "/img/editorial/e-kitchen.jpg" },
  { id: "wardrobe", img: "/img/editorial/e-walkin.jpg" },
  { id: "horeca", img: "/img/stock/s-horeca-gold.jpg" },
  { id: "bedroom", img: "/img/editorial/e-nightstand.jpg" },
  { id: "living", img: "/img/editorial/e-living.jpg" },
  { id: "bath", img: "/img/editorial/e-mirror.jpg" },
];

/** Completed apartment project; captions come from the dictionary in the same order. */
const gallery = [
  "/img/editorial/e-living.jpg",
  "/img/editorial/e-shelf.jpg",
  "/img/editorial/e-kitchen.jpg",
  "/img/editorial/e-walkin.jpg",
  "/img/editorial/e-nightstand.jpg",
  "/img/editorial/e-table.jpg",
];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const [b1, s1, b2, s2] = t.hero.trust;

  return (
    <>
      <Header lang={lang} dict={t} />
      <main id="top">
        {/* Hero: the slogan, shown literally as dream → reality */}
        <section className="hero dark">
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-copy">
                <div className="eyebrow rise">{t.hero.eyebrow}</div>
                <Title as="h1" parts={t.hero.title} className="hero-title rise d2" />
                <p className="lead rise d3">{t.hero.lead}</p>
                <div className="rise d4 flex flex-wrap gap-3.5">
                  <a className="btn btn-gold" href="#quiz">
                    <span>{t.hero.cta1}</span>
                    <span className="arr">→</span>
                  </a>
                  <a className="btn btn-ghost" href="#project">{t.hero.cta2}</a>
                </div>
                <p className="rise d4 text-sm text-[var(--gold-soft)]">{t.hero.assurance}</p>
                <p className="trust rise d4">
                  <span className="dot" />
                  <span>
                    {b1 && <b>{b1}</b>}
                    {s1}
                    {b2 && <b>{b2}</b>}
                    {s2}
                  </span>
                </p>
              </div>
              <div className="hero-media">
                <DreamSlider src="/img/stock/s-hero-kitchen.jpg" alt={t.catalog.items.kitchen} dream={t.hero.dream} reality={t.hero.reality} hint={t.hero.drag} />
                <div className="hero-tag z-[5]">
                  <b>{t.hero.tagValue}</b>
                  {t.hero.tag}
                </div>
                <Bars />
              </div>
            </div>
            <div className="stats">
              {t.stats.map((s) => (
                <div className="stat" key={s.value}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Segments */}
        <section className="section seg dark" id="segments">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">{t.segments.eyebrow}</div>
              <Title parts={t.segments.title} />
            </div>
            <Segments t={t.segments} />
          </div>
        </section>

        {/* Catalogue */}
        <section className="section light" id="catalog">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">{t.catalog.eyebrow}</div>
              <Title parts={t.catalog.title} />
              <p className="lead">{t.catalog.lead}</p>
            </div>
            <div className="cat-grid">
              {catalogCards.map(({ id, img }) => (
                <PrefillLink key={id} prefill={{ category: id }} className="card">
                  <div className="ph art relative aspect-[4/5]">
                    <Image src={img} alt={t.catalog.items[id]} fill sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, 33vw" className="object-cover" />
                  </div>
                  <div className="meta">
                    <h3 className="h-display">{t.catalog.items[id]}</h3>
                    <span className="go">{t.catalog.go} →</span>
                  </div>
                </PrefillLink>
              ))}
            </div>
            <div className="styles">
              <span className="lbl">{t.catalog.stylesLabel}</span>
              {t.catalog.styles.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Lead quiz: the main conversion point */}
        <section className="section dark quiz-sec" id="quiz">
          <div className="wrap quiz-grid">
            <div className="form-side">
              <div className="eyebrow">{t.quiz.eyebrow}</div>
              <Title parts={t.quiz.title} />
              <p className="lead">{t.quiz.lead}</p>
              <ul className="checks">
                {t.quiz.perks.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <Quiz lang={lang} t={t.quiz} lead={t.lead} segments={t.segments.items} categories={t.catalog.items} />
          </div>
        </section>

        {/* Completed project gallery */}
        <section className="section light pt-0" id="project">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">{t.gallery.eyebrow}</div>
              <Title parts={t.gallery.title} />
              <p className="lead">{t.gallery.lead}</p>
            </div>
            <div className="gallery">
              {gallery.map((src, i) => (
                <figure key={src} className={`g-item art g-${i}`}>
                  <Image src={src} alt={t.gallery.captions[i]} fill sizes={i === 0 ? "(max-width: 860px) 100vw, 50vw" : "(max-width: 860px) 50vw, 25vw"} className="object-cover" />
                  <figcaption>{t.gallery.captions[i]}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* HoReCa cases */}
        <section className="section dark" id="cases">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">{t.cases.eyebrow}</div>
              <Title parts={t.cases.title} />
              <p className="lead">{t.cases.lead}</p>
            </div>
            <div className="cases">
              <article className="case art">
                <Image src="/img/safia-1.jpg" alt="Safia" fill sizes="(max-width: 860px) 100vw, 55vw" className="object-cover" />
                <div className="case-body">
                  <span className="client-logo">
                    <Image src="/brand/clients/safia-logo.jpg" alt="Safia café & bakery" width={308} height={187} className="h-14 w-auto" />
                  </span>
                  <span className="chip">{t.cases.safia.chip}</span>
                  <h3 className="h-display">Safia</h3>
                  <p>{t.cases.safia.text}</p>
                </div>
              </article>
              <article className="case soon">
                <Bars />
                <div className="case-body">
                  <Image src="/brand/clients/burger-embassy-logo.jpg" alt="Burger Embassy — Embassy of Burgers" width={150} height={150} className="client-round" />
                  <span className="chip">{t.cases.embassy.chip}</span>
                  <h3 className="h-display">Burger Embassy</h3>
                  <p>{t.cases.embassy.text}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Guarantees: answer the fears before they are asked */}
        <section className="section seg dark">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">{t.guarantees.eyebrow}</div>
              <Title parts={t.guarantees.title} />
            </div>
            <div className="guar">
              {t.guarantees.items.map((g) => (
                <div key={g.title}>
                  <span className="ico" aria-hidden="true" />
                  <h3 className="h-display">{g.title}</h3>
                  <p>{g.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page call to action */}
        <section className="band dark">
          <Image src="/img/stock/s-pendants.jpg" alt="" fill sizes="100vw" className="band-bg z-0 object-cover opacity-45" />
          <Bars />
          <div className="wrap band-inner">
            <div>
              <Title parts={t.band.title} />
              <p>{t.band.text}</p>
            </div>
            <a className="btn btn-gold" href="#quiz">
              <span>{t.band.cta}</span>
              <span className="arr">→</span>
            </a>
          </div>
        </section>

        {/* Factory */}
        <section className="section light" id="factory">
          <div className="wrap fac-grid">
            <div className="fac-media">
              <div className="chamfer art relative aspect-[4/5] w-full">
                <Image src="/img/stock/s-cnc.jpg" alt="" fill sizes="(max-width: 860px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="sites">
                {t.factory.sites.map((s) => (
                  <div className="site" key={s.value}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid min-w-0 gap-8">
              <div className="sec-head !m-0">
                <div className="eyebrow">{t.factory.eyebrow}</div>
                <Title parts={t.factory.title} />
                <p className="lead">{t.factory.lead}</p>
              </div>
              <div className="facts">
                {t.factory.facts.map((f) => (
                  <div className="fact" key={f.title}>
                    <b>{f.title}</b>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section process light">
          <div className="wrap">
            <div className="sec-head">
              <div className="eyebrow">{t.process.eyebrow}</div>
              <Title parts={t.process.title} />
            </div>
            <ol className="steps">
              {t.process.steps.map((s) => (
                <li key={s.title}>
                  <h3 className="h-display">{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Lead form */}
        <section className="section dark" id="lead">
          <div className="wrap form-grid">
            <div className="form-side">
              <div className="eyebrow">{t.lead.eyebrow}</div>
              <Title parts={t.lead.title} />
              <p className="lead">{t.lead.lead}</p>
              <div className="contacts">
                <div>
                  <small>{t.lead.phoneLabel}</small>
                  <a href={contacts.phoneHref}>{t.lead.phone}</a>
                </div>
                <div>
                  <small>{t.lead.office}</small>
                  <span>{t.lead.address}</span>
                </div>
                <div>
                  <small>Instagram</small>
                  <a href={contacts.instagram} target="_blank" rel="noopener">@express_mebel__uz</a>
                </div>
              </div>
            </div>
            <LeadForm lang={lang} t={t.lead} segments={t.segments.items} categories={t.catalog.items} />
          </div>
        </section>
      </main>

      <footer className="site-footer dark">
        <div className="wrap foot">
          <Image src="/brand/logo-light.webp" alt="Express Mebel" width={2000} height={515} className="h-10 w-auto" />
          <span>{t.footer.rights}</span>
        </div>
      </footer>

      {/* Phone-width sticky bar: call or request in one tap */}
      <div className="mbar">
        <a className="btn btn-ghost" href={contacts.phoneHref}>{t.nav.call}</a>
        <a className="btn btn-gold" href="#quiz">{t.nav.cta}</a>
      </div>
    </>
  );
}
