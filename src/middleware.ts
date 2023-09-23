"use client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/signup" ||
    path === "/reset";
  const token = request.cookies.get("next-auth.session-token")?.value || "";
  let cookie = request.cookies.get("userRole");
  
  if(path==='/student'&&cookie?.value==='teacher'){
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Denied Access' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
  if(path==='/teacher'&&cookie?.value==='Student'){
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Denied Access' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
  if (isPublicPath && token) {
    if (cookie?.value === "Student") {
      return NextResponse.redirect(new URL("/student", request.nextUrl));
    } else if (cookie?.value === "teacher") {
      return NextResponse.redirect(new URL("/teacher", request.nextUrl));
    }
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/reset",
    "/assignment",
    "/teacher",
    "/playground",
    "/student",
    '/preview',
    '/assignmentDetails'
  ],
};
