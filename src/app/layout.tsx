import { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { unstable_noStore as noStore } from 'next/cache'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'A personal portfolio website showcasing my projects and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  noStore(); // Prevent static rendering and caching
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
