"use client";

import Image from "next/image";
import { ArrowRight, Check, ChevronsLeftRight, Info } from "lucide-react";
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { useLocale, useQuote } from "@/components/providers/SiteProviders";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { beforeAfterExamples, type BeforeAfterExample } from "@/content/beforeAfter";
import { logo } from "@/config/media";
import { tx, type Locale } from "@/lib/i18n";

/** The "after" side: a campaign layout built from the same photo (or a supplied finished image). */
function AfterLayer({ example, locale, adCta }: { example: BeforeAfterExample; locale: Locale; adCta: string }) {
  if (example.after) {
    return <Image src={example.after} alt={tx(example.afterAlt, locale)} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />;
  }
  return (
    <div className="absolute inset-0 bg-navy" role="img" aria-label={tx(example.afterAlt, locale)}>
      <div className="absolute inset-4 overflow-hidden rounded-[1.2rem] sm:inset-6">
        <Image
          src={example.before}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="scale-110 object-cover [filter:contrast(1.12)_saturate(1.25)_brightness(1.03)]"
          style={{ objectPosition: example.focus }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-lime/25 via-transparent to-transparent mix-blend-soft-light" />
      </div>
      <div className="absolute left-8 top-8 rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-navy sm:left-10 sm:top-10">
        {tx(example.kicker, locale)}
      </div>
      <div className="absolute bottom-8 left-8 right-8 text-white sm:bottom-10 sm:left-10">
        <p className="font-serif text-5xl italic leading-[0.9] sm:text-7xl">{tx(example.headline, locale)}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-navy">
            {adCta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="relative h-8 w-8 overflow-hidden rounded-lg bg-white p-1">
            <Image src={logo.mark} alt="" width={32} height={32} className="h-full w-full object-contain" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function BeforeAfter({ initialExample = 0 }: { initialExample?: number }) {
  const { locale, t } = useLocale();
  const { openQuote } = useQuote();
  const [index, setIndex] = useState(initialExample);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const example = beforeAfterExamples[index];

  const moveTo = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    moveTo(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => dragging && moveTo(e.clientX);
  const endDrag = () => setDragging(false);

  const onKey = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5;
    const map: Record<string, number> = { ArrowLeft: pos - step, ArrowDown: pos - step, ArrowRight: pos + step, ArrowUp: pos + step, Home: 0, End: 100, PageDown: pos - 25, PageUp: pos + 25 };
    if (!(e.key in map)) return;
    e.preventDefault();
    setPos(Math.min(100, Math.max(0, map[e.key])));
  };

  return (
    <section id="transform" aria-labelledby="ba-title" className="bg-mist py-20 sm:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading id="ba-title" eyebrow={t.beforeAfter.eyebrow} title={t.beforeAfter.title} intro={t.beforeAfter.intro} />

          <div className="mt-8" role="group" aria-label={t.beforeAfter.examples}>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy">{t.beforeAfter.examples}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {beforeAfterExamples.map((ex, i) => (
                <button
                  key={ex.id}
                  type="button"
                  aria-pressed={i === index}
                  onClick={() => {
                    setIndex(i);
                    setPos(50);
                  }}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${i === index ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-line hover:ring-navy"}`}
                >
                  {tx(ex.label, locale)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy">{t.beforeAfter.whatChanged}</p>
            <ul className="mt-3 space-y-2">
              {example.changes.map((c) => (
                <li key={c.en} className="flex items-center gap-2.5 text-navy">
                  <Check className="h-5 w-5 shrink-0 rounded-full bg-lime p-1 text-navy" aria-hidden="true" />
                  {tx(c, locale)}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => openQuote({ services: ["visual", "creative"] })}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-4 font-bold text-white transition hover:bg-navy-700"
          >
            {t.beforeAfter.cta}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>

        <div>
          <div
            ref={frameRef}
            className={`relative aspect-[4/5] select-none overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_90px_-45px_rgba(15,22,43,0.6)] ${dragging ? "cursor-grabbing" : "cursor-ew-resize"}`}
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {/* After (full) */}
            <AfterLayer example={example} locale={locale} adCta={t.beforeAfter.adCta} />
            {/* Before (clipped) */}
            <div className="absolute inset-0 bg-white" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Image
                src={example.before}
                alt={tx(example.beforeAlt, locale)}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain"
                draggable={false}
              />
            </div>

            <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-navy shadow" style={{ opacity: pos > 12 ? 1 : 0 }}>
              {t.beforeAfter.before}
            </span>
            <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-lime px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-navy shadow" style={{ opacity: pos < 88 ? 1 : 0 }}>
              {t.beforeAfter.after}
            </span>

            {/* Handle */}
            <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(15,22,43,0.15)]" style={{ left: `${pos}%` }}>
              <div
                role="slider"
                tabIndex={0}
                aria-label={t.beforeAfter.handle}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                aria-valuetext={`${t.beforeAfter.before} ${Math.round(pos)}% · ${t.beforeAfter.after} ${100 - Math.round(pos)}%`}
                onKeyDown={onKey}
                className="pointer-events-auto absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-grab place-items-center rounded-full bg-lime text-navy shadow-xl ring-4 ring-white transition-transform hover:scale-105 focus-visible:scale-110"
              >
                <ChevronsLeftRight className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2" role="group" aria-label={t.beforeAfter.handle}>
            {[
              { label: t.beforeAfter.showBefore, v: 100 },
              { label: t.beforeAfter.showBoth, v: 50 },
              { label: t.beforeAfter.showAfter, v: 0 },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                aria-pressed={Math.round(pos) === b.v}
                onClick={() => setPos(b.v)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${Math.round(pos) === b.v ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-line hover:ring-navy"}`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {example.isDemonstration && (
            <p className="mt-4 flex gap-2 text-sm leading-relaxed text-muted">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {t.beforeAfter.demoNote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
