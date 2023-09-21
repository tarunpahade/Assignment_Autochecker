'use client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  //const path=request.nextUrl.pathname
//  const isPublicPath=path === '/' || path === '/login' || path === '/signup' || path === '/reset' 
// const token= request.cookies.get('next-auth.session-token')?.value || ''
// const tokenPath=['/profile','/teacher','/student']

//  if (isPublicPath && token) {
//    return NextResponse.redirect(new URL('/student',request.nextUrl))
//  }
//  if (isPublicPath && token) {
//   return NextResponse.redirect(new URL('/teacher',request.nextUrl))
// }

// if (isPublicPath && token) {
//   return NextResponse.redirect(new URL('/profile',request.nextUrl))
// }
//  if(!isPublicPath && !token){
//     return NextResponse.redirect(new URL('/login',request.nextUrl))
//   }
//   if(isPublicPath && token){
//     return NextResponse.redirect(new URL('/assignment',request.nextUrl))
//   }

}
 
export const config = {
  matcher: [
    '/',
    '/login',
    '/profile',
    '/signup',
    '/reset',
    '/teacher',
    '/student',
    '/assignment',
    '/assignment/[id]'

  ],
}