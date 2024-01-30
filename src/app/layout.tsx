import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from '@/components/header'

import './globals.css'

import { ClientProvider } from '@/components/Provider'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
  // one,
  // two,
}: Readonly<{
  children: React.ReactNode
  // one: React.ReactNode
  // two: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header></Header>
            {children}
            {/* {one}
            {two} */}
          </ThemeProvider>
        </ClientProvider>
      </body>
    </html>
  )
}
