import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'StreamFlix - Your Premium Streaming Platform',
  description: 'Stream your favorite content in high quality',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}

