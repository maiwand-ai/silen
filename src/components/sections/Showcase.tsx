"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Expand, Play } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { useLocale, useQuote } from "@/components/providers/SiteProviders";
import { AdArtwork } from "@/components/ui/AdArtwork";
import { MediaModal, type MediaItem } from "@/components/ui/MediaModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceById } from "@/content/services";
import { conceptFormatLabels, showcaseIndustries } from "@/content/showcase";
import { tx } from "@/lib/i18n";

export function Showcase() {
  const { locale, t } = useLocale();
  const { openQuote } = useQuote();
  const [active, setActive] = useState(0);
  const [media, setMedia] = useState<MediaItem | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const industry = showcaseIndustries[active];
  const count = industry.concepts.length;

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = showcaseIndustries.length - 1;
    const next = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="showcase" aria-labelledby="showcase-title" className="grain relative overflow-hidden bg-navy py-20 text-white sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-lime/15 blur-[110px]" />
      <div className="container-site relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="showcase-title" eyebrow={t.showcase.eyebrow} title={t.showcase.title} intro={t.showcase.intro} tone="dark" />
        </div>

        <div
          role="tablist"
          aria-label={t.showcase.selectLabel}
          className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {showcaseIndustries.map((ind, i) => {
            const selected = i === active;
            return (
              <button
                key={ind.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`showcase-tab-${ind.id}`}
                aria-selected={selected}
                aria-controls="showcase-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`shrink-0 rounded-full px-5 py-3 text-sm font-bold transition sm:text-base ${
                  selected ? "bg-lime text-navy" : "bg-white/8 text-white ring-1 ring-white/15 hover:bg-white/15"
                }`}
              >
                {tx(ind.label, locale)}
              </button>
            );
          })}
        </div>

        <div id="showcase-panel" role="tabpanel" aria-labelledby={`showcase-tab-${industry.id}`} className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <p className="max-w-xl text-lg text-white/80">{tx(industry.intro, locale)}</p>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{t.showcase.suitableServices}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {industry.services.map((id) => (
                      <li key={id} className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-white">
                        {tx(serviceById(id)!.title, locale)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <ul className="mt-8 grid auto-rows-[13rem] grid-cols-2 gap-3 sm:auto-rows-[15rem] md:grid-cols-4 lg:auto-rows-[17rem] lg:gap-4">
                {industry.concepts.map((c, i) => {
                  const big = i === 0;
                  const wideLast = count === 4 && i === 3;
                  const label = tx(conceptFormatLabels[c.format], locale);
                  return (
                    <motion.li
                      key={c.image + i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.4 }}
                      className={`${big ? "col-span-2 row-span-2" : ""} ${wideLast ? "col-span-2" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setMedia({
                            title: `${label} — ${tx(c.overlay, locale)}`,
                            description: tx(c.caption, locale),
                            badge: t.common.concept,
                            meta: tx(industry.label, locale),
                            image: c.image,
                            imageAlt: tx(c.alt, locale),
                            video: c.video ? { type: "file", src: c.video } : undefined,
                            orientation: c.format === "video" ? "landscape" : c.format === "reel" ? "portrait" : undefined,
                          })
                        }
                        className="group relative block h-full w-full overflow-hidden rounded-[1.4rem] text-left"
                        aria-label={`${label}: ${tx(c.overlay, locale)}. ${c.video ? t.showcase.play : t.portfolio.viewVisual}`}
                      >
                        <AdArtwork
                          image={c.image}
                          alt={tx(c.alt, locale)}
                          overlay={tx(c.overlay, locale)}
                          textSize={big ? "lg" : "md"}
                          sizes={big ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                          className="h-full w-full"
                        />
                        <span className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.68rem] font-bold text-navy backdrop-blur">{label}</span>
                          <span className="rounded-full bg-navy/70 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-lime backdrop-blur">
                            {t.common.concept}
                          </span>
                        </span>
                        <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-lime text-navy opacity-90 transition group-hover:scale-110 group-hover:opacity-100">
                          {c.video ? <Play className="h-4 w-4 translate-x-px" aria-hidden="true" /> : <Expand className="h-4 w-4" aria-hidden="true" />}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-white/60">{t.showcase.note}</p>
          <button
            type="button"
            onClick={() => openQuote({ industry: industry.id, services: industry.services })}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-lime px-7 py-4 font-bold text-navy transition hover:bg-lime-300"
          >
            {t.showcase.cta}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </div>
      <MediaModal item={media} onClose={() => setMedia(null)} />
    </section>
  );
}
