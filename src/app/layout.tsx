import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './providers'
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/navbar'
import { redirect, usePathname } from 'next/navigation'
import Users from '@/dbconfig/dbconfig'
import { useEffect } from 'react'
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

const showHeader = pathname === '/login' || pathname === '/signup' || pathname === 'setup' ? false : true;

console.log(pathname, showHeader, 'This is true or false');

console.log(pathname,showHeader,'This is true or false');

  return (
    <html lang="en">
      <body className={inter.className}>
      
      <NextAuthProvider>
      <ThemeProvider attribute="class">
      <div className="min-h-full"   >
      {showHeader &&   <Navbar />}
      
        {children}
        </div>
        </ThemeProvider>
        </NextAuthProvider>
        
        </body>
    </html>
  )
}
