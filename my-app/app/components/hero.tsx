'use client'

import { useState } from 'react'
import { Play, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroProps {
  title: string
  description: string
  imageUrl: string
}

export default function Hero({ title, description, imageUrl }: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative h-[90vh] w-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-2xl mx-4 md:mx-16 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
          <p className="text-lg text-gray-200">{description}</p>
          
          <div className="flex space-x-4">
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-white/90"
              onClick={() => setIsPlaying(true)}
            >
              <Play className="mr-2 h-5 w-5" />
              Play
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-gray-500/70 text-white hover:bg-gray-500/50"
            >
              <Info className="mr-2 h-5 w-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

