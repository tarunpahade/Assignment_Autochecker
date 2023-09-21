import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './providers'
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/navbar'
import { useRouter } from 'next/navigation'

//theme provider is causing errors of creater cpontext
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
    
      
      <NextAuthProvider>
     
      <body >
      <div className="min-h-full"   >
        <Navbar />
      
        {children}
        </div>
        

        </body>
        </NextAuthProvider>
       
        
    </html>
  )
}
