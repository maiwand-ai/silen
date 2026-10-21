"use client";

import { useEffect, useRef } from "react";
import { INLINE_QUOTE_ID, useLocale, useQuote } from "@/components/providers/SiteProviders";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { QuotePrefill } from "@/lib/quote";
import { QuoteWizard } from "./QuoteWizard";

/** Quote wizard embedded in a page. Other "Get a quote" buttons on the page scroll here. */
export function InlineQuote({ title, text, prefill }: { title: string; text: string; prefill?: QuotePrefill }) {
  const { t } = useLocale();
  const { draft, update, hydrated } = useQuote();
  const applied = useRef(false);

  // Once any saved draft is restored, preselect the page's industry/services if none are chosen yet.
  useEffect(() => {
    if (!hydrated || applied.current || !prefill) return;
    applied.current = true;
    const patch: Partial<typeof draft> = {};
    if (prefill.industry && !draft.industry) patch.industry = prefill.industry;
    if (prefill.services?.length && draft.services.length === 0) patch.services = prefill.services;
    if (Object.keys(patch).length) update(patch);
  }, [hydrated, prefill, draft, update]);

  return (
    <section id={INLINE_QUOTE_ID} aria-labelledby="inline-quote-title" className="scroll-mt-24 bg-mist py-20 sm:py-28">
      <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="inline-quote-title" eyebrow={t.wizard.eyebrow} title={title} intro={text} />
        </div>
        <div className="rounded-[2rem] bg-white p-5 shadow-[0_30px_80px_-40px_rgba(15,22,43,0.35)] sm:p-10">
          <QuoteWizard variant="inline" />
        </div>
      </div>
    </section>
  );
}
