import { Play } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

interface VideoHeroProps {
  video: {
    id: string
    title: string
    description: string
    thumbnail: string
  }
}

export function VideoHero({ video }: VideoHeroProps) {
  return (
    <div className="relative h-[80vh] w-full">
      {/* Background Image */}
      <Image
        src="/MoneyHeist.jpg" // Path to the MoneyHeist.jpg image in the public folder
        alt={video.title}
        fill
        className="object-cover brightness-50 transition-transform duration-500 hover:scale-105"
        priority
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-start p-6 md:p-12 lg:p-16">
        <div className="max-w-3xl space-y-6">
          {/* Title */}
          <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            {video.title}
          </h1>
          
          {/* Description */}
          <p className="text-lg text-gray-300 sm:text-xl md:text-2xl lg:text-3xl">
            {video.description}
          </p>
          
          {/* Buttons */}
          <div className="flex space-x-6">
            {/* Play Button */}
            <Button
              size="lg"
              className="bg-white text-black rounded-full px-6 py-3 shadow-md hover:bg-white/90 hover:shadow-lg transition-all"
              asChild
            >
              <Link href={`/watch/${video.id}`}>
                <Play className="mr-2 h-6 w-6 fill-black" />
                Play Now
              </Link>
            </Button>
            
            {/* More Info Button */}
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-white/10 text-white rounded-full px-6 py-3 backdrop-blur-md hover:bg-white/20 hover:shadow-md transition-all"
            >
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
