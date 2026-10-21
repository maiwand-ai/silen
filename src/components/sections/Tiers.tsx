"use client";

import { ArrowRight, Check, Info } from "lucide-react";
import { useLocale, useQuote } from "@/components/providers/SiteProviders";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingConfig } from "@/config/pricing";
import { socialTiers } from "@/content/packages";
import { fmt } from "@/i18n";
import { tx } from "@/lib/i18n";
import { formatPrice } from "@/lib/package";

export function Tiers() {
  const { locale, t } = useLocale();
  const { openQuote } = useQuote();

  return (
    <section id="social-tiers" aria-labelledby="tiers-title" className="bg-mist py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading id="tiers-title" eyebrow={t.tiers.eyebrow} title={t.tiers.title} intro={t.tiers.intro} />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {socialTiers.map((tier, i) => {
            const featured = tier.featured;
            const price = pricingConfig.tiers[tier.id];
            const showPrice = pricingConfig.mode === "estimate" && price?.amount != null;
            return (
              <Reveal as="li" key={tier.id} delay={i * 0.08}>
                <article
                  className={`relative flex h-full flex-col rounded-[2rem] p-7 sm:p-9 ${
                    featured ? "bg-navy text-white shadow-[0_40px_80px_-40px_rgba(15,22,43,0.8)]" : "bg-white text-navy ring-1 ring-line"
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-lime px-3 py-1 text-xs font-bold text-navy">{t.tiers.mostChosen}</span>
                  )}
                  <p className={`text-sm font-bold ${featured ? "text-lime" : "text-navy/70"}`}>{fmt(t.tiers.level, { n: i + 1 })}</p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{tx(tier.name, locale)}</h3>
                  <p className={`mt-3 text-lg leading-snug ${featured ? "text-white/85" : "text-muted"}`}>
                    <span className="font-serif italic">“{tx(tier.tagline, locale)}”</span>
                  </p>
                  <ul className="mt-7 space-y-2.5">
                    {tier.items.map((item) => (
                      <li key={item.en} className="flex items-start gap-2.5">
                        <Check className={`mt-0.5 h-5 w-5 shrink-0 rounded-full p-1 ${featured ? "bg-lime text-navy" : "bg-navy text-lime"}`} aria-hidden="true" />
                        {tx(item, locale)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <p className={`text-sm font-semibold ${featured ? "text-white/70" : "text-muted"}`}>
                      {showPrice
                        ? `${fmt(t.tiers.from, { price: formatPrice(price.amount!, locale) })}${price.billing === "monthly" ? ` · ${t.builder.perMonth}` : ""}`
                        : t.tiers.priceOnRequest}
                    </p>
                    <button
                      type="button"
                      onClick={() => openQuote({ services: [...new Set([tier.service, "social" as const])] })}
                      className={`group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold transition ${
                        featured ? "bg-lime text-navy hover:bg-lime-300" : "bg-navy text-white hover:bg-navy-700"
                      }`}
                    >
                      {t.tiers.cta}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <p className="mt-8 flex max-w-3xl gap-2 text-sm leading-relaxed text-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {t.tiers.note}
        </p>
      </div>
    </section>
  );
}
