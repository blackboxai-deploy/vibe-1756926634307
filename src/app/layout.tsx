import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NADER - Elegance in Every Essential',
  description: 'Luxury essentials designed with bold, sophisticated style. From clothing to accessories, discover elegance in everyday items.',
  keywords: 'luxury, fashion, accessories, minimalist, premium quality',
  authors: [{ name: 'NADER' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'NADER - Elegance in Every Essential',
    description: 'Luxury essentials designed with bold, sophisticated style.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}