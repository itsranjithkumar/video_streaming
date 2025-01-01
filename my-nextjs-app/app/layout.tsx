import "@/app/globals.css"

import { Inter } from 'next/font/google'

import { Navigation } from "./components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Streaming Platform",
  description: "A modern video streaming platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}

