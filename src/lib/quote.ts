import type { Dictionary } from "@/i18n";
import { tx, type Locale } from "@/lib/i18n";
import { services } from "@/content/services";
import { wizardIndustries } from "@/content/industries";
import type { BuilderState } from "@/content/packages";
import { packageSummaryText } from "@/lib/package";

export type ContactMethod = "" | "email" | "whatsapp" | "phone";

export type QuoteDraft = {
  services: string[];
  businessName: string;
  industry: string;
  website: string;
  country: string;
  preferredLanguage: Locale;
  description: string;
  timeline: string;
  budget: string;
  fullName: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;
  consent: boolean;
  /** Package builder selection carried into the request. */
  packageState: BuilderState | null;
};

export type QuotePrefill = {
  services?: string[];
  industry?: string;
  packageState?: BuilderState;
};

export const emptyDraft = (locale: Locale): QuoteDraft => ({
  services: [],
  businessName: "",
  industry: "",
  website: "",
  country: "",
  preferredLanguage: locale,
  description: "",
  timeline: "",
  budget: "",
  fullName: "",
  email: "",
  phone: "",
  contactMethod: "",
  consent: false,
  packageState: null,
});

export const QUOTE_STEPS = 5;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

export type FieldErrors = Partial<Record<keyof QuoteDraft, string>>;

export function validateStep(step: number, d: QuoteDraft, t: Dictionary): FieldErrors {
  const e: FieldErrors = {};
  const errors = t.wizard.errors;
  if (step === 0 && d.services.length === 0) e.services = errors.services;
  if (step === 1) {
    if (!d.businessName.trim()) e.businessName = errors.businessName;
    if (!d.industry) e.industry = errors.industry;
  }
  if (step === 2 && d.description.trim().length < 10) e.description = errors.description;
  if (step === 3) {
    if (!d.fullName.trim()) e.fullName = errors.fullName;
    if (!d.contactMethod) e.contactMethod = errors.contactMethod;
    const email = d.email.trim();
    const phone = d.phone.trim();
    if (email && !EMAIL_RE.test(email)) e.email = errors.email;
    else if (!email && d.contactMethod === "email") e.email = errors.emailRequired;
    if (phone && (!PHONE_RE.test(phone) || phone.replace(/\D/g, "").length < 7)) e.phone = errors.phone;
    else if (!phone && (d.contactMethod === "whatsapp" || d.contactMethod === "phone")) e.phone = errors.phoneRequired;
    if (!email && !phone && !e.email && !e.phone) e.email = errors.email;
  }
  if (step === 4 && !d.consent) e.consent = errors.consent;
  return e;
}

/** Validates every step and returns the first step with errors, or -1. */
export function firstInvalidStep(d: QuoteDraft, t: Dictionary): number {
  for (let s = 0; s < QUOTE_STEPS - 1; s++) {
    if (Object.keys(validateStep(s, d, t)).length) return s;
  }
  return -1;
}

export function serviceNames(ids: string[], locale: Locale) {
  return ids
    .map((id) => services.find((s) => s.id === id))
    .filter(Boolean)
    .map((s) => tx(s!.title, locale));
}

/** `step` is the wizard step where the value can be edited. */
export type SummaryRow = { label: string; value: string; step: number };

export function summaryRows(d: QuoteDraft, locale: Locale, t: Dictionary): SummaryRow[] {
  const L = t.wizard.summaryLabels;
  const w = t.wizard;
  const none = w.notProvided;
  const industry = wizardIndustries.find((i) => i.id === d.industry);
  const rows: SummaryRow[] = [
    { label: L.services, value: serviceNames(d.services, locale).join(", ") || none, step: 0 },
  ];
  if (d.packageState) {
    const text = packageSummaryText(d.packageState, locale);
    if (text) rows.push({ label: L.package, value: text, step: 0 });
  }
  rows.push(
    { label: L.business, value: d.businessName || none, step: 1 },
    { label: L.industry, value: industry ? tx(industry.label, locale) : none, step: 1 },
    { label: L.website, value: d.website || none, step: 1 },
    { label: L.country, value: d.country || none, step: 1 },
    { label: L.language, value: w.languages[d.preferredLanguage], step: 1 },
    { label: L.description, value: d.description || none, step: 2 },
    { label: L.timeline, value: d.timeline ? w.timelines[d.timeline as keyof typeof w.timelines] : none, step: 2 },
    { label: L.budget, value: d.budget ? w.budgets[d.budget as keyof typeof w.budgets] : none, step: 2 },
    { label: L.name, value: d.fullName || none, step: 3 },
    { label: L.email, value: d.email || none, step: 3 },
    { label: L.phone, value: d.phone || none, step: 3 },
    { label: L.method, value: d.contactMethod ? w.methods[d.contactMethod] : none, step: 3 },
  );
  return rows;
}

export function summaryText(d: QuoteDraft, locale: Locale, t: Dictionary): string {
  const rows = summaryRows(d, locale, t);
  return [
    t.wizard.summaryTitle,
    "",
    ...rows.map((r) => (r.value.includes("\n") ? `${r.label}:\n${r.value}` : `${r.label}: ${r.value}`)),
  ].join("\n");
}

/** Merges a prefill into an existing draft without discarding typed answers. */
export function applyPrefill(d: QuoteDraft, p: QuotePrefill): QuoteDraft {
  return {
    ...d,
    services: p.services ? [...new Set([...d.services, ...p.services])] : d.services,
    industry: p.industry ?? d.industry,
    packageState: p.packageState ?? d.packageState,
  };
}
