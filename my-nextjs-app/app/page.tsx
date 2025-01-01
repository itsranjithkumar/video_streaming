import { ChevronRight } from 'lucide-react'
// import Image from "next/image"
// import Link from "next/link"

import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
// import { Skeleton } from "@/components/ui/skeleton"
import { VideoCard } from "./components/video-card"
import { VideoHero } from "./components/video-hero"

// Sample data - replace with your API calls
const featuredVideo = {
  id: "1",
  title: "The Grand Journey",
  description: "An epic adventure through uncharted territories, where courage meets destiny.",
  thumbnail: "/placeholder.svg?height=1080&width=1920",
  duration: "2:30:15",
  genre: "Adventure",
  year: "2024",
}

const categories = [
  {
    title: "Trending Now",
    videos: Array(10).fill(null).map((_, i) => ({
      id: `trending-${i}`,
      title: `Trending Video ${i + 1}`,
      thumbnail: `/Money.jpg?height=400&width=600`,
      duration: "1:30:00",
      genre: "Action",
      year: "2024",
    })),
  },
  {
    title: "New Releases",
    videos: Array(10).fill(null).map((_, i) => ({
      id: `new-${i}`,
      title: `New Release ${i + 1}`,
      thumbnail: `/boys.jpg?height=400&width=600`,
      duration: "2:15:00",
      genre: "Drama",
      year: "2024",
    })),
  },
  {
    title: "Most Popular",
    videos: Array(10).fill(null).map((_, i) => ({
      id: `popular-${i}`,
      title: `Popular Video ${i + 1}`,
      thumbnail: `/saw.jpg?height=400&width=600`,
      duration: "1:45:00",
      genre: "Thriller",
      year: "2024",
    })),
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <VideoHero video={featuredVideo} />

      {/* Categories */}
      <div className="space-y-16 px-4 pb-20 md:px-8 lg:px-16">
        {categories.map((category) => (
          <section key={category.title} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold tracking-wide text-gray-100">
                {category.title}
              </h2>
              <Button
                variant="link"
                className="text-gray-300 hover:text-white transition duration-200"
              >
                See all
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-6 p-1">
                {category.videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="bg-gray-700/30" />
            </ScrollArea>
          </section>
        ))}
      </div>
    </main>
  )
}
