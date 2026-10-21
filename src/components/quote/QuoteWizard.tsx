"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Copy, Download, Mail, Package, RotateCcw, Send, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { useLocale, useQuote } from "@/components/providers/SiteProviders";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Icon } from "@/components/ui/Icon";
import { Rich } from "@/components/ui/Rich";
import { contactAvailability, emailLink, siteConfig, whatsappLink } from "@/config/site";
import { wizardIndustries } from "@/content/industries";
import { services } from "@/content/services";
import { fmt } from "@/i18n";
import { href, tx } from "@/lib/i18n";
import { packageSummaryText } from "@/lib/package";
import {
  firstInvalidStep,
  QUOTE_STEPS,
  summaryRows,
  summaryText,
  validateStep,
  type FieldErrors,
  type QuoteDraft,
} from "@/lib/quote";

type Status = "idle" | "sending" | "sent" | "error" | "handoff" | "complete";

/* ───────────── Small field helpers ───────────── */

function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-navy">
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted">({optional})</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-error">
          <X className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

function ChoiceChips<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  optional,
}: {
  name: string;
  legend: string;
  options: { id: T; label: string; icon?: ReactNode }[];
  value: string;
  onChange: (v: T) => void;
  error?: string;
  optional?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="text-sm font-semibold text-navy">
        {legend}
        {optional && <span className="ml-1.5 font-normal text-muted">({optional})</span>}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.id} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.id}
              checked={value === o.id}
              onChange={() => onChange(o.id)}
              className="peer sr-only"
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-navy transition peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-lime peer-focus-visible:ring-offset-2 hover:border-navy/50">
              {o.icon}
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-error">
          <X className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </fieldset>
  );
}

/* ───────────── Wizard ───────────── */

export function QuoteWizard({ variant = "modal" }: { variant?: "modal" | "inline" }) {
  const { locale, t } = useLocale();
  const { draft, update, step, setStep, reset, prefilled } = useQuote();
  const w = t.wizard;
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;

  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [channel, setChannel] = useState("");
  const [copied, setCopied] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Move focus to the step heading whenever the step changes (not on first render).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: false });
  }, [step]);

  const set = <K extends keyof QuoteDraft>(key: K, value: QuoteDraft[K]) => {
    update({ [key]: value } as Partial<QuoteDraft>);
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const goNext = () => {
    const e = validateStep(step, draft, t);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStep(Math.min(step + 1, QUOTE_STEPS - 1));
  };

  const goBack = () => {
    setErrors({});
    setStep(Math.max(step - 1, 0));
  };

  const goTo = (s: number) => {
    setErrors({});
    setStatus("idle");
    setStep(s);
  };

  /** Checks every step + consent before a send action. Returns true when ready. */
  const ready = () => {
    const invalid = firstInvalidStep(draft, t);
    if (invalid >= 0) {
      setStep(invalid);
      setErrors(validateStep(invalid, draft, t));
      return false;
    }
    const e = validateStep(4, draft, t);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const summary = summaryText(draft, locale, t);
  const subject = `${w.summaryTitle} — ${draft.businessName || draft.fullName}`;
  const wa = whatsappLink(summary);
  const mail = emailLink(subject, summary);
  const hasOnlineOption = contactAvailability.form || !!wa || !!mail;

  const sendForm = async () => {
    if (!ready()) return;
    setStatus("sending");
    try {
      const res = await fetch(siteConfig.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: subject,
          summary,
          ...draft,
          packageSummary: draft.packageState ? packageSummaryText(draft.packageState, locale) : "",
          packageState: undefined,
          siteLanguage: locale,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const handoff = (name: string) => (e: MouseEvent) => {
    if (!ready()) {
      e.preventDefault();
      return;
    }
    setChannel(name);
    setStatus("handoff");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const download = () => {
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sevil-quote-request.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof QuoteDraft, string][];

  /* ───── Finished states ───── */
  if (status === "sent" || status === "complete") {
    return (
      <div className="flex flex-col items-center px-6 py-16 text-center sm:px-12" role="status">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-lime text-navy">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="mt-6 max-w-md text-xl font-semibold text-navy">{status === "sent" ? w.send.sent : w.send.complete}</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-8 rounded-full bg-navy px-6 py-3 font-semibold text-white hover:bg-navy-700">
          {w.send.newRequest}
        </button>
      </div>
    );
  }

  const stepTitles = [w.servicesTitle, w.businessTitle, w.projectTitle, w.contactTitle, w.reviewTitle];

  return (
    <div className={variant === "modal" ? "p-5 pt-16 sm:p-10" : ""}>
      {variant === "modal" && (
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow text-navy">{w.eyebrow}</p>
          <h2 className="display-3 mt-3 text-navy">
            <Rich text={w.title} />
          </h2>
          <p className="mt-3 text-muted">{w.intro}</p>
        </div>
      )}

      {/* Progress */}
      <nav aria-label={w.progress}>
        <ol className="grid grid-cols-5 gap-1.5 sm:gap-3">
          {w.steps.map((label, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => done && goTo(i)}
                  disabled={!done}
                  aria-current={current ? "step" : undefined}
                  className="group w-full text-left disabled:cursor-default"
                >
                  <span className={`block h-1.5 rounded-full transition-colors ${done ? "bg-navy" : current ? "bg-lime" : "bg-line"}`} />
                  <span className={`mt-2 hidden items-center gap-1.5 text-xs font-semibold sm:flex ${current ? "text-navy" : done ? "text-navy/70 group-hover:text-navy" : "text-muted"}`}>
                    {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <span className="tabular-nums">{i + 1}.</span>}
                    {label}
                  </span>
                  <span className="sr-only">
                    {fmt(w.stepOf, { n: i + 1, total: QUOTE_STEPS })}: {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-2">
        <h3 ref={headingRef} tabIndex={-1} data-step-heading className="text-2xl font-bold tracking-tight text-navy outline-none sm:text-3xl">
          {stepTitles[step]}
        </h3>
        <p className="text-sm font-medium text-muted" aria-live="polite">
          {fmt(w.stepOf, { n: step + 1, total: QUOTE_STEPS })}
        </p>
      </div>

      {prefilled && step === 0 && (
        <p className="mt-4 rounded-2xl bg-lime/25 px-4 py-3 text-sm text-navy">{w.prefilledFrom}</p>
      )}

      {errorList.length > 1 && (
        <div role="alert" className="mt-5 rounded-2xl border border-error/30 bg-error/5 p-4 text-sm text-error">
          <p className="font-semibold">{w.errors.summary}</p>
          <ul className="mt-1 list-disc pl-5">
            {errorList.map(([k, msg]) => (
              <li key={k}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.22 }}
          className="mt-6"
        >
          {/* STEP 1 — services */}
          {step === 0 && (
            <fieldset aria-describedby={errors.services ? fid("services-error") : undefined}>
              <legend className="text-muted">{w.servicesHint}</legend>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {services.map((s) => {
                  const checked = draft.services.includes(s.id);
                  return (
                    <label key={s.id} className="relative block cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={checked}
                        onChange={() =>
                          set("services", checked ? draft.services.filter((x) => x !== s.id) : [...draft.services, s.id])
                        }
                      />
                      <span className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3.5 transition peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-lime peer-focus-visible:ring-offset-2 hover:border-navy/50">
                        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${checked ? "bg-lime text-navy" : "bg-mist text-navy"}`}>
                          <Icon name={s.icon} className="h-5 w-5" />
                        </span>
                        <span className="text-[0.95rem] font-semibold leading-snug">{tx(s.title, locale)}</span>
                        <span className={`ml-auto grid h-6 w-6 shrink-0 place-items-center rounded-full border ${checked ? "border-lime bg-lime text-navy" : "border-line"}`}>
                          {checked && <Check className="h-4 w-4" aria-hidden="true" />}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.services && (
                <p id={fid("services-error")} className="mt-3 flex items-center gap-1.5 text-sm font-medium text-error">
                  <X className="h-4 w-4" aria-hidden="true" /> {errors.services}
                </p>
              )}
              {draft.packageState && packageSummaryText(draft.packageState, locale) && (
                <div className="mt-6 rounded-2xl border border-navy/10 bg-mist p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="flex items-center gap-2 font-semibold text-navy">
                      <Package className="h-5 w-5" aria-hidden="true" /> {w.packageAttached}
                    </p>
                    <button type="button" onClick={() => set("packageState", null)} className="text-sm font-semibold text-navy underline underline-offset-4 hover:no-underline">
                      {w.removePackage}
                    </button>
                  </div>
                  <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted">
                    {packageSummaryText(draft.packageState, locale)}
                  </pre>
                </div>
              )}
            </fieldset>
          )}

          {/* STEP 2 — business */}
          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={fid("businessName")} label={w.businessName} error={errors.businessName}>
                <input
                  id={fid("businessName")}
                  className="field"
                  value={draft.businessName}
                  onChange={(e) => set("businessName", e.target.value)}
                  autoComplete="organization"
                  aria-invalid={!!errors.businessName}
                  aria-describedby={describedBy(fid("businessName"), errors.businessName)}
                  required
                />
              </Field>
              <Field id={fid("industry")} label={w.industry} error={errors.industry}>
                <select
                  id={fid("industry")}
                  className="field"
                  value={draft.industry}
                  onChange={(e) => set("industry", e.target.value)}
                  aria-invalid={!!errors.industry}
                  aria-describedby={describedBy(fid("industry"), errors.industry)}
                  required
                >
                  <option value="">{w.industryPlaceholder}</option>
                  {wizardIndustries.map((i) => (
                    <option key={i.id} value={i.id}>
                      {tx(i.label, locale)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id={fid("website")} label={w.website} hint={w.websiteHint}>
                <input
                  id={fid("website")}
                  className="field"
                  value={draft.website}
                  onChange={(e) => set("website", e.target.value)}
                  autoComplete="url"
                  inputMode="url"
                  aria-describedby={describedBy(fid("website"), undefined, w.websiteHint)}
                />
              </Field>
              <Field id={fid("country")} label={w.country} optional={w.optional}>
                <input
                  id={fid("country")}
                  className="field"
                  value={draft.country}
                  onChange={(e) => set("country", e.target.value)}
                  autoComplete="country-name"
                />
              </Field>
              <div className="sm:col-span-2">
                <ChoiceChips
                  name={fid("language")}
                  legend={w.language}
                  value={draft.preferredLanguage}
                  onChange={(v) => set("preferredLanguage", v)}
                  options={[
                    { id: "tr", label: w.languages.tr },
                    { id: "en", label: w.languages.en },
                  ]}
                />
              </div>
            </div>
          )}

          {/* STEP 3 — project */}
          {step === 2 && (
            <div className="grid gap-6">
              <Field id={fid("description")} label={w.description} hint={w.descriptionHint} error={errors.description}>
                <textarea
                  id={fid("description")}
                  className="field min-h-36 resize-y"
                  value={draft.description}
                  onChange={(e) => set("description", e.target.value)}
                  aria-invalid={!!errors.description}
                  aria-describedby={describedBy(fid("description"), errors.description, w.descriptionHint)}
                  required
                />
              </Field>
              <ChoiceChips
                name={fid("timeline")}
                legend={w.timeline}
                optional={w.optional}
                value={draft.timeline}
                onChange={(v) => set("timeline", v)}
                options={(Object.keys(w.timelines) as (keyof typeof w.timelines)[]).map((k) => ({ id: k, label: w.timelines[k] }))}
              />
              <Field id={fid("budget")} label={w.budget} hint={w.budgetHint} optional={w.optional}>
                <select
                  id={fid("budget")}
                  className="field sm:max-w-sm"
                  value={draft.budget}
                  onChange={(e) => set("budget", e.target.value)}
                  aria-describedby={describedBy(fid("budget"), undefined, w.budgetHint)}
                >
                  <option value="">—</option>
                  {(Object.keys(w.budgets) as (keyof typeof w.budgets)[]).map((k) => (
                    <option key={k} value={k}>
                      {w.budgets[k]}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          )}

          {/* STEP 4 — contact */}
          {step === 3 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field id={fid("fullName")} label={w.fullName} error={errors.fullName}>
                  <input
                    id={fid("fullName")}
                    className="field"
                    value={draft.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    autoComplete="name"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={describedBy(fid("fullName"), errors.fullName)}
                    required
                  />
                </Field>
              </div>
              <Field id={fid("email")} label={w.email} error={errors.email}>
                <input
                  id={fid("email")}
                  type="email"
                  className="field"
                  value={draft.email}
                  onChange={(e) => set("email", e.target.value)}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy(fid("email"), errors.email)}
                />
              </Field>
              <Field id={fid("phone")} label={w.phone} error={errors.phone}>
                <input
                  id={fid("phone")}
                  type="tel"
                  className="field"
                  value={draft.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={describedBy(fid("phone"), errors.phone)}
                />
              </Field>
              <div className="sm:col-span-2">
                <ChoiceChips
                  name={fid("method")}
                  legend={w.contactMethod}
                  value={draft.contactMethod}
                  onChange={(v) => set("contactMethod", v)}
                  error={errors.contactMethod}
                  options={[
                    { id: "email", label: w.methods.email, icon: <Mail className="h-4 w-4" aria-hidden="true" /> },
                    { id: "whatsapp", label: w.methods.whatsapp, icon: <WhatsAppIcon className="h-4 w-4" /> },
                    { id: "phone", label: w.methods.phone },
                  ]}
                />
              </div>
            </div>
          )}

          {/* STEP 5 — review & send */}
          {step === 4 && (
            <div>
              <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
                {summaryRows(draft, locale, t).map((row) => {
                  return (
                    <div key={row.label} className="grid gap-1 bg-white px-4 py-3 sm:grid-cols-[180px_1fr_auto] sm:gap-4">
                      <dt className="text-sm font-semibold text-navy">{row.label}</dt>
                      <dd className="whitespace-pre-wrap text-sm text-muted">{row.value}</dd>
                      <dd>
                        <button type="button" onClick={() => goTo(row.step)} className="text-sm font-semibold text-navy underline underline-offset-4 hover:no-underline">
                          {w.edit}
                          <span className="sr-only"> — {row.label}</span>
                        </button>
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <label className="mt-6 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={draft.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? fid("consent-error") : undefined}
                  className="mt-1 h-5 w-5 shrink-0 accent-navy"
                />
                <span className="text-sm text-navy">
                  {w.consent}{" "}
                  <Link href={href("privacy", locale)} target="_blank" className="font-semibold underline underline-offset-4">
                    {w.privacyLink}
                  </Link>
                </span>
              </label>
              {errors.consent && (
                <p id={fid("consent-error")} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-error">
                  <X className="h-4 w-4" aria-hidden="true" /> {errors.consent}
                </p>
              )}

              <section className="mt-8 rounded-3xl bg-navy p-5 text-white sm:p-7" aria-labelledby={fid("send")}>
                <h4 id={fid("send")} className="text-xl font-bold">
                  {w.send.title}
                </h4>
                <p className="mt-1 text-sm text-white/70">{w.send.intro}</p>

                {status === "handoff" ? (
                  <div className="mt-5 rounded-2xl bg-white/10 p-4" role="status">
                    <p className="text-sm">{fmt(w.send.handoff, { channel })}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          reset();
                          setStatus("complete");
                        }}
                        className="rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-navy hover:bg-lime-300"
                      >
                        {w.send.confirmSent}
                      </button>
                      <button type="button" onClick={() => setStatus("idle")} className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
                        {w.send.keep}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {contactAvailability.form && (
                      <button
                        type="button"
                        onClick={sendForm}
                        disabled={status === "sending"}
                        className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-bold text-navy transition hover:bg-lime-300 disabled:opacity-60"
                      >
                        <Send className="h-4 w-4" aria-hidden="true" />
                        {status === "sending" ? w.send.sending : w.send.form}
                      </button>
                    )}
                    {wa && (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handoff("WhatsApp")}
                        className="inline-flex items-center gap-2 rounded-full bg-[#1f9d55] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#178a49]"
                      >
                        <WhatsAppIcon className="h-4 w-4" /> {w.send.whatsapp}
                      </a>
                    )}
                    {mail && (
                      <a
                        href={mail}
                        onClick={handoff(t.wizard.methods.email)}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-navy transition hover:bg-mist"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" /> {w.send.email}
                      </a>
                    )}
                    <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/10">
                      <Copy className="h-4 w-4" aria-hidden="true" /> {w.send.copy}
                    </button>
                    <button type="button" onClick={download} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/10">
                      <Download className="h-4 w-4" aria-hidden="true" /> {w.send.download}
                    </button>
                  </div>
                )}

                <div aria-live="polite" className="text-sm">
                  {copied && <p className="mt-3 text-lime">{w.send.copied}</p>}
                  {status === "error" && <p className="mt-3 text-[#ffb4a8]">{w.send.sendError}</p>}
                  {!hasOnlineOption && <p className="mt-4 text-white/80">{w.send.notConfigured}</p>}
                </div>
              </section>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        <div className="flex items-center gap-2">
          {step > 0 && (
            <button type="button" onClick={goBack} className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-5 py-3 text-sm font-semibold text-navy transition hover:border-navy">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {w.back}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (window.confirm(w.startOverConfirm)) {
                reset();
                setErrors({});
                setStatus("idle");
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-3 text-sm font-medium text-muted transition hover:text-navy"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> {w.startOver}
          </button>
        </div>
        {step < QUOTE_STEPS - 1 && (
          <button type="button" onClick={goNext} className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-700">
            {w.next} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
