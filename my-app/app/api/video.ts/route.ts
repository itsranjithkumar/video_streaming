import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, findVideoByName } from '../lib/mongodb'
import { GridFSBucket } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const { gridFSBucket } = await connectToDatabase()
    const filename = 'video.mp4' // Or get from query params

    // Find video metadata
    const videoFile = await findVideoByName(filename)
    
    console.log('Video File Metadata:', videoFile)

    // Get range header for partial content
    const range = request.headers.get('range')
    
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : videoFile.length - 1

      const chunksize = (end - start) + 1
      
      // Create download stream with range
      const downloadStream = gridFSBucket.openDownloadStream(videoFile._id, {
        start,
        end
      })

      return new NextResponse(downloadStream as any, {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${videoFile.length}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize.toString(),
          'Content-Type': 'video/mp4',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      })
    } else {
      // Full file download
      const downloadStream = gridFSBucket.openDownloadStream(videoFile._id)
      
      return new NextResponse(downloadStream as any, {
        status: 200,
        headers: {
          'Content-Type': 'video/mp4',
          'Content-Length': videoFile.length.toString(),
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      })
    }
  } catch (error) {
    console.error('Video Streaming Error:', error)
    return NextResponse.json({ 
      error: 'Failed to stream video', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}