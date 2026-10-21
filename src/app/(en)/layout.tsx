import type { Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { SiteShell } from "@/components/layout/SiteShell";

export const viewport: Viewport = { themeColor: "#0f162b" };

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
