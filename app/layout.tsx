import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/providers/theme-provider'
import Loading from './loading'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Events',
  description:"Streamlined app for seamless event planning, invites, and real-time updates.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <body className={inter.className}>
       <Suspense fallback={<Loading/>}>
         

        <ClerkProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
               <Toaster
  position="bottom-center"
  reverseOrder={false}
/>
        {children}
          </ThemeProvider>
    </ClerkProvider>
              </Suspense>
        </body>
    </html>
  )
}
