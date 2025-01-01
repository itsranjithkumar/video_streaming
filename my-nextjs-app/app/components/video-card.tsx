import { Play } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface VideoCardProps {
  video: {
    id: string
    title: string
    thumbnail: string
    duration: string
    genre: string
    year: string
  }
}

export function VideoCard({ video }: VideoCardProps) {
    return (
      <Card className="group relative w-[300px] overflow-hidden border-0 bg-transparent shadow-lg transition-shadow duration-300 hover:shadow-xl">
        {/* Thumbnail Section */}
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {/* Play Button */}
          <Button
            size="icon"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white p-4 shadow-md transition-transform duration-300 group-hover:scale-100 group-hover:shadow-lg"
            asChild
          >
            <Link href={`/watch/${video.id}`}>
              <Play className="h-6 w-6 fill-black" />
              <span className="sr-only">Play {video.title}</span>
            </Link>
          </Button>
        </div>
  
        {/* Content Section */}
        <CardHeader className="mt-4 p-4">
          {/* Title */}
          <CardTitle className="line-clamp-1 text-lg font-semibold text-white">
            {video.title}
          </CardTitle>
          {/* Description */}
          <CardDescription className="text-sm text-gray-400">
            {video.duration} • {video.genre} • {video.year}
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }
  
