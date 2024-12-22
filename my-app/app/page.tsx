import Hero from '@/app/components/hero'
import ContentRow from '@/app/components/content-row'

// Mock data - replace with your actual data
const featuredContent = {
  title: "Stranger Things 4",
  description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
  imageUrl: "/placeholder.svg?height=1080&width=1920"
}

const trendingNow = [
  { id: '1', title: 'Movie 1', thumbnailUrl: '/placeholder.svg?height=146&width=260' },
  { id: '2', title: 'Movie 2', thumbnailUrl: '/placeholder.svg?height=146&width=260' },
  { id: '3', title: 'Movie 3', thumbnailUrl: '/placeholder.svg?height=146&width=260' },
  { id: '4', title: 'Movie 4', thumbnailUrl: '/placeholder.svg?height=146&width=260' },
  { id: '5', title: 'Movie 5', thumbnailUrl: '/placeholder.svg?height=146&width=260' },
  { id: '6', title: 'Movie 6', thumbnailUrl: '/placeholder.svg?height=146&width=260' },
]

const popular = [
  { id: '7', title: 'Movie 7', thumbnailUrl: '/placeholder.svg?height=146&width=260' },
  { id: '8', title: 'Movie 8', thumbnailUrl: '/placeholder.svg?height=146&width=260' },
  { id: '9', title: 'Movie 9', thumbnailUrl: '/placeholder.svg?height=146&width=260' },
  { id: '10', title: 'Movie 10', thumbnailUrl: '/placeholder.svg?height=146&width=260' },
  { id: '11', title: 'Movie 11', thumbnailUrl: '/placeholder.svg?height=146&width=260' },
  { id: '12', title: 'Movie 12', thumbnailUrl: '/placeholder.svg?height=146&width=260' },
]

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Hero {...featuredContent} />
      
      <div className="relative z-20 -mt-32 space-y-8 pb-16">
        <ContentRow title="Trending Now" items={trendingNow} />
        <ContentRow title="Popular on StreamFlix" items={popular} />
      </div>
    </div>
  )
}

