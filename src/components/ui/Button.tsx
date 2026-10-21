import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "outlineLight" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-lime text-navy hover:bg-lime-300 shadow-[0_10px_30px_-12px_rgba(157,222,38,0.8)]",
  dark: "bg-navy text-white hover:bg-navy-700",
  outline: "border border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white",
  outlineLight: "border border-white/30 text-white hover:border-white hover:bg-white hover:text-navy",
  ghost: "text-navy hover:bg-navy/5",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${styles[variant]} ${extra}`;
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: { variant?: Variant; children: ReactNode } & ComponentProps<"button">) {
  return (
    <button type="button" className={buttonClass(variant, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: { variant?: Variant; children: ReactNode } & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
    </Link>
  );
}
