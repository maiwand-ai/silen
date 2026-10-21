import type { Locale } from "@/lib/i18n";
import { en, type Dictionary } from "./en";
import { tr } from "./tr";

export const dictionaries: Record<Locale, Dictionary> = { en, tr };
export type { Dictionary };

/** Replaces {placeholders} in a string. */
export const fmt = (text: string, vars: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));

/** Picks the singular or plural form and fills in {count}. */
export const plural = (count: number, one: string, other: string) => fmt(count === 1 ? one : other, { count });
