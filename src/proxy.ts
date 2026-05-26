import { NextRequest, NextResponse } from "next/server";
import { safeEqual } from "@/lib/safe-equal";

const LOGIN_PATH = "/resources/login";
const COOKIE_NAME = "resources_auth";

const isDev = process.env.NODE_ENV === "development";

function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: https://api.dicebear.com",
    `connect-src 'self'${isDev ? " ws://localhost:* wss://localhost:*" : ""}`,
    "frame-ancestors 'none'",
  ].join("; ");
}

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const { pathname } = request.nextUrl;

  // Auth guard for /resources/* (except login page)
  if (
    pathname.startsWith("/resources") &&
    pathname !== LOGIN_PATH &&
    !pathname.startsWith("/resources/login")
  ) {
    const cookie = request.cookies.get(COOKIE_NAME);
    const secret = process.env.RESOURCES_SECRET;

    if (!cookie || !secret || !safeEqual(cookie.value, secret)) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
  }

  // Propagate nonce to Server Components via request header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", buildCsp(nonce));

  return response;
}

export const config = {
  matcher: [
    // Run on all routes except Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
