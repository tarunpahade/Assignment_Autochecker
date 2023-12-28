import './globals.css'
import type { Metadata } from 'next'
import { NextAuthProvider } from './providers'
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      <SpeedInsights/>
      <div className="min-h-full"   >

              
     
        {children}
        </div>
        

        </body>
        </NextAuthProvider>
       
        
    </html>
  )
}
