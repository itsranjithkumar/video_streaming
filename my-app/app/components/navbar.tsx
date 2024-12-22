// app/components/navbar.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Video, Home, Database } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = [
    { 
      label: 'Home', 
      href: '/', 
      icon: <Home className="w-5 h-5" /> 
    },
    { 
      label: 'Video Stream', 
      href: '/video', 
      icon: <Video className="w-5 h-5" /> 
    },
    { 
      label: 'Database', 
      href: '/data', 
      icon: <Database className="w-5 h-5" /> 
    }
  ]

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center">
          <Video className="mr-2 text-red-500" />
          StreamFlix
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {menuItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className="flex items-center space-x-2 hover:text-red-500 transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-900 md:hidden">
            <div className="flex flex-col space-y-2 p-4">
              {menuItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded"
                  onClick={toggleMenu}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}