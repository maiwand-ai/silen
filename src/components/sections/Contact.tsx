"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useContactChannels, useSocialLinks } from "@/components/layout/Footer";
import { useLocale, useQuote } from "@/components/providers/SiteProviders";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { href } from "@/lib/i18n";

export function Contact() {
  const { locale, t } = useLocale();
  const { openQuote } = useQuote();
  const channels = useContactChannels();
  const socials = useSocialLinks();

  return (
    <section id="contact" aria-labelledby="contact-title" className="grain relative overflow-hidden bg-navy py-24 text-white sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] rounded-full bg-lime/30 blur-[130px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-lime/10 blur-[100px]" />
      <div className="container-site relative">
        <Reveal className="max-w-5xl">
          <p className="eyebrow text-lime">{t.contact.eyebrow}</p>
          <h2 id="contact-title" className="display-1 mt-6">
            <Rich text={t.contact.title} accentClassName="accent text-lime" />
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">{t.contact.text}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openQuote()}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-lime px-8 py-4 text-lg font-bold text-navy transition hover:bg-lime-300"
            >
              {t.contact.quote}
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <Link
              href={href("home", locale, "packages")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-lg font-bold transition hover:bg-white hover:text-navy"
            >
              {t.contact.form}
            </Link>
          </div>
        </Reveal>

        {(channels.length > 0 || socials.length > 0) && (
          <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-lime text-navy">{c.icon}</span>
                  <span className="mt-5 block text-sm text-white/60">{c.label}</span>
                  <span className="mt-1 block break-all text-lg font-bold">{c.value}</span>
                </>
              );
              return (
                <li key={c.id}>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group relative block h-full rounded-[1.6rem] bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10"
                    >
                      {inner}
                      <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-white/40 transition group-hover:text-lime" aria-hidden="true" />
                    </a>
                  ) : (
                    <div className="h-full rounded-[1.6rem] bg-white/5 p-6 ring-1 ring-white/10">{inner}</div>
                  )}
                </li>
              );
            })}
            {socials.length > 0 && (
              <li className="rounded-[1.6rem] bg-white/5 p-6 ring-1 ring-white/10">
                <span className="block text-sm text-white/60">{t.contact.social}</span>
                <span className="mt-4 flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full bg-white text-navy transition hover:bg-lime"
                    >
                      {s.icon}
                    </a>
                  ))}
                </span>
              </li>
            )}
          </ul>
        )}
      </div>
    </section>
  );
}
