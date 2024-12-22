import { MongoClient, GridFSBucket } from 'mongodb'

const uri = process.env.MONGODB_URI || ''
const options = {}

let client: MongoClient
let gridFSBucket: GridFSBucket

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

export async function connectToDatabase() {
  if (!client) {
    client = await MongoClient.connect(uri, options)
  }
  
  const db = client.db('videoStreamingDB')
  gridFSBucket = new GridFSBucket(db)
  
  return { client, db, gridFSBucket }
}

export async function findVideoByName(filename: string) {
  const { db, gridFSBucket } = await connectToDatabase()
  
  try {
    // Find file in files collection
    const files = db.collection('fs.files')
    const file = await files.findOne({ filename })
    
    if (!file) {
      throw new Error(`Video file ${filename} not found`)
    }
    
    return file
  } catch (error) {
    console.error('Error finding video:', error)
    throw error
  }
}