"use client";

import Image from "next/image";
import { AlertTriangle, Loader2, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/providers/SiteProviders";
import type { VideoSource } from "@/content/portfolio";
import { Modal } from "./Modal";

export type MediaItem = {
  title: string;
  description?: string;
  badge?: string;
  meta?: string;
  image: string;
  imageAlt: string;
  video?: VideoSource;
  orientation?: "portrait" | "landscape";
};

function embedUrl(source: VideoSource) {
  if (source.type === "youtube") return `https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0`;
  if (source.type === "vimeo") return `https://player.vimeo.com/video/${source.id}?autoplay=1`;
  return null;
}

/** Video player with loading and error states. The video only loads when the dialog opens. */
function VideoPlayer({ item }: { item: MediaItem }) {
  const { t } = useLocale();
  const ref = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const source = item.video!;
  const portrait = item.orientation === "portrait";

  // Stop playback and release the network connection when the dialog closes.
  useEffect(() => {
    const video = ref.current;
    return () => {
      if (!video) return;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [attempt]);

  const frame = portrait ? "mx-auto aspect-[9/16] max-h-[70dvh]" : "aspect-video w-full";

  if (source.type !== "file") {
    return (
      <div className={`${frame} overflow-hidden rounded-2xl bg-black`}>
        <iframe
          src={embedUrl(source)!}
          title={item.title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className={`${frame} relative overflow-hidden rounded-2xl bg-black`}>
      <video
        key={attempt}
        ref={ref}
        src={source.src}
        poster={item.image}
        controls
        autoPlay
        playsInline
        preload="metadata"
        onLoadedData={() => setState("ready")}
        onCanPlay={() => setState("ready")}
        onWaiting={() => setState((s) => (s === "error" ? s : "loading"))}
        onPlaying={() => setState("ready")}
        onError={() => setState("error")}
        className="h-full w-full object-contain"
      >
        {item.title}
      </video>
      {state === "loading" && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/30" role="status">
          <span className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm text-white">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> {t.portfolio.loading}
          </span>
        </div>
      )}
      {state === "error" && (
        <div className="absolute inset-0 grid place-items-center bg-navy/90 p-6 text-center text-white" role="alert">
          <div>
            <AlertTriangle className="mx-auto h-8 w-8 text-lime" aria-hidden="true" />
            <p className="mt-3">{t.portfolio.error}</p>
            <button
              type="button"
              onClick={() => {
                setState("loading");
                setAttempt((a) => a + 1);
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-navy"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> {t.portfolio.retry}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function MediaModal({ item, onClose }: { item: MediaItem | null; onClose: () => void }) {
  const { t } = useLocale();
  return (
    <Modal open={!!item} onClose={onClose} label={item?.title ?? t.portfolio.dialogLabel} closeLabel={t.common.close} dark>
      {item && (
        <div className="p-4 pt-16 sm:p-8 sm:pt-16">
          {item.video ? (
            <VideoPlayer item={item} />
          ) : (
            <figure>
              <div className={`relative mx-auto overflow-hidden rounded-2xl bg-navy-800 ${item.orientation === "landscape" ? "aspect-video" : "aspect-[4/5] max-h-[70dvh]"}`}>
                <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1024px) 60vw, 95vw" className="object-contain" />
              </div>
              <figcaption className="mt-3 text-center text-sm text-white/60">{t.portfolio.noVideo}</figcaption>
            </figure>
          )}
          <div className="mx-auto mt-6 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              {item.badge && <span className="rounded-full bg-lime px-3 py-1 text-xs font-bold text-navy">{item.badge}</span>}
              {item.meta && <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">{item.meta}</span>}
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">{item.title}</h2>
            {item.description && <p className="mt-2 leading-relaxed text-white/70">{item.description}</p>}
          </div>
        </div>
      )}
    </Modal>
  );
}
