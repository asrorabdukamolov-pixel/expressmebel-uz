import Image from "next/image";
import Link from "next/link";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { contacts } from "@/lib/site";
import { home2 } from "@/i18n/home2";

/** `path` is the sub-page ("" for home, "/works" for the catalogue) so language links keep the visitor on it. */
export function Header({ lang, dict, path = "" }: { lang: Locale; dict: Dictionary; path?: string }) {
  const home = `/${lang}`;
  const n = home2[lang].nav;
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link href={home} aria-label="Express Mebel" className="shrink-0">
          <Image src="/brand/logo-dark.webp" alt="Express Mebel" width={2000} height={516} priority className="logo-img" />
        </Link>
        <ul className="nav-links">
          <li><a href={`${home}#catalog`}>{n.catalog}</a></li>
          <li><a href={`${home}#projects`}>{n.projects}</a></li>
          <li><a href={`${home}#factory`}>{n.factory}</a></li>
          <li><a href={`${home}#lead`}>{n.contact}</a></li>
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
          <a className="btn btn-teal" href={`${home}#quiz`}>{dict.nav.cta}</a>
        </div>
      </div>
    </header>
  );
}
