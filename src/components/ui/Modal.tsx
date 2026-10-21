"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useIsClient } from "@/lib/useIsClient";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), video[controls], iframe, [tabindex]:not([tabindex="-1"])';

let openCount = 0;

/**
 * Accessible dialog: traps focus, closes on Escape or backdrop click,
 * locks page scrolling and returns focus to the trigger when closed.
 */
export function Modal({
  open,
  onClose,
  label,
  children,
  closeLabel,
  variant = "center",
  dark = false,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  closeLabel: string;
  children: ReactNode;
  variant?: "center" | "drawer";
  dark?: boolean;
}) {
  const isClient = useIsClient();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    openCount += 1;
    document.documentElement.style.overflow = "hidden";

    const focusFirst = window.setTimeout(() => {
      const panel = panelRef.current;
      const target = panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel;
      target?.focus();
    }, 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (n) => n.offsetParent !== null || n === document.activeElement,
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKey);
      openCount -= 1;
      if (openCount === 0) document.documentElement.style.overflow = "";
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-[80] flex ${variant === "drawer" ? "justify-end" : "items-end justify-center sm:items-center sm:p-6"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className={
              variant === "drawer"
                ? "relative flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white shadow-2xl outline-none"
                : `relative max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-t-3xl shadow-2xl outline-none sm:rounded-3xl ${dark ? "bg-navy text-white" : "bg-white"}`
            }
            initial={variant === "drawer" ? { x: "100%" } : { y: 40, opacity: 0, scale: 0.98 }}
            animate={variant === "drawer" ? { x: 0 } : { y: 0, opacity: 1, scale: 1 }}
            exit={variant === "drawer" ? { x: "100%" } : { y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className={`absolute right-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-full transition ${dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-mist text-navy hover:bg-navy hover:text-white"}`}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
