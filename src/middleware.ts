import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextRequest, NextResponse } from "next/server";

export default NextAuth(authConfig).auth

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/hokku/:path*", "/tsukeku/:path*", "/mypage/:path*"],
};
