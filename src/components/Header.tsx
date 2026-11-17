import Image from "next/image";
import Link from "next/link";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { contacts } from "@/lib/site";

/** `path` is the sub-page ("" for home, "/works" for the catalogue) so language links keep the visitor on it. */
export function Header({ lang, dict, path = "" }: { lang: Locale; dict: Dictionary; path?: string }) {
  const home = `/${lang}`;
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link href={home} aria-label="Express Mebel" className="shrink-0">
          <Image src="/brand/logo-light.webp" alt="Express Mebel" width={2000} height={515} priority className="logo-img" />
        </Link>
        <ul className="nav-links">
          <li><a href={`${home}#segments`}>{dict.nav.segments}</a></li>
          <li><Link href={`${home}/works`} aria-current={path === "/works" ? "page" : undefined}>{dict.nav.catalog}</Link></li>
          <li><a href={`${home}#project`}>{dict.nav.cases}</a></li>
          <li><a href={`${home}#factory`}>{dict.nav.factory}</a></li>
        </ul>
        <div className="nav-r">
          <a className="nav-phone hidden xl:inline" href={contacts.phoneHref}>{contacts.phone}</a>
          <nav className="lang" aria-label="Language">
            {locales.map((l) => (
              <Link key={l} href={`/${l}${path}`} hrefLang={l} aria-current={l === lang ? "true" : undefined}>
                {localeLabels[l]}
              </Link>
            ))}
          </nav>
          <a className="btn btn-gold" href={`${home}#quiz`}>{dict.nav.cta}</a>
        </div>
      </div>
    </header>
  );
}
