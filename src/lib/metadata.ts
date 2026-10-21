import type { Metadata } from "next";
import { metadataBaseUrl, siteConfig } from "@/config/site";
import { dictionaries } from "@/i18n";
import { defaultLocale, routes, type Locale, type RouteKey } from "@/lib/i18n";

const pageText = {
  home: (l: Locale) => ({ title: dictionaries[l].meta.homeTitle, description: dictionaries[l].meta.homeDescription }),
  boutique: (l: Locale) => ({ title: dictionaries[l].meta.boutiqueTitle, description: dictionaries[l].meta.boutiqueDescription }),
  privacy: (l: Locale) => ({ title: dictionaries[l].meta.privacyTitle, description: dictionaries[l].meta.privacyDescription }),
};

/** Page metadata with canonical URL, language alternates and Open Graph tags. */
export function buildMetadata(locale: Locale, key: RouteKey): Metadata {
  const { title, description } = pageText[key](locale);
  return {
    metadataBase: new URL(metadataBaseUrl),
    title,
    description,
    alternates: {
      canonical: routes[key][locale],
      languages: { en: routes[key].en, tr: routes[key].tr, "x-default": routes[key][defaultLocale] },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.brand,
      title,
      description,
      url: routes[key][locale],
      locale: locale === "tr" ? "tr_TR" : "en_GB",
      alternateLocale: locale === "tr" ? "en_GB" : "tr_TR",
      images: [{ url: "/brand/og-image.png", width: 1200, height: 630, alt: siteConfig.brand }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/brand/og-image.png"] },
    robots: key === "privacy" ? { index: true, follow: true } : undefined,
  };
}
