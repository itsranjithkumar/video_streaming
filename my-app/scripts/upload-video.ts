import { MongoClient, GridFSBucket } from 'mongodb';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Equivalent to __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function uploadVideoToMongoDB() {
  // Use environment variable or fallback to a default connection string
  const uri = process.env.MONGODB_URI || 'mongodb+srv://suryapa9092:9iMXKRF89jT4vE9G@test0.7df1d.mongodb.net/?retryWrites=true&w=majority&appName=Test0'
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db('videoStreamingDB')
    const bucket = new GridFSBucket(db)

    const videoPath = path.join(__dirname, '..', 'public', 'videos', 'video.mp4')
    
    // Check if file exists
    try {
      await fs.access(videoPath)
    } catch (error) {
      console.error('Video file not found:', videoPath)
      return
    }

    const uploadStream = bucket.openUploadStream('video.mp4', {
      metadata: {
        uploadedAt: new Date(),
        contentType: 'video/mp4'
      }
    })

    const fileStream = fs.createReadStream(videoPath)

    return new Promise((resolve, reject) => {
      fileStream.pipe(uploadStream)
        .on('error', (error) => {
          console.error('Upload error:', error)
          client.close()
          reject(error)
        })
        .on('finish', () => {
          console.log('Video uploaded successfully')
          client.close()
          resolve(true)
        })
    })
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

// Execute the upload
uploadVideoToMongoDB()
  .then(() => console.log('Upload process completed'))
  .catch(error => console.error('Upload process failed:', error))