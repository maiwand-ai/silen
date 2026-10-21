"use client";

import { AlertTriangle } from "lucide-react";
import { useLocale } from "@/components/providers/SiteProviders";

const sectionIds = ["who", "data", "use", "third-parties", "cookies", "retention", "rights", "changes"];

export function PrivacyPage() {
  const { t } = useLocale();
  const p = t.privacy;
  return (
    <article className="container-site max-w-3xl py-16 sm:py-24">
      <p className="eyebrow text-navy">Sevil</p>
      <h1 className="display-2 mt-4 text-navy">{p.title}</h1>
      <p className="mt-3 text-sm text-muted">{p.updated}</p>
      <div role="note" className="mt-8 flex gap-3 rounded-2xl border-2 border-dashed border-navy/30 bg-lime-100 p-5 text-navy">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <p className="text-sm font-semibold leading-relaxed">{p.reviewNotice}</p>
      </div>
      <div className="mt-12 space-y-10">
        {p.sections.map((s, i) => (
          <section key={s.title} id={sectionIds[i]} aria-labelledby={`privacy-${i}`}>
            <h2 id={`privacy-${i}`} className="text-2xl font-extrabold tracking-tight text-navy">
              {s.title}
            </h2>
            {s.body.map((para) => (
              <p key={para} className="mt-3 leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
