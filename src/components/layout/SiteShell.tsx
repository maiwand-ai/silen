import type { ReactNode } from "react";
import { SiteProviders } from "@/components/providers/SiteProviders";
import { QuoteModal } from "@/components/quote/QuoteModal";
import { dictionaries } from "@/i18n";
import { instrumentSerif, manrope } from "@/lib/fonts";
import type { Locale } from "@/lib/i18n";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WhatsAppButton } from "./WhatsAppButton";

/** Shared root document for both languages. */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = dictionaries[locale];
  return (
    <html lang={locale} className={`${manrope.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-dvh bg-white">
        <SiteProviders locale={locale}>
          <a
            href="#main"
            className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-navy px-5 py-3 font-semibold text-white transition focus:translate-y-0"
          >
            {t.common.skipToContent}
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <QuoteModal />
        </SiteProviders>
      </body>
    </html>
  );
}
