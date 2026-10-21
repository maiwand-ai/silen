"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useLocale, useQuote } from "@/components/providers/SiteProviders";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries } from "@/content/industries";
import { serviceById } from "@/content/services";
import { href, tx } from "@/lib/i18n";

export function Industries() {
  const { locale, t } = useLocale();
  const { openQuote } = useQuote();
  const [featured, ...rest] = [...industries].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <section id="industries" aria-labelledby="industries-title" className="py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading id="industries-title" eyebrow={t.industries.eyebrow} title={t.industries.title} intro={t.industries.intro} />

        {/* Featured: fashion & boutiques */}
        <Reveal className="mt-14">
          <article className="grid overflow-hidden rounded-[2rem] bg-navy text-white lg:grid-cols-2">
            <div className="relative min-h-[22rem] lg:min-h-[32rem]">
              <Image src={featured.image} alt={tx(featured.imageAlt, locale)} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <span className="absolute left-5 top-5 rounded-full bg-lime px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-navy">{t.industries.featured}</span>
            </div>
            <div className="flex flex-col p-7 sm:p-10 lg:p-14">
              <h3 className="display-3">{tx(featured.name, locale)}</h3>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-white/60">{t.industries.needs}</p>
              <ul className="mt-3 space-y-2.5">
                {featured.needs.map((n) => (
                  <li key={n.en} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-lime p-1 text-navy" aria-hidden="true" />
                    {tx(n, locale)}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-white/60">{t.industries.services}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {featured.services.map((id) => (
                  <li key={id} className="rounded-full bg-white/10 px-3 py-1.5 text-sm">{tx(serviceById(id)!.title, locale)}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row">
                <Link href={href("boutique", locale)} className="group inline-flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 font-bold text-navy transition hover:bg-lime-300">
                  {t.industries.boutiqueCta}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => openQuote({ industry: featured.id, services: featured.services })}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-bold transition hover:bg-white hover:text-navy"
                >
                  {t.industries.cta}
                </button>
              </div>
            </div>
          </article>
        </Reveal>

        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((ind, i) => (
            <Reveal as="li" key={ind.id} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-mist">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={ind.image} alt={tx(ind.imageAlt, locale)} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-extrabold tracking-tight text-navy">{tx(ind.name, locale)}</h3>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-navy/70">{t.industries.needs}</p>
                  <ul className="mt-2 space-y-1.5 text-[0.95rem] text-muted">
                    {ind.needs.map((n) => (
                      <li key={n.en} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
                        {tx(n, locale)}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-navy/70">{t.industries.services}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {ind.services.map((id) => (
                      <li key={id} className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-navy">{tx(serviceById(id)!.title, locale)}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => openQuote({ industry: ind.id, services: ind.services })}
                    className="mt-auto inline-flex items-center gap-2 self-start pt-6 font-bold text-navy underline-offset-4 hover:underline"
                  >
                    {t.industries.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
