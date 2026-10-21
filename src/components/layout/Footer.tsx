"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { useLocale } from "@/components/providers/SiteProviders";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { contactAvailability, siteConfig, whatsappDigits, whatsappLink } from "@/config/site";
import { services } from "@/content/services";
import { href, tx } from "@/lib/i18n";
import { LanguageSwitch, Logo, useNavItems } from "./Header";

export type ContactChannel = { id: string; label: string; value: string; href?: string; icon: ReactNode; external?: boolean };

/** Contact options that are actually configured in src/config/site.ts. */
export function useContactChannels(): ContactChannel[] {
  const { t } = useLocale();
  const c = siteConfig.contact;
  const list: ContactChannel[] = [];
  if (contactAvailability.whatsapp) {
    list.push({
      id: "whatsapp",
      label: t.contact.whatsapp,
      value: `+${whatsappDigits()}`,
      href: whatsappLink(t.contact.whatsappMessage) ?? undefined,
      icon: <WhatsAppIcon className="h-5 w-5" />,
      external: true,
    });
  }
  if (contactAvailability.email) {
    list.push({ id: "email", label: t.contact.email, value: c.email, href: `mailto:${c.email}`, icon: <Mail className="h-5 w-5" aria-hidden="true" /> });
  }
  if (c.phone) {
    list.push({ id: "phone", label: t.contact.phone, value: c.phone, href: `tel:${c.phone.replace(/[^\d+]/g, "")}`, icon: <Phone className="h-5 w-5" aria-hidden="true" /> });
  }
  if (c.location) {
    list.push({ id: "location", label: t.contact.location, value: c.location, icon: <MapPin className="h-5 w-5" aria-hidden="true" /> });
  }
  return list;
}

export function useSocialLinks() {
  const s = siteConfig.social;
  return [
    { id: "instagram", label: "Instagram", url: s.instagram, icon: <InstagramIcon className="h-5 w-5" /> },
    { id: "tiktok", label: "TikTok", url: s.tiktok, icon: <TikTokIcon className="h-5 w-5" /> },
    { id: "facebook", label: "Facebook", url: s.facebook, icon: <FacebookIcon className="h-5 w-5" /> },
  ].filter((l) => /^https?:\/\//.test(l.url));
}

export function Footer() {
  const { locale, t } = useLocale();
  const nav = useNavItems();
  const channels = useContactChannels();
  const socials = useSocialLinks();

  return (
    <footer className="border-t border-line bg-mist">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <Logo className="h-14 w-auto" />
          <p className="mt-6 max-w-sm leading-relaxed text-muted">{t.footer.description}</p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-2">
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full bg-white text-navy ring-1 ring-line transition hover:bg-navy hover:text-white"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label={t.footer.explore}>
          <h2 className="eyebrow text-navy">{t.footer.explore}</h2>
          <ul className="mt-5 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-navy/80 transition hover:text-navy hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-navy">{t.footer.servicesTitle}</h2>
          <ul className="mt-5 space-y-2.5">
            {services.slice(0, 7).map((s) => (
              <li key={s.id}>
                <Link href={href("home", locale, "services")} className="text-navy/80 transition hover:text-navy hover:underline">
                  {tx(s.title, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-navy">{t.footer.contactTitle}</h2>
          {channels.length ? (
            <ul className="mt-5 space-y-3">
              {channels.map((c) => (
                <li key={c.id} className="flex items-start gap-3 text-navy/80">
                  <span className="mt-0.5 text-navy">{c.icon}</span>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="break-all transition hover:text-navy hover:underline"
                    >
                      <span className="sr-only">{c.label}: </span>
                      {c.value}
                    </a>
                  ) : (
                    <span>{c.value}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-relaxed text-muted">{t.footer.noContact}</p>
          )}
          <div className="mt-6">
            <p className="text-sm font-semibold text-navy">{t.footer.language}</p>
            <LanguageSwitch className="-ml-3 mt-1" />
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.brand}. {t.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label={t.footer.legal}>
            <li>
              <Link href={href("privacy", locale)} className="hover:text-navy hover:underline">
                {t.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={href("privacy", locale, "cookies")} className="hover:text-navy hover:underline">
                {t.footer.cookies}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
