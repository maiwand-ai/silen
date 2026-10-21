"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dictionaries, type Dictionary } from "@/i18n";
import type { Locale } from "@/lib/i18n";
import { applyPrefill, emptyDraft, type QuoteDraft, type QuotePrefill } from "@/lib/quote";
import { readStorage, removeStorage, writeStorage } from "@/lib/storage";

/* ───────────── Locale ───────────── */

const LocaleContext = createContext<{ locale: Locale; t: Dictionary } | null>(null);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside SiteProviders");
  return ctx;
}

/* ───────────── Quote request ───────────── */

const QUOTE_KEY = "sevil_quote_v1";
export const INLINE_QUOTE_ID = "quote-form";

type QuoteContextValue = {
  draft: QuoteDraft;
  update: (patch: Partial<QuoteDraft>) => void;
  step: number;
  setStep: (step: number) => void;
  isOpen: boolean;
  openQuote: (prefill?: QuotePrefill) => void;
  closeQuote: () => void;
  reset: () => void;
  prefilled: boolean;
  /** True once any saved draft has been restored from the browser. */
  hydrated: boolean;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside SiteProviders");
  return ctx;
}

function QuoteProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [draft, setDraft] = useState<QuoteDraft>(() => emptyDraft(locale));
  const [step, setStep] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore an unfinished request saved in this browser.
  useEffect(() => {
    const saved = readStorage<{ draft: QuoteDraft; step: number }>(QUOTE_KEY);
    /* eslint-disable react-hooks/set-state-in-effect -- one-time sync from browser storage */
    if (saved?.draft) {
      setDraft({ ...emptyDraft(locale), ...saved.draft });
      setStep(Math.min(Math.max(saved.step ?? 0, 0), 4));
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [locale]);

  useEffect(() => {
    if (hydrated) writeStorage(QUOTE_KEY, { draft, step });
  }, [draft, step, hydrated]);

  const update = useCallback((patch: Partial<QuoteDraft>) => setDraft((d) => ({ ...d, ...patch })), []);

  const openQuote = useCallback((prefill?: QuotePrefill) => {
    if (prefill) {
      setDraft((d) => applyPrefill(d, prefill));
      setStep(0);
      setPrefilled(true);
    }
    const inline = document.getElementById(INLINE_QUOTE_ID);
    if (inline) {
      inline.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => inline.querySelector<HTMLElement>("[data-step-heading]")?.focus({ preventScroll: true }), 400);
    } else {
      setOpen(true);
    }
  }, []);

  const reset = useCallback(() => {
    setDraft(emptyDraft(locale));
    setStep(0);
    setPrefilled(false);
    removeStorage(QUOTE_KEY);
  }, [locale]);

  const value = useMemo(
    () => ({ draft, update, step, setStep, isOpen, openQuote, closeQuote: () => setOpen(false), reset, prefilled, hydrated }),
    [draft, update, step, isOpen, openQuote, reset, prefilled, hydrated],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

/* ───────────── Root ───────────── */

export function SiteProviders({ locale, children }: { locale: Locale; children: ReactNode }) {
  const localeValue = useMemo(() => ({ locale, t: dictionaries[locale] }), [locale]);
  return (
    <LocaleContext.Provider value={localeValue}>
      <MotionConfig reducedMotion="user">
        <QuoteProvider locale={locale}>{children}</QuoteProvider>
      </MotionConfig>
    </LocaleContext.Provider>
  );
}
