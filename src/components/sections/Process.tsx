"use client";

import { Compass, PenTool, Rocket, TrendingUp } from "lucide-react";
import { useLocale } from "@/components/providers/SiteProviders";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Compass, PenTool, Rocket, TrendingUp];

export function Process({ steps, title, eyebrow, id = "process" }: { steps?: { title: string; text: string }[]; title?: string; eyebrow?: string; id?: string }) {
  const { t } = useLocale();
  const list = steps ?? t.process.steps;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow ?? t.process.eyebrow} title={title ?? t.process.title} />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden="true" className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-lime via-navy/20 to-transparent lg:block" />
          {list.map((step, i) => {
            const StepIcon = icons[i % icons.length];
            return (
              <Reveal as="li" key={step.title} delay={i * 0.1} className="relative">
                <div className="flex items-center gap-4">
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-navy text-lime shadow-lg">
                    <StepIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="bg-white pr-3 font-serif text-5xl italic text-navy/15" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-navy">
                  <span className="sr-only">{i + 1}. </span>
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
