"use client";

import { useLocale } from "@/components/providers/SiteProviders";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappLink } from "@/config/site";

/** Floating WhatsApp button. Renders nothing until a WhatsApp number is configured. */
export function WhatsAppButton() {
  const { t } = useLocale();
  const link = whatsappLink(t.contact.whatsappMessage);
  if (!link) return null;
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.label}
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2 rounded-full bg-[#1f9d55] p-3.5 text-white shadow-[0_12px_30px_-10px_rgba(15,22,43,0.6)] transition hover:bg-[#178a49] sm:right-6 sm:pr-5"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden text-sm font-semibold sm:inline">{t.whatsapp.short}</span>
    </a>
  );
}
