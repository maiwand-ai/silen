import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE, routes } from "@/lib/i18n";

/**
 * Turkish is the default language. Visitors who switched to English
 * (remembered in a cookie) are sent to the English version of a Turkish page.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const route = Object.values(routes).find((r) => r.tr === pathname);
  if (!route || request.cookies.get(LANG_COOKIE)?.value !== "en") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = route.en;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/", "/butik-reklamlari", "/gizlilik"],
};
