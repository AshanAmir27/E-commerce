import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAdmin = true; // change to test

  if (!isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};