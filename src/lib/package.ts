import { builderGroups, builderOptions, type BuilderOption, type BuilderState } from "@/content/packages";
import type { ServiceId } from "@/content/services";
import { pricingConfig, type Billing } from "@/config/pricing";
import { tx, type Locale } from "@/lib/i18n";

const optionById = new Map(builderOptions.map((o) => [o.id, o]));

export function isSelected(option: BuilderOption, state: BuilderState): boolean {
  const value = state[option.id];
  if (option.kind === "quantity") return typeof value === "number" && value > 0;
  if (option.kind === "toggle") return value === true;
  if (typeof value !== "string" || !value) return false;
  if (option.dependsOn) {
    const parent = optionById.get(option.dependsOn);
    return parent ? isSelected(parent, state) : false;
  }
  return true;
}

export type SelectedLine = { id: string; label: string; detail?: string; group: string };

export function selectedLines(state: BuilderState, locale: Locale): SelectedLine[] {
  return builderOptions
    .filter((o) => isSelected(o, state))
    .map((o) => {
      const group = tx(builderGroups.find((g) => g.id === o.group)!.label, locale);
      const label = tx(o.label, locale);
      if (o.kind === "quantity") return { id: o.id, label, detail: String(state[o.id]), group };
      if (o.kind === "choice") {
        const choice = o.choices.find((c) => c.id === state[o.id]);
        return { id: o.id, label, detail: choice ? tx(choice.label, locale) : undefined, group };
      }
      return { id: o.id, label, group };
    });
}

export function servicesFromState(state: BuilderState): ServiceId[] {
  const set = new Set<ServiceId>();
  builderOptions.forEach((o) => isSelected(o, state) && set.add(o.service));
  return [...set];
}

/** Plain-text package summary used in the quote request. */
export function packageSummaryText(state: BuilderState, locale: Locale): string {
  return selectedLines(state, locale)
    .map((l) => `• ${l.group} — ${l.label}${l.detail ? `: ${l.detail}` : ""}`)
    .join("\n");
}

export type EstimateLine = { id: string; label: string; amount: number; billing: Billing };
export type Estimate = {
  enabled: boolean;
  lines: EstimateLine[];
  totals: Record<Billing, number>;
  /** Selected items without a configured price. */
  unpriced: string[];
};

/** Calculates an indicative estimate from src/config/pricing.ts. */
export function calculateEstimate(state: BuilderState, locale: Locale): Estimate {
  const lines: EstimateLine[] = [];
  const unpriced: string[] = [];
  for (const option of builderOptions) {
    if (!isSelected(option, state)) continue;
    const rule = pricingConfig.rules[option.id];
    const label = tx(option.label, locale);
    if (!rule) {
      unpriced.push(label);
      continue;
    }
    let amount: number | null = null;
    if ("amount" in rule) {
      if (rule.amount !== null) {
        amount = option.kind === "quantity" ? rule.amount * Number(state[option.id]) : rule.amount;
      }
    } else {
      const base = rule.perChoice[String(state[option.id])];
      if (base !== null && base !== undefined) {
        const multiplier = rule.multiplyBy ? Number(state[rule.multiplyBy] ?? 0) : 1;
        amount = base * multiplier;
      }
    }
    if (amount === null) unpriced.push(label);
    else if (amount > 0) lines.push({ id: option.id, label, amount, billing: rule.billing });
  }
  const totals: Record<Billing, number> = { oneOff: 0, monthly: 0 };
  lines.forEach((l) => (totals[l.billing] += l.amount));
  return { enabled: pricingConfig.mode === "estimate" && lines.length > 0, lines, totals, unpriced };
}

export const formatPrice = (amount: number, locale: Locale) =>
  new Intl.NumberFormat(pricingConfig.numberLocale[locale], {
    style: "currency",
    currency: pricingConfig.currency,
    maximumFractionDigits: 0,
  }).format(amount);
