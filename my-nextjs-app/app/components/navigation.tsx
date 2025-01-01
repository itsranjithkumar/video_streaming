"use client"

import { Bell, Search, User2 } from "lucide-react"
// import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="text-lg font-bold text-white">StreamFlix</span>
          </Link>
          <nav className="hidden space-x-6 md:flex">
            {["Home", "Movies", "TV Series", "New & Popular"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" & ", "").replace(" ", "")}`}
                className="text-sm font-medium text-white/90 transition-colors hover:text-white"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search and User Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 bg-white/10 pl-10 text-white placeholder:text-white/50 focus:bg-white/20"
            />
          </div>

          {/* Icons */}
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/10"
            aria-label="Search"
          >
            <Search className="h-5 w-5 md:hidden" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/10"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 hidden md:block" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/10"
            aria-label="User Profile"
          >
            <User2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
