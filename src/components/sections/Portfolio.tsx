"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Expand, Image as ImageIcon, Play } from "lucide-react";
import { useState } from "react";
import { useLocale, useQuote } from "@/components/providers/SiteProviders";
import { AdArtwork } from "@/components/ui/AdArtwork";
import { MediaModal, type MediaItem } from "@/components/ui/MediaModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolio, portfolioCategories, type PortfolioCategory, type PortfolioItem } from "@/content/portfolio";
import type { ServiceId } from "@/content/services";
import { plural } from "@/i18n";
import { tx } from "@/lib/i18n";

/** Service preselected in the quote wizard for each portfolio filter. */
const filterService: Record<PortfolioCategory, ServiceId> = {
  video: "video",
  fashion: "fashion",
  product: "visual",
  social: "social",
  branding: "creative",
  campaign: "creative",
};

export function Portfolio() {
  const { locale, t } = useLocale();
  const { openQuote } = useQuote();
  const [filter, setFilter] = useState<"all" | PortfolioCategory>("all");
  const [media, setMedia] = useState<MediaItem | null>(null);

  const items = portfolio.filter((p) => filter === "all" || p.categories.includes(filter));
  const categoryLabel = (id: PortfolioCategory) => tx(portfolioCategories.find((c) => c.id === id)!.label, locale);

  const open = (p: PortfolioItem) =>
    setMedia({
      title: tx(p.title, locale),
      description: tx(p.description, locale),
      badge: p.isConcept ? t.common.conceptProject : t.common.clientProject,
      meta: tx(p.projectType, locale),
      image: p.thumbnail,
      imageAlt: tx(p.thumbnailAlt, locale),
      video: p.video,
      orientation: p.orientation,
    });

  return (
    <section id="work" aria-labelledby="work-title" className="py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading id="work-title" eyebrow={t.portfolio.eyebrow} title={t.portfolio.title} intro={t.portfolio.intro} />

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label={t.portfolio.filterLabel} className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {portfolioCategories.map((c) => {
              const selected = filter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(c.id)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${selected ? "bg-navy text-white" : "bg-mist text-navy hover:bg-line"}`}
                >
                  {tx(c.label, locale)}
                </button>
              );
            })}
          </div>
          <p className="text-sm text-muted" aria-live="polite">
            {plural(items.length, t.portfolio.showingOne, t.portfolio.showing)}
          </p>
        </div>

        {items.length === 0 ? (
          <p className="mt-12 rounded-3xl bg-mist p-10 text-center text-muted">{t.portfolio.empty}</p>
        ) : (
          <motion.ul layout className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {items.map((p) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <article className="group">
                    <button
                      type="button"
                      onClick={() => open(p)}
                      className="relative block w-full overflow-hidden rounded-[1.6rem] text-left"
                      aria-label={`${p.video ? t.portfolio.playVideo : t.portfolio.viewVisual}: ${tx(p.title, locale)}`}
                    >
                      <AdArtwork
                        image={p.thumbnail}
                        alt={tx(p.thumbnailAlt, locale)}
                        overlay={p.overlay ? tx(p.overlay, locale) : undefined}
                        className="aspect-[4/5] w-full"
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                      />
                      <span className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                        <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider ${p.isConcept ? "bg-navy/75 text-lime backdrop-blur" : "bg-lime text-navy"}`}>
                          {p.isConcept ? t.common.conceptProject : t.common.clientProject}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[0.68rem] font-bold text-navy">
                          {p.video ? <Play className="h-3 w-3" aria-hidden="true" /> : <ImageIcon className="h-3 w-3" aria-hidden="true" />}
                          {p.video ? t.portfolio.video : t.portfolio.stillVisual}
                        </span>
                      </span>
                      <span className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-lime text-navy shadow-lg transition duration-300 group-hover:scale-110">
                        {p.video ? <Play className="h-5 w-5 translate-x-px" aria-hidden="true" /> : <Expand className="h-5 w-5" aria-hidden="true" />}
                      </span>
                    </button>
                    <div className="mt-4 px-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                        {tx(p.projectType, locale)} · {p.categories.slice(0, 2).map(categoryLabel).join(" / ")}
                      </p>
                      <h3 className="mt-1.5 text-xl font-bold tracking-tight text-navy">{tx(p.title, locale)}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{tx(p.description, locale)}</p>
                    </div>
                  </article>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}

        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-mist p-7 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="text-2xl font-bold tracking-tight text-navy">{t.portfolio.ctaTitle}</p>
            <p className="mt-2 max-w-2xl text-sm text-muted">{t.portfolio.conceptNote}</p>
          </div>
          <button
            type="button"
            onClick={() => openQuote(filter === "all" ? undefined : { services: [filterService[filter]] })}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-7 py-4 font-bold text-white transition hover:bg-navy-700"
          >
            {t.portfolio.cta}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </div>
      <MediaModal item={media} onClose={() => setMedia(null)} />
    </section>
  );
}
