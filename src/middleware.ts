import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export default NextAuth(authConfig).auth;

export async function middleware(request: NextRequest) {
  const session = await auth();
  const path = request.nextUrl.pathname;
  const baseUrl = request.nextUrl.origin;
  if (!session) {
    if (path.startsWith("/tsukeku")) {
      return NextResponse.redirect(baseUrl + "/login");
    } else if (path.startsWith("/my-page")) {
      return NextResponse.redirect(baseUrl + "/login");
    } else if (path.startsWith("/hokku")) {
      return NextResponse.redirect(baseUrl + "/login");
    }
  } else {
    if (path.startsWith("/login")) {
      return NextResponse.redirect(baseUrl + "/");
    } else if (path.startsWith("/register")) {
      return NextResponse.redirect(baseUrl + "/");
    } else if (path.startsWith("/my-page")) {
      if (!path.startsWith(`/my-page/${session.user?.id}`)) {
        return NextResponse.redirect(baseUrl + `/my-page/${session.user?.id}`);
      }
    }
  }
}

export const config = {
  middleware: "auth",
};
