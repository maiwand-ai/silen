"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, CalendarCheck, Check, Layers, Plus, RefreshCw, ShieldCheck, Shirt, Sparkles, Play } from "lucide-react";
import { useState } from "react";
import { useLocale, useQuote } from "@/components/providers/SiteProviders";
import { InlineQuote } from "@/components/quote/InlineQuote";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Process } from "@/components/sections/Process";
import { AdArtwork } from "@/components/ui/AdArtwork";
import { MediaModal, type MediaItem } from "@/components/ui/MediaModal";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { boutiqueMedia, images, videos } from "@/config/media";
import { boutiqueFaq } from "@/content/faq";
import { tx } from "@/lib/i18n";
import type { QuotePrefill } from "@/lib/quote";

const BOUTIQUE_PREFILL: QuotePrefill = { industry: "fashion", services: ["fashion"] };
const benefitIcons = [CalendarCheck, Sparkles, Shirt, RefreshCw, Layers];

function BoutiqueHero() {
  const { t } = useLocale();
  const { openQuote } = useQuote();
  const b = t.boutique;
  return (
    <section aria-labelledby="boutique-title" className="relative overflow-hidden pb-20 pt-8 sm:pt-12">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-lime/25 blur-[120px]" />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h1 id="boutique-title" className="eyebrow text-navy">
            {b.title}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="display-1 mt-6 text-navy"
          >
            <Rich text={b.heroTitle} />
          </motion.p>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{b.heroText}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openQuote(BOUTIQUE_PREFILL)}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-4 font-bold text-white transition hover:bg-navy-700"
            >
              {b.heroCta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <a
              href="#boutique-process"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 px-7 py-4 font-bold text-navy transition hover:border-navy"
            >
              {b.heroSecondary}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-lg grid-cols-[1.2fr_1fr] gap-4 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="row-span-2 overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(15,22,43,0.6)]"
          >
            <AdArtwork image={boutiqueMedia.hero} alt="" overlay={b.overlays.hero} textSize="lg" className="h-full min-h-[22rem] w-full" sizes="(min-width: 1024px) 28vw, 55vw" priority />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }} className="overflow-hidden rounded-[1.6rem]">
            <AdArtwork image={boutiqueMedia.secondary} alt="" tone="lime" overlay={b.overlays.look} textSize="sm" className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 20vw, 40vw" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-mist">
            <Image src={boutiqueMedia.rack} alt="" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-navy">
              {t.common.concept}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BoutiqueShowcase() {
  const { t } = useLocale();
  const b = t.boutique;
  const [media, setMedia] = useState<MediaItem | null>(null);
  return (
    <section id="boutique-showcase" aria-labelledby="boutique-showcase-title" className="grain relative overflow-hidden bg-navy py-20 text-white sm:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:items-center">
        <div>
          <SectionHeading id="boutique-showcase-title" eyebrow={t.nav.boutiques} title={b.showcaseTitle} tone="dark" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {b.showcase.map((item) => (
              <li key={item} className="flex items-center gap-3 text-lg">
                <Check className="h-6 w-6 shrink-0 rounded-full bg-lime p-1 text-navy" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() =>
              setMedia({
                title: b.videoTitle,
                description: b.videoCaption,
                badge: t.common.conceptProject,
                image: images.boutiqueInterior,
                imageAlt: b.videoAlt,
                video: { type: "file", src: videos.boutiqueCollection },
                orientation: "landscape",
              })
            }
            className="group relative col-span-2 overflow-hidden rounded-[1.6rem] text-left"
            aria-label={`${t.portfolio.playVideo}: ${b.videoTitle}`}
          >
            <AdArtwork image={images.boutiqueInterior} alt="" overlay={b.videoTitle} className="aspect-video w-full" sizes="(min-width: 1024px) 50vw, 95vw" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime text-navy shadow-xl transition group-hover:scale-110">
              <Play className="h-6 w-6 translate-x-0.5" aria-hidden="true" />
            </span>
            <span className="absolute left-4 top-4 rounded-full bg-navy/75 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-lime">{t.common.conceptProject}</span>
          </button>
          <div className="overflow-hidden rounded-[1.6rem]">
            <AdArtwork image={images.boutiqueKnitwear} alt="" tone="navy" overlay={b.overlays.knit} textSize="sm" className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 25vw, 45vw" />
          </div>
          <div className="overflow-hidden rounded-[1.6rem]">
            <AdArtwork image={images.fashionStreet} alt="" overlay={b.overlays.arrivals} textSize="sm" className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 25vw, 45vw" />
          </div>
          <p className="col-span-2 text-sm text-white/60">{b.videoCaption}</p>
        </div>
      </div>
      <MediaModal item={media} onClose={() => setMedia(null)} />
    </section>
  );
}

function Benefits() {
  const { t } = useLocale();
  const b = t.boutique;
  return (
    <section aria-labelledby="benefits-title" className="py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading id="benefits-title" eyebrow={t.why.eyebrow} title={b.benefitsTitle} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {b.benefits.map((item, i) => {
            const BenefitIcon = benefitIcons[i % benefitIcons.length];
            return (
              <Reveal as="li" key={item.title} delay={i * 0.06} className="rounded-[1.6rem] bg-mist p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-lime">
                  <BenefitIcon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold leading-tight tracking-tight text-navy">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Honesty() {
  const { t } = useLocale();
  const b = t.boutique;
  return (
    <section aria-labelledby="honesty-title" className="pb-20 sm:pb-28">
      <div className="container-site">
        <div className="grid gap-10 rounded-[2rem] border-2 border-navy p-7 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ShieldCheck className="h-10 w-10 text-navy" aria-hidden="true" />
            <h2 id="honesty-title" className="display-3 mt-5 text-navy">
              <Rich text={b.honestyTitle} />
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{b.honestyText}</p>
          </div>
          <ul className="space-y-4">
            {b.honesty.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl bg-mist p-4 leading-relaxed text-navy">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-lime ring-4 ring-lime/30" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { locale, t } = useLocale();
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-20 sm:pb-28">
      <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading id="faq-title" eyebrow="FAQ" title={t.boutique.faqTitle} />
        <ul className="divide-y divide-line border-y border-line">
          {boutiqueFaq.map((item) => (
            <li key={item.q.en}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-bold text-navy [&::-webkit-details-marker]:hidden">
                  {tx(item.q, locale)}
                  <Plus className="h-5 w-5 shrink-0 transition group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="pb-6 pr-8 leading-relaxed text-muted">{tx(item.a, locale)}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BoutiquePage() {
  const { t } = useLocale();
  const b = t.boutique;
  return (
    <>
      <BoutiqueHero />
      <Process id="boutique-process" eyebrow={t.nav.process} title={b.processTitle} steps={b.process} />
      <BoutiqueShowcase />
      <BeforeAfter />
      <Benefits />
      <Honesty />
      <Faq />
      <InlineQuote title={b.formTitle} text={b.formText} prefill={BOUTIQUE_PREFILL} />
    </>
  );
}
