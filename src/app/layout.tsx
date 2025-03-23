import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { PostHogProvider } from '@/components/PostHogProvider'
import './globals.css'
import { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: "Yash Bhardwaj",
  description: "Building fun things on the internet",
  metadataBase: new URL('https://yashbhardwaj.com'),
  icons: {
    icon: '/favicon.ico?v=1',
    apple: '/apple-touch-icon.png?v=1',
    shortcut: '/favicon-16x16.png?v=1',
  },
  manifest: '/site.webmanifest',
  themeColor: '#000000',
  openGraph: {
    type: 'website',
    url: 'https://yashbhardwaj.com',
    title: "Yash Bhardwaj",
    description: "Building fun things on the internet",
    siteName: 'Yash Bhardwaj',
    images: ["https://yashbhardwaj.com/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Bhardwaj",
    description: "Building fun things on the internet",
    images: ["https://yashbhardwaj.com/og-image.png"],
    creator: '@ybhrdwj',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`}>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
        <PostHogProvider>
          <Header />
          <main>
            {children}
          </main>
        </PostHogProvider>
      </body>
    </html>
  )
}
