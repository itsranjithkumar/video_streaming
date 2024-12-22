'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Bell, User } from 'lucide-react'
import { cn } from '@/app/lib/utils'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cn(
      'fixed top-0 z-50 w-full px-4 py-4 transition-all duration-500',
      isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-gradient-to-b from-black/80 to-transparent'
    )}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-red-600 font-bold text-2xl">
            STREAMFLIX
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-sm hover:text-gray-300">Home</Link>
            <Link href="/series" className="text-sm hover:text-gray-300">Series</Link>
            <Link href="/movies" className="text-sm hover:text-gray-300">Movies</Link>
            <Link href="/new" className="text-sm hover:text-gray-300">New & Popular</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="hover:text-gray-300">
            <Search className="w-5 h-5" />
          </button>
          <button className="hover:text-gray-300">
            <Bell className="w-5 h-5" />
          </button>
          <button className="hover:text-gray-300">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}

