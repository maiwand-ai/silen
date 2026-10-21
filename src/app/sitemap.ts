import type { MetadataRoute } from "next";
import { metadataBaseUrl } from "@/config/site";
import { routes, type RouteKey } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, metadataBaseUrl).toString();
  return (Object.keys(routes) as RouteKey[]).flatMap((key) =>
    (["en", "tr"] as const).map((locale) => ({
      url: url(routes[key][locale]),
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : key === "boutique" ? 0.9 : 0.3,
      alternates: { languages: { en: url(routes[key].en), tr: url(routes[key].tr) } },
    })),
  );
}
