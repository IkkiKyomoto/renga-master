export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/hokku/:path*", "/tsukeku/:path*", "/mypage/:path*"],
};
