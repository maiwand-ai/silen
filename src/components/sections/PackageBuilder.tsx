"use client";

import { ArrowRight, Info, Minus, Plus, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale, useQuote } from "@/components/providers/SiteProviders";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { builderGroups, builderOptions, packagePresets, type BuilderOption, type BuilderState } from "@/content/packages";
import { fmt, plural } from "@/i18n";
import { tx } from "@/lib/i18n";
import { calculateEstimate, formatPrice, isSelected, selectedLines, servicesFromState } from "@/lib/package";
import { readStorage, writeStorage } from "@/lib/storage";

const STORAGE_KEY = "sevil_package_v1";

const sameState = (a: BuilderState, b: BuilderState) => {
  const clean = (s: BuilderState) =>
    Object.fromEntries(Object.entries(s).filter(([, v]) => v !== false && v !== 0 && v !== "" && v !== undefined));
  const ca = clean(a);
  const cb = clean(b);
  return Object.keys(ca).length === Object.keys(cb).length && Object.entries(ca).every(([k, v]) => cb[k] === v);
};

function OptionControl({ option, state, setValue }: { option: BuilderOption; state: BuilderState; setValue: (id: string, v: BuilderState[string] | undefined) => void }) {
  const { locale, t } = useLocale();
  const label = tx(option.label, locale);
  const hint = option.hint ? tx(option.hint, locale) : null;
  const inputId = `opt-${option.id}`;

  if (option.kind === "toggle") {
    const on = state[option.id] === true;
    return (
      <div className="flex items-center justify-between gap-4 py-3">
        <div>
          <p id={`${inputId}-label`} className="font-semibold text-navy">{label}</p>
          {hint && <p className="text-sm text-muted">{hint}</p>}
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-labelledby={`${inputId}-label`}
          onClick={() => setValue(option.id, !on)}
          className={`relative h-8 w-14 shrink-0 rounded-full transition ${on ? "bg-navy" : "bg-line"}`}
        >
          <span className={`absolute top-1 h-6 w-6 rounded-full shadow transition-all ${on ? "left-7 bg-lime" : "left-1 bg-white"}`} />
        </button>
      </div>
    );
  }

  if (option.kind === "quantity") {
    const value = Number(state[option.id] ?? 0);
    const step = option.step ?? 1;
    const clamp = (n: number) => Math.min(option.max, Math.max(0, Math.round(n)));
    return (
      <div className="flex items-center justify-between gap-4 py-3">
        <div>
          <label htmlFor={inputId} className="font-semibold text-navy">{label}</label>
          {hint && <p className="text-sm text-muted">{hint}</p>}
        </div>
        <div className="flex shrink-0 items-center rounded-full bg-mist p-1 ring-1 ring-line">
          <button
            type="button"
            onClick={() => setValue(option.id, clamp(value - step))}
            disabled={value <= 0}
            aria-label={fmt(t.builder.decrease, { item: label })}
            className="grid h-9 w-9 place-items-center rounded-full text-navy transition hover:bg-white disabled:opacity-30"
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <input
            id={inputId}
            type="number"
            inputMode="numeric"
            min={0}
            max={option.max}
            step={step}
            value={value}
            onChange={(e) => setValue(option.id, clamp(Number(e.target.value) || 0))}
            className="w-12 bg-transparent text-center font-bold tabular-nums text-navy [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => setValue(option.id, clamp(value + step))}
            disabled={value >= option.max}
            aria-label={fmt(t.builder.increase, { item: label })}
            className="grid h-9 w-9 place-items-center rounded-full bg-navy text-white transition hover:bg-navy-700 disabled:opacity-30"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  // choice
  if (option.dependsOn) {
    const parent = builderOptions.find((o) => o.id === option.dependsOn);
    if (!parent || !isSelected(parent, state)) return null;
  }
  return (
    <fieldset className="py-3">
      <legend className="font-semibold text-navy">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {option.choices.map((c) => (
          <label key={c.id} className="cursor-pointer">
            <input
              type="radio"
              name={inputId}
              value={c.id}
              checked={state[option.id] === c.id}
              onChange={() => setValue(option.id, c.id)}
              className="peer sr-only"
            />
            <span className="inline-flex rounded-full border border-line bg-white px-3.5 py-2 text-sm font-medium text-navy transition peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-lime peer-focus-visible:ring-offset-2 hover:border-navy/50">
              {tx(c.label, locale)}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function PackageBuilder() {
  const { locale, t } = useLocale();
  const { openQuote } = useQuote();
  const b = t.builder;
  const [state, setState] = useState<BuilderState>({});
  const [announcement, setAnnouncement] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = readStorage<BuilderState>(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from browser storage
    if (saved) setState(saved);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeStorage(STORAGE_KEY, state);
  }, [state, loaded]);

  const setValue = (id: string, v: BuilderState[string] | undefined) =>
    setState((s) => {
      const next = { ...s };
      if (v === undefined || v === false || v === 0) delete next[id];
      else next[id] = v;
      return next;
    });

  const lines = selectedLines(state, locale);
  const estimate = calculateEstimate(state, locale);
  const platformCount = ["instagram", "tiktok", "facebook"].filter((p) => state[p] === true).length;
  const activePreset = packagePresets.find((p) => p.id !== "custom" && sameState(p.state, state));

  const applyPreset = (id: string) => {
    const preset = packagePresets.find((p) => p.id === id)!;
    setState({ ...preset.state });
    setAnnouncement(fmt(b.presetApplied, { name: tx(preset.name, locale) }));
  };

  const removeLine = (id: string) => {
    setValue(id, undefined);
    // Removing a quantity also clears the choices that depend on it.
    builderOptions.filter((o) => o.kind === "choice" && o.dependsOn === id).forEach((o) => setValue(o.id, undefined));
  };

  return (
    <section id="packages" aria-labelledby="packages-title" className="py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading id="packages-title" eyebrow={b.eyebrow} title={b.title} intro={b.intro} />

        {/* Presets */}
        <div className="mt-12">
          <p id="preset-label" className="text-xs font-bold uppercase tracking-[0.16em] text-navy">{b.presets}</p>
          <ul role="list" aria-labelledby="preset-label" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {packagePresets.map((p, i) => {
              const active = activePreset?.id === p.id || (p.id === "custom" && !activePreset && lines.length > 0);
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => applyPreset(p.id)}
                    className={`group flex h-full w-full flex-col rounded-[1.4rem] p-5 text-left transition ${active ? "bg-navy text-white" : "bg-mist text-navy hover:bg-line/70"}`}
                  >
                    <span className={`text-xs font-bold tabular-nums ${active ? "text-lime" : "text-muted"}`}>0{i + 1}</span>
                    <span className="mt-2 text-lg font-extrabold tracking-tight">{tx(p.name, locale)}</span>
                    <span className={`mt-1.5 text-sm leading-relaxed ${active ? "text-white/75" : "text-muted"}`}>{tx(p.description, locale)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="sr-only" aria-live="polite">{announcement}</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          {/* Options */}
          <div className="grid gap-5 md:grid-cols-2">
            {builderGroups.map((g) => (
              <div key={g.id} role="group" aria-labelledby={`group-${g.id}`} className="rounded-[1.6rem] border border-line p-5 sm:p-6">
                <h3 id={`group-${g.id}`} className="text-lg font-extrabold tracking-tight text-navy">{tx(g.label, locale)}</h3>
                <p className="mt-1 text-sm text-muted">{tx(g.description, locale)}</p>
                {g.id === "social" && (
                  <p className="mt-2 inline-block rounded-full bg-lime/30 px-2.5 py-0.5 text-xs font-bold text-navy" aria-live="polite">
                    {plural(platformCount, b.platformsOne, b.platforms)}
                  </p>
                )}
                <div className="mt-2 divide-y divide-line">
                  {builderOptions
                    .filter((o) => o.group === g.id)
                    .map((o) => (
                      <OptionControl key={o.id} option={o} state={state} setValue={setValue} />
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside aria-labelledby="summary-title" className="rounded-[2rem] bg-navy p-6 text-white shadow-[0_40px_80px_-40px_rgba(15,22,43,0.8)] sm:p-8 lg:sticky lg:top-28">
            <div className="flex items-center justify-between gap-3">
              <h3 id="summary-title" className="text-2xl font-extrabold tracking-tight">{b.summary}</h3>
              {lines.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setState({});
                    setAnnouncement(b.resetDone);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" /> {b.reset}
                </button>
              )}
            </div>
            <p className="mt-1 text-sm text-white/60" aria-live="polite">{plural(lines.length, b.selectedOne, b.selectedCount)}</p>

            {lines.length === 0 ? (
              <p className="mt-6 rounded-2xl bg-white/5 p-5 text-sm leading-relaxed text-white/70">{b.summaryEmpty}</p>
            ) : (
              <ul className="mt-5 max-h-[22rem] divide-y divide-white/10 overflow-y-auto pr-1">
                {lines.map((l) => (
                  <li key={l.id} className="flex items-start justify-between gap-3 py-3">
                    <div>
                      <p className="text-[0.7rem] font-bold uppercase tracking-wider text-lime">{l.group}</p>
                      <p className="font-semibold">{l.label}</p>
                      {l.detail && <p className="text-sm text-white/65">{l.detail}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(l.id)}
                      aria-label={fmt(b.remove, { item: l.label })}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Estimate (only when prices are configured) */}
            {estimate.enabled ? (
              <div className="mt-5 rounded-2xl bg-white/5 p-5">
                <p className="text-sm font-bold">{b.estimateTitle}</p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {estimate.lines.map((l) => (
                    <li key={l.id} className="flex justify-between gap-3 text-white/75">
                      <span>{l.label}</span>
                      <span className="tabular-nums">{formatPrice(l.amount, locale)}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-4 space-y-1 border-t border-white/10 pt-3">
                  {estimate.totals.oneOff > 0 && (
                    <div className="flex justify-between font-bold"><dt>{b.oneOff}</dt><dd className="tabular-nums">{formatPrice(estimate.totals.oneOff, locale)}</dd></div>
                  )}
                  {estimate.totals.monthly > 0 && (
                    <div className="flex justify-between font-bold"><dt>{b.monthly}</dt><dd className="tabular-nums">{formatPrice(estimate.totals.monthly, locale)}</dd></div>
                  )}
                </dl>
                {estimate.unpriced.length > 0 && <p className="mt-3 text-xs text-white/60">{b.estimatePartial}</p>}
                <p className="mt-3 text-xs text-white/60">{b.included} {b.excluded}</p>
                <p className="mt-2 text-xs font-semibold text-lime">{b.estimateNote}</p>
              </div>
            ) : (
              <p className="mt-5 flex gap-2 text-sm leading-relaxed text-white/70">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
                {b.quoteMode}
              </p>
            )}
            {lines.some((l) => builderOptions.find((o) => o.id === l.id)?.group === "ads") && (
              <p className="mt-3 text-xs text-white/60">{b.adSpendNote}</p>
            )}

            <button
              type="button"
              onClick={() => openQuote({ services: servicesFromState(state), packageState: lines.length ? state : undefined })}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-4 font-bold text-navy transition hover:bg-lime-300"
            >
              {b.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
