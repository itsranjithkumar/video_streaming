import VideoPlayer from './components/video-player'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Video Streaming</h1>
      <VideoPlayer />
    </main>
  )
}