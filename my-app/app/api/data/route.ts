import { NextResponse } from 'next/server'
import clientPromise from '@/app/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('moto')
    const collection = db.collection('model')
    
    // Provide a default document if no data found
    const result = await collection.findOne() || {
      name: 'Sample Video',
      description: 'Default video from the collection',
      duration: 120,
      uploadDate: new Date().toISOString()
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch data', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}