import Image from "next/image";
import Link from "next/link";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { contacts } from "@/lib/site";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link href={`/${lang}`} aria-label="Express Mebel" className="shrink-0">
          <Image src="/brand/logo-light.webp" alt="Express Mebel" width={2000} height={515} priority className="logo-img" />
        </Link>
        <ul className="nav-links">
          <li><a href="#segments">{dict.nav.segments}</a></li>
          <li><a href="#catalog">{dict.nav.catalog}</a></li>
          <li><a href="#project">{dict.nav.cases}</a></li>
          <li><a href="#factory">{dict.nav.factory}</a></li>
        </ul>
        <div className="nav-r">
          <a className="nav-phone hidden xl:inline" href={contacts.phoneHref}>{contacts.phone}</a>
          <nav className="lang" aria-label="Language">
            {locales.map((l) => (
              <Link key={l} href={`/${l}`} hrefLang={l} aria-current={l === lang ? "true" : undefined}>
                {localeLabels[l]}
              </Link>
            ))}
          </nav>
          <a className="btn btn-gold" href="#quiz">{dict.nav.cta}</a>
        </div>
      </div>
    </header>
  );
}
