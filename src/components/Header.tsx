"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { pages } from "@/i18n/pages";
import { contacts } from "@/lib/site";

/** Mossman uslubidagi sarlavha: logo, til, telefon va 3 chiziqli menyu tugmasi.
 *  `overlay` bo'lsa (bosh sahifa) video ustida shaffof turadi, pastga surilganda oq bo'ladi.
 *  `path` til almashganda shu sahifada qolish uchun ("" bosh sahifa, "/catalog" va h.k.). */
export function Header({ lang, path = "", overlay = false }: { lang: Locale; path?: string; overlay?: boolean }) {
  const m = pages[lang].menu;
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(!overlay);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: `/${lang}/catalog`, label: m.catalog, key: "/catalog" },
    { href: `/${lang}/projects`, label: m.projects, key: "/projects" },
    { href: `/${lang}/about`, label: m.about, key: "/about" },
    { href: `/${lang}/office`, label: m.office, key: "/office" },
  ];
  const light = overlay && !solid && !open;

  return (
    <>
      <header className={`site-header ${overlay ? "is-overlay" : ""} ${light ? "is-light" : ""}`}>
        <div className="wrap nav">
          <Link href={`/${lang}`} aria-label="Express Mebel" className="shrink-0">
            <Image src={light ? "/brand/logo-light.webp" : "/brand/logo-dark.webp"} alt="Express Mebel" width={2000} height={516} priority className="logo-img" />
          </Link>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.key}>
                <Link href={l.href} aria-current={path === l.key ? "page" : undefined}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <div className="nav-r">
            <a className="nav-phone" href={contacts.phoneHref}>{contacts.phone}</a>
            <nav className="lang" aria-label="Language">
              {locales.map((l) => (
                <Link key={l} href={`/${l}${path}`} hrefLang={l} aria-current={l === lang ? "true" : undefined}>
                  {localeLabels[l]}
                </Link>
              ))}
            </nav>
            <button type="button" className={`burger ${open ? "is-open" : ""}`} aria-expanded={open} aria-controls="site-menu" aria-label={open ? m.close : m.open} onClick={() => setOpen((v) => !v)}>
              <i /><i /><i />
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="wrap menu-in">
          <ol className="menu-links">
            {links.map((l, i) => (
              <li key={l.key} style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}>
                <Link href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ol>
          <div className="menu-side">
            <a className="menu-phone" href={contacts.phoneHref} tabIndex={open ? 0 : -1}>{contacts.phone}</a>
            <a className="btn btn-teal" href={`/${lang}#quiz`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span>{m.cta}</span>
              <span className="arr">→</span>
            </a>
            <div className="menu-social">
              <a href={contacts.instagram} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>Instagram</a>
              <a href={contacts.telegramCatalog} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>Telegram</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
