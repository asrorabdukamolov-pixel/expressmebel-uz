import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pages } from "@/i18n/pages";
import { home2 } from "@/i18n/home2";
import { contacts } from "@/lib/site";

/** Kulrang blok: matn, tugma va aylanib turadigan yozuvli doira (o'rtasida 3 chiziq). */
export function CtaBlock({ lang }: { lang: Locale }) {
  const c = pages[lang].cta;
  return (
    <section className="wrap cta-wrap">
      <div className="cta" data-reveal>
        <div className="cta-copy">
          <p>{c.text}</p>
          <a className="btn btn-teal" href={`/${lang}#quiz`}>
            <span>{c.button}</span>
            <span className="arr">→</span>
          </a>
        </div>
        <div className="cta-ring" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <defs>
              <path id="ring-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text>
              <textPath href="#ring-path" textLength="486" lengthAdjust="spacing">{c.ring}</textPath>
            </text>
          </svg>
          <span className="cta-ring-bars"><i /><i /><i /></span>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ lang, rights }: { lang: Locale; rights: string }) {
  const p = pages[lang];
  const office = home2[lang].contact;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <Image src="/brand/logo-dark.webp" alt="Express Mebel" width={2000} height={516} className="foot-logo" />
        <div className="foot-grid">
          <div className="foot-contact">
            <small>{p.footer.phone}</small>
            <a className="foot-phone" href={contacts.phoneHref}>{contacts.phone}</a>
            <span>{office.address}</span>
          </div>
          <div>
            <small>{p.footer.menu}</small>
            <Link href={`/${lang}/catalog`}>{p.menu.catalog}</Link>
            <Link href={`/${lang}/projects`}>{p.menu.projects}</Link>
            <Link href={`/${lang}/about`}>{p.menu.about}</Link>
            <Link href={`/${lang}/office`}>{p.menu.office}</Link>
          </div>
          <div>
            <small>{p.footer.social}</small>
            <a href={contacts.instagram} target="_blank" rel="noopener">Instagram</a>
            <a href={contacts.telegramCatalog} target="_blank" rel="noopener">Telegram</a>
          </div>
          <div className="foot-rights">{rights}</div>
        </div>
      </div>
    </footer>
  );
}

export function MobileBar({ lang, call, cta }: { lang: Locale; call: string; cta: string }) {
  return (
    <div className="mbar">
      <a className="btn btn-line" href={contacts.phoneHref}>{call}</a>
      <a className="btn btn-teal" href={`/${lang}#quiz`}>{cta}</a>
    </div>
  );
}

/** Sahifa sarlavhasi: Mossman kabi katta, bosh harflar bilan. */
export function PageTitle({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="page-head">
      <h1 className="page-title">{title}</h1>
      {lead && <p className="page-lead">{lead}</p>}
    </div>
  );
}
