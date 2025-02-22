import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`}>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
