"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { useLocale, useQuote } from "@/components/providers/SiteProviders";
import { Modal } from "@/components/ui/Modal";
import { logo } from "@/config/media";
import { href, LANG_COOKIE, routeKeyFromPath, routes, type Locale } from "@/lib/i18n";

export function useNavItems() {
  const { locale, t } = useLocale();
  return [
    { label: t.nav.home, href: href("home", locale) },
    { label: t.nav.services, href: href("home", locale, "services") },
    { label: t.nav.work, href: href("home", locale, "work") },
    { label: t.nav.boutiques, href: href("boutique", locale) },
    { label: t.nav.packages, href: href("home", locale, "packages") },
    { label: t.nav.process, href: href("home", locale, "process") },
    { label: t.nav.contact, href: href("home", locale, "contact") },
  ];
}

export function LanguageSwitch({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const other: Locale = locale === "en" ? "tr" : "en";
  const target = routes[routeKeyFromPath(pathname)][other];

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.cookie = `${LANG_COOKIE}=${other}; path=/; max-age=31536000; samesite=lax`;
    window.location.assign(target + window.location.hash);
  };

  return (
    <a
      href={target}
      hrefLang={other}
      lang={other}
      onClick={onClick}
      aria-label={t.nav.switchToLabel}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition ${
        tone === "dark" ? "text-navy hover:bg-navy/5" : "text-white hover:bg-white/10"
      } ${className}`}
    >
      <Globe className="h-4 w-4" aria-hidden="true" />
      <span>{t.nav.switchTo}</span>
    </a>
  );
}

export function Logo({ className = "h-10 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={logo.full}
      alt="Sevil — Bireysel Reklam Danışmanı"
      width={logo.fullWidth}
      height={logo.fullHeight}
      priority={priority}
      sizes="160px"
      className={className}
    />
  );
}

export function Header() {
  const { locale, t } = useLocale();
  const { openQuote } = useQuote();
  const items = useNavItems();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (link: string) => !link.includes("#") && link === pathname;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-[0_8px_30px_-18px_rgba(15,22,43,0.35)] backdrop-blur-xl" : "bg-white/0"
      }`}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-4 lg:h-20">
        <Link href={href("home", locale)} className="shrink-0 rounded-md" aria-label={`Sevil — ${t.nav.home}`}>
          <Logo className="h-10 w-auto lg:h-11" priority />
        </Link>

        <nav aria-label={t.nav.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {items.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative rounded-full px-3 py-2 text-[0.9rem] font-semibold transition hover:bg-navy/5 ${
                    isActive(item.href) ? "text-navy after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded after:bg-lime" : "text-navy/80 hover:text-navy"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitch className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => openQuote()}
            className="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 sm:inline-flex"
          >
            {t.common.getQuote}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t.nav.openMenu}
            aria-expanded={menuOpen}
            className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white transition hover:bg-navy-700 xl:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} label={t.nav.menu} closeLabel={t.nav.closeMenu} variant="drawer">
        <div className="flex min-h-full flex-col px-6 pb-8 pt-6">
          <Logo className="h-10 w-auto self-start" />
          <nav aria-label={t.nav.mainNav} className="mt-10">
            <ul className="space-y-1">
              {items.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    data-autofocus={i === 0 ? true : undefined}
                    className="flex items-baseline gap-3 rounded-xl px-3 py-3 text-2xl font-bold tracking-tight text-navy transition hover:bg-mist"
                  >
                    <span className="text-xs font-semibold text-muted tabular-nums">0{i + 1}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-3 pt-10">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openQuote();
              }}
              className="w-full rounded-full bg-lime px-6 py-4 text-base font-bold text-navy transition hover:bg-lime-300"
            >
              {t.common.getQuote}
            </button>
            <LanguageSwitch className="w-full justify-center border border-navy/15 py-3" />
          </div>
        </div>
      </Modal>
    </header>
  );
}
