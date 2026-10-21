"use client";

import { Blocks, Bot, Handshake, Layers, MessageCircle, Palette, Sparkles, Store } from "lucide-react";
import { useLocale } from "@/components/providers/SiteProviders";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Sparkles, Bot, Layers, Store, Palette, Blocks, MessageCircle, Handshake];

export function WhyChoose() {
  const { t } = useLocale();
  return (
    <section id="why" aria-labelledby="why-title" className="grain relative overflow-hidden bg-navy py-20 text-white sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-lime/15 blur-[120px]" />
      <div className="container-site relative">
        <SectionHeading id="why-title" eyebrow={t.why.eyebrow} title={t.why.title} tone="dark" />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {t.why.items.map((item, i) => {
            const ItemIcon = icons[i % icons.length];
            return (
              <Reveal as="li" key={item.title} delay={(i % 4) * 0.06} className="group bg-navy p-7 transition hover:bg-navy-800 sm:p-8">
                <ItemIcon className="h-7 w-7 text-lime transition group-hover:scale-110" aria-hidden="true" />
                <h3 className="mt-6 text-xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-white/70">{item.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
