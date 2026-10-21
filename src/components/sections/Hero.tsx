"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale, useQuote } from "@/components/providers/SiteProviders";
import { Rich } from "@/components/ui/Rich";
import { heroMedia, images } from "@/config/media";
import { href } from "@/lib/i18n";

/** Muted looping concept preview. Loads after the page is idle and respects reduced motion. */
function HeroVideo() {
  const { t } = useLocale();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => {
      video.src = heroMedia.previewVideo;
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    // Start after the page has settled so the video never competes with first paint.
    const timer = window.setTimeout(start, 1200);
    return () => {
      window.clearTimeout(timer);
      video.pause();
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (!video.src) video.src = heroMedia.previewVideo;
    if (video.paused) video.play().then(() => setPlaying(true)).catch(() => {});
    else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.6rem] bg-navy ring-4 ring-white">
      <video
        ref={ref}
        poster={images.fashionCityCoat}
        muted
        loop
        playsInline
        preload="none"
        aria-label={t.hero.previewLabel}
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3">
        <span className="rounded-full bg-black/45 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white backdrop-blur">
          {t.common.concept}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-3 pt-10">
        <span className="text-xs font-semibold text-white">{t.hero.previewLabel}</span>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? t.hero.pauseVideo : t.hero.playVideo}
          className="grid h-9 w-9 place-items-center rounded-full bg-lime text-navy transition hover:scale-105"
        >
          {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4 translate-x-px" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}

export function Hero() {
  const { locale, t } = useLocale();
  const { openQuote } = useQuote();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-6 sm:pt-10 lg:pb-24">
      {/* Background shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[38rem] w-[38rem] rounded-full bg-lime/25 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-mist blur-3xl" />

      <div className="container-site relative grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.p {...fadeUp(0)} className="eyebrow text-navy">
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1 {...fadeUp(0.08)} id="hero-title" className="display-1 mt-6 text-navy">
            <Rich text={t.hero.title} accentClassName="accent relative whitespace-nowrap text-navy" />
          </motion.h1>
          <motion.p {...fadeUp(0.18)} className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {t.hero.description}
          </motion.p>
          <motion.div {...fadeUp(0.28)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => openQuote()}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-4 text-base font-bold text-white shadow-[0_18px_40px_-18px_rgba(15,22,43,0.8)] transition hover:bg-navy-700"
            >
              {t.hero.primary}
              <span className="grid h-7 w-7 place-items-center rounded-full bg-lime text-navy transition group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
            <Link
              href={href("home", locale, "work")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 bg-white px-7 py-4 text-base font-bold text-navy transition hover:border-navy"
            >
              {t.hero.secondary}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
          <motion.p {...fadeUp(0.36)} className="mt-6 text-xs text-muted">
            {t.hero.note}
          </motion.p>
        </div>

        {/* Visual collage */}
        <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:col-span-5 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-[2.2rem] bg-mist shadow-[0_40px_90px_-40px_rgba(15,22,43,0.55)]"
          >
            <Image
              src={heroMedia.main}
              alt={t.hero.mainAlt}
              fill
              priority
              sizes="(min-width: 1024px) 34vw, 82vw"
              className="object-cover object-[50%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-lime">{t.hero.cardPost}</p>
              <p className="mt-1 font-serif text-3xl italic leading-none sm:text-4xl">{t.hero.mainOverlay}</p>
            </div>
          </motion.div>

          {/* Floating reel preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-2 bottom-[-8%] w-[38%] drop-shadow-[0_30px_40px_rgba(15,22,43,0.35)] sm:-left-6"
          >
            <HeroVideo />
          </motion.div>

          {/* Floating format chips */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute -right-2 top-[8%] hidden w-44 animate-float rounded-2xl bg-white p-2.5 shadow-[0_20px_50px_-20px_rgba(15,22,43,0.45)] sm:block xl:-right-6"
            aria-hidden="true"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image src={heroMedia.cards[0]} alt="" fill sizes="176px" className="object-cover" />
            </div>
            <p className="mt-2 px-1 text-xs font-bold text-navy">{t.hero.cardReel}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="absolute -right-1 bottom-[14%] hidden items-center gap-3 rounded-2xl bg-navy p-2.5 pr-4 text-white shadow-xl sm:flex xl:-right-10"
            aria-hidden="true"
          >
            <span className="relative h-12 w-12 overflow-hidden rounded-xl">
              <Image src={heroMedia.cards[1]} alt="" fill sizes="48px" className="object-cover" />
            </span>
            <span>
              <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-lime">{t.hero.cardStory}</span>
              <span className="block text-sm font-semibold">{t.hero.storyOverlay}</span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative mt-24 -rotate-1 bg-navy py-4 sm:mt-28" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...t.hero.marquee, ...t.hero.marquee].map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-lg font-bold text-white sm:text-2xl">
              {item}
              <span className="text-lime">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
