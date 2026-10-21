"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Info, Plus } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { useLocale, useQuote } from "@/components/providers/SiteProviders";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, type Service } from "@/content/services";
import { tx } from "@/lib/i18n";

function ServiceDetail({ service, headingLevel = "h3" }: { service: Service; headingLevel?: "h3" | "h4" }) {
  const { locale, t } = useLocale();
  const { openQuote } = useQuote();
  const Heading = headingLevel;
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.05fr] md:gap-8">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-mist md:aspect-auto md:min-h-[30rem]">
        <Image src={service.image} alt={tx(service.imageAlt, locale)} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
        <div className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-lime text-navy shadow-lg">
          <Icon name={service.icon} className="h-6 w-6" />
        </div>
      </div>
      <div className="flex flex-col py-2">
        <Heading className="display-3 text-navy">{tx(service.title, locale)}</Heading>
        <p className="mt-4 text-lg leading-relaxed text-muted">{tx(service.description, locale)}</p>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-navy">{t.services.includes}</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {service.items.map((item) => (
            <li key={item.en} className="flex items-start gap-2 text-[0.95rem] text-navy">
              <Check className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-lime p-0.5 text-navy" aria-hidden="true" />
              {tx(item, locale)}
            </li>
          ))}
        </ul>
        {service.note && (
          <p className="mt-6 flex gap-2.5 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-navy">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {tx(service.note, locale)}
          </p>
        )}
        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={() => openQuote({ services: [service.id] })}
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 font-bold text-white transition hover:bg-navy-700"
          >
            {t.common.requestService}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const { locale, t } = useLocale();
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKey = (e: KeyboardEvent, i: number) => {
    const last = services.length - 1;
    const next = e.key === "ArrowDown" ? (i === last ? 0 : i + 1) : e.key === "ArrowUp" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="services" aria-labelledby="services-title" className="py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading id="services-title" eyebrow={t.services.eyebrow} title={t.services.title} intro={t.services.intro} />

        {/* Desktop: vertical tabs */}
        <div className="mt-14 hidden gap-10 lg:grid lg:grid-cols-[0.75fr_2fr]">
          <div role="tablist" aria-orientation="vertical" aria-label={t.services.eyebrow} className="flex flex-col">
            {services.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`service-tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls={`service-panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`group flex items-center gap-4 border-b border-line py-4 text-left transition ${selected ? "text-navy" : "text-navy/55 hover:text-navy"}`}
                >
                  <span className={`text-xs font-bold tabular-nums ${selected ? "text-navy" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-lg font-bold leading-tight tracking-tight">{tx(s.title, locale)}</span>
                  <span className={`h-2.5 w-2.5 rounded-full transition ${selected ? "bg-lime" : "bg-transparent group-hover:bg-line"}`} aria-hidden="true" />
                </button>
              );
            })}
          </div>
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={services[active].id}
                role="tabpanel"
                id={`service-panel-${services[active].id}`}
                aria-labelledby={`service-tab-${services[active].id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceDetail service={services[active]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile & tablet: accordion */}
        <ul className="mt-10 divide-y divide-line border-y border-line lg:hidden">
          {services.map((s, i) => {
            const open = openMobile === i;
            return (
              <li key={s.id}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`service-acc-${s.id}`}
                    onClick={() => setOpenMobile(open ? null : i)}
                    className="flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-mist text-navy">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-lg font-bold leading-tight text-navy">{tx(s.title, locale)}</span>
                      <span className="mt-1 block text-sm text-muted">{tx(s.short, locale)}</span>
                    </span>
                    <Plus className={`h-5 w-5 shrink-0 text-navy transition ${open ? "rotate-45" : ""}`} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`service-acc-${s.id}`} hidden={!open} className="pb-8">
                  {open && <ServiceDetail service={s} headingLevel="h4" />}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
