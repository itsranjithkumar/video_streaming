'use client'

import { useState, useEffect, useRef } from 'react'

export default function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [mongoData, setMongoData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Video streaming endpoint with cache-busting
    const fullVideoUrl = `/api/video?nocache=${Math.random()}`
    setVideoUrl(fullVideoUrl)

    // Fetch video metadata
    fetch('/api/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return response.json()
      })
      .then(data => {
        setMongoData(data)
        console.log('Fetched Video Metadata:', data)
      })
      .catch(error => {
        console.error('Metadata Fetch Error:', error)
        setError('Unable to load video details')
      })
  }, [])

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.group('Video Error Diagnostics')
    console.error('Event Type:', e.type)
    console.error('Event Details:', e)

    if (videoRef.current) {
      const mediaError = videoRef.current.error
      console.log('Video Element Properties:', {
        currentSrc: videoRef.current.currentSrc,
        networkState: videoRef.current.networkState,
        readyState: videoRef.current.readyState,
        error: mediaError ? {
          code: mediaError.code,
          message: mediaError.message
        } : null
      })

      if (mediaError) {
        console.error('Media Error Details:', {
          code: mediaError.code,
          message: mediaError.message
        })
      }
    }

    console.groupEnd()

    const errorMap: { [key: number]: string } = {
      1: 'MEDIA_ERR_ABORTED: Fetching process aborted',
      2: 'MEDIA_ERR_NETWORK: Network error',
      3: 'MEDIA_ERR_DECODE: Decoding error',
      4: 'MEDIA_ERR_SRC_NOT_SUPPORTED: Video format not supported'
    }

    const errorCode = videoRef.current?.error?.code
    const errorMessage = errorCode ? 
      errorMap[errorCode] || `Unknown error (Code: ${errorCode})` : 
      'Unknown video playback error'

    setError(`Video Playback Error: ${errorMessage}`)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {videoUrl && (
        <video 
          ref={videoRef}
          controls 
          width="100%" 
          className="rounded-lg shadow-lg"
          onError={handleVideoError}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {mongoData && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-black">
          <h2 className="text-xl font-bold mb-2">Video Details</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {mongoData.name || 'Unknown'}</p>
            <p><strong>Description:</strong> {mongoData.description || 'No description available'}</p>
            <p><strong>Duration:</strong> {mongoData.duration ? `${mongoData.duration} seconds` : 'Not specified'}</p>
            <p><strong>Upload Date:</strong> {mongoData.uploadDate || 'Unknown'}</p>
          </div>
        </div>
      )}
    </div>
  )
}