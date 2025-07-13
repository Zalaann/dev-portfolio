import type { Metadata } from "next";
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { unstable_noStore as noStore } from 'next/cache'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Muhammad Ibrahim | Full Stack Developer",
  description: "Portfolio website showcasing my work as a Full Stack Developer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  noStore(); // Prevent static rendering and caching
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
