export const locales = ["en", "tr"] as const;
export type Locale = (typeof locales)[number];

/** A piece of text in both website languages. */
export type L = { en: string; tr: string };

export const tx = (value: L, locale: Locale) => value[locale];

/** Cookie used to remember the visitor's language choice. */
export const LANG_COOKIE = "sevil_lang";

/**
 * Localized URLs. Every page exists once per language.
 * Turkish is the default language and lives at the root;
 * English pages live under /en.
 */
export const defaultLocale: Locale = "tr";

export const routes = {
  home: { en: "/en", tr: "/" },
  boutique: { en: "/en/fashion-advertising", tr: "/butik-reklamlari" },
  privacy: { en: "/en/privacy", tr: "/gizlilik" },
} as const;

export type RouteKey = keyof typeof routes;

export const href = (key: RouteKey, locale: Locale, hash?: string) =>
  routes[key][locale] + (hash ? `#${hash}` : "");

/** Finds the route key that matches a pathname, e.g. "/gizlilik" → "privacy". */
export function routeKeyFromPath(pathname: string): RouteKey {
  const clean = pathname.replace(/\/$/, "") || "/";
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key].en === clean || routes[key].tr === clean) return key;
  }
  return "home";
}
