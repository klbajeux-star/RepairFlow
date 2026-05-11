import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Routes 100% publiques (jamais protégées)
const PUBLIC_PATHS = [
  "/login",
  "/api/auth", // NextAuth handlers + users-list
  "/_next",
  "/favicon.ico",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Whitelist
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Pas connecté ?
  if (!req.auth) {
    // Pour les routes API : renvoyer 401 JSON (pas de redirection)
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }
    // Pour les pages : redirection vers /login
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  // Tout sauf les assets statiques Next.js
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)"],
};
