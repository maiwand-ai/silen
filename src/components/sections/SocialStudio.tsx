"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid3x3, Info, Monitor, Play, Smartphone } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { useLocale } from "@/components/providers/SiteProviders";
import { AdArtwork } from "@/components/ui/AdArtwork";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { studioCampaigns, studioFeed, studioReels, studioStories } from "@/content/socialStudio";
import { fmt } from "@/i18n";
import { tx } from "@/lib/i18n";

type Tab = "feed" | "reels" | "stories" | "campaigns";
type Device = "desktop" | "mobile";
const TABS: Tab[] = ["feed", "reels", "stories", "campaigns"];

function ProfileHeader({ device }: { device: Device }) {
  const { t } = useLocale();
  const s = t.studio;
  return (
    <div className={`flex ${device === "desktop" ? "items-center gap-8 px-8 py-6" : "flex-col gap-3 px-4 pb-3 pt-4"}`}>
      <div className="flex items-center gap-4">
        <span className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-lime to-navy p-[3px] ${device === "desktop" ? "h-24 w-24" : "h-16 w-16"}`}>
          <span className="grid h-full w-full place-items-center rounded-full bg-white text-lg font-extrabold text-navy">YB</span>
        </span>
        {device === "mobile" && (
          <div>
            <p className="text-sm font-bold text-navy">{s.profileName}</p>
            <p className="text-xs text-muted">{s.profileTitle}</p>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        {device === "desktop" && (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-lg font-bold text-navy">{s.profileName}</p>
            <span className="rounded-lg bg-navy px-4 py-1.5 text-xs font-semibold text-white" aria-hidden="true">
              {s.follow}
            </span>
            <span className="rounded-lg bg-mist px-4 py-1.5 text-xs font-semibold text-navy" aria-hidden="true">
              {s.message}
            </span>
          </div>
        )}
        <p className={`text-navy ${device === "desktop" ? "mt-3 text-sm" : "text-xs"}`}>
          <span className="font-bold">{s.profileTitle}</span> · {s.profileBio}
        </p>
        <span className="mt-2 inline-block rounded-full bg-lime/40 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-navy">
          {s.exampleBadge}
        </span>
      </div>
    </div>
  );
}

function StoryViewer({ device }: { device: Device }) {
  const { locale, t } = useLocale();
  const [i, setI] = useState(0);
  const total = studioStories.length;
  const story = studioStories[i];
  return (
    <div className={`flex h-full items-center justify-center ${device === "desktop" ? "gap-6 bg-navy-800 p-6" : "bg-black"}`}>
      {device === "desktop" && (
        <div className="relative hidden aspect-[9/16] h-[70%] overflow-hidden rounded-2xl opacity-40 sm:block" aria-hidden="true">
          <Image src={studioStories[(i + total - 1) % total].image} alt="" fill sizes="120px" className="object-cover" />
        </div>
      )}
      <div className={`relative overflow-hidden bg-black ${device === "desktop" ? "aspect-[9/16] h-full rounded-2xl" : "h-full w-full"}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Image src={story.image} alt={tx(story.alt, locale)} fill sizes="320px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
            {story.overlay && (
              <p className="absolute bottom-16 left-5 right-5 font-serif text-3xl italic leading-tight text-white">{tx(story.overlay, locale)}</p>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-x-3 top-3 flex gap-1" aria-hidden="true">
          {studioStories.map((_, n) => (
            <span key={n} className={`h-0.5 flex-1 rounded ${n <= i ? "bg-white" : "bg-white/35"}`} />
          ))}
        </div>
        <div className="absolute left-3 top-6 flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[0.6rem] font-extrabold text-navy">YB</span>
          <span className="text-xs font-semibold text-white">{t.studio.profileName}</span>
        </div>
        <p className="sr-only" aria-live="polite">
          {fmt(t.studio.storyOf, { n: i + 1, total })}
        </p>
        <button
          type="button"
          onClick={() => setI((i + total - 1) % total)}
          aria-label={t.studio.storyPrev}
          className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy transition hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setI((i + 1) % total)}
          aria-label={t.studio.storyNext}
          className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-lime text-navy transition hover:bg-lime-300"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      {device === "desktop" && (
        <div className="relative hidden aspect-[9/16] h-[70%] overflow-hidden rounded-2xl opacity-40 sm:block" aria-hidden="true">
          <Image src={studioStories[(i + 1) % total].image} alt="" fill sizes="120px" className="object-cover" />
        </div>
      )}
    </div>
  );
}

function StudioContent({ tab, device }: { tab: Tab; device: Device }) {
  const { locale, t } = useLocale();
  const desktop = device === "desktop";

  if (tab === "stories") return <StoryViewer device={device} />;

  if (tab === "campaigns") {
    return (
      <div className={`grid h-full content-start gap-3 overflow-y-auto bg-mist ${desktop ? "grid-cols-4 items-start p-6" : "grid-cols-2 p-3"}`}>
        {studioCampaigns.map((c) => (
          <figure key={c.image} className={c.ratio === "16/9" ? "col-span-2" : ""}>
            <div style={{ aspectRatio: c.ratio.replace("/", " / ") }}>
              <AdArtwork
                image={c.image}
                alt={tx(c.alt, locale)}
                overlay={c.overlay ? tx(c.overlay, locale) : undefined}
                tone={c.tone ?? "photo"}
                textSize="sm"
                sizes="240px"
                className="h-full w-full rounded-xl"
              />
            </div>
            <figcaption className="mt-1.5 text-[0.7rem] font-semibold text-muted">{tx(c.format, locale)}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-white">
      <ProfileHeader device={device} />
      <div className="flex justify-center gap-10 border-t border-line text-[0.7rem] font-bold uppercase tracking-wider" aria-hidden="true">
        <span className={`flex items-center gap-1.5 border-t-2 py-2.5 ${tab === "feed" ? "border-navy text-navy" : "border-transparent text-muted"}`}>
          <Grid3x3 className="h-3.5 w-3.5" /> {t.studio.posts}
        </span>
        <span className={`flex items-center gap-1.5 border-t-2 py-2.5 ${tab === "reels" ? "border-navy text-navy" : "border-transparent text-muted"}`}>
          <Play className="h-3.5 w-3.5" /> Reels
        </span>
      </div>
      {tab === "feed" ? (
        <ul className="grid grid-cols-3 gap-0.5">
          {studioFeed.map((tile) => (
            <li key={tile.image}>
              <AdArtwork
                image={tile.image}
                alt={tx(tile.alt, locale)}
                overlay={tile.overlay ? tx(tile.overlay, locale) : undefined}
                tone={tile.tone ?? "photo"}
                textSize="sm"
                sizes={desktop ? "220px" : "120px"}
                className="aspect-[4/5] w-full"
              />
            </li>
          ))}
        </ul>
      ) : (
        <ul className={`grid gap-0.5 ${desktop ? "grid-cols-4" : "grid-cols-2"}`}>
          {studioReels.map((tile) => (
            <li key={tile.image}>
              <AdArtwork
                image={tile.image}
                alt={tx(tile.alt, locale)}
                overlay={tile.overlay ? tx(tile.overlay, locale) : undefined}
                textSize="sm"
                sizes={desktop ? "220px" : "160px"}
                className="aspect-[9/16] w-full"
              >
                <Play className="absolute right-2.5 top-2.5 h-4 w-4 fill-white text-white" aria-hidden="true" />
              </AdArtwork>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SocialStudio() {
  const { t } = useLocale();
  const s = t.studio;
  const [tab, setTab] = useState<Tab>("feed");
  const [device, setDevice] = useState<Device>("mobile");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const last = TABS.length - 1;
    const next = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : -1;
    if (next < 0) return;
    e.preventDefault();
    setTab(TABS[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="studio" aria-labelledby="studio-title" className="overflow-hidden bg-mist py-20 sm:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-14">
        <div>
          <SectionHeading id="studio-title" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />

          <div className="mt-8 space-y-6">
            <div>
              <p id="studio-tabs-label" className="text-xs font-bold uppercase tracking-[0.16em] text-navy">
                {s.tabsLabel}
              </p>
              <div role="tablist" aria-labelledby="studio-tabs-label" className="mt-3 inline-flex flex-wrap gap-1 rounded-full bg-white p-1.5 ring-1 ring-line">
                {TABS.map((id, i) => (
                  <button
                    key={id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`studio-tab-${id}`}
                    aria-selected={tab === id}
                    aria-controls="studio-panel"
                    tabIndex={tab === id ? 0 : -1}
                    onClick={() => setTab(id)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${tab === id ? "bg-navy text-white" : "text-navy hover:bg-mist"}`}
                  >
                    {s.tabs[id]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p id="studio-device-label" className="text-xs font-bold uppercase tracking-[0.16em] text-navy">
                {s.deviceLabel}
              </p>
              <div role="group" aria-labelledby="studio-device-label" className="mt-3 inline-flex gap-1 rounded-full bg-white p-1.5 ring-1 ring-line">
                {(["mobile", "desktop"] as Device[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={device === d}
                    onClick={() => setDevice(d)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${device === d ? "bg-lime text-navy" : "text-navy hover:bg-mist"}`}
                  >
                    {d === "mobile" ? <Smartphone className="h-4 w-4" aria-hidden="true" /> : <Monitor className="h-4 w-4" aria-hidden="true" />}
                    {d === "mobile" ? s.mobile : s.desktop}
                  </button>
                ))}
              </div>
            </div>

            <p className="flex gap-2 text-sm leading-relaxed text-muted">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {s.disclaimer}
            </p>
          </div>
        </div>

        <div id="studio-panel" role="tabpanel" aria-labelledby={`studio-tab-${tab}`} className="flex min-h-[36rem] items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {device === "mobile" ? (
              <motion.div
                key="mobile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[9/19] w-[min(19rem,80vw)] rounded-[2.8rem] bg-navy p-2.5 shadow-[0_50px_100px_-40px_rgba(15,22,43,0.7)]"
              >
                <div className="absolute left-1/2 top-4 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-navy" aria-hidden="true" />
                <div className="h-full overflow-hidden rounded-[2.3rem] bg-white pt-8">
                  <StudioContent tab={tab} device="mobile" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="desktop"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_50px_100px_-40px_rgba(15,22,43,0.6)] ring-1 ring-line"
              >
                <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-3" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <span className="ml-4 flex-1 truncate rounded-full bg-white px-4 py-1 text-xs text-muted">{s.profileName}</span>
                </div>
                <div className="h-[30rem] sm:h-[34rem]">
                  <StudioContent tab={tab} device="desktop" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
