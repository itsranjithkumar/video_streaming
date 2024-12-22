import { NextResponse } from 'next/server'
import clientPromise from '@/app/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('moto')
    const collection = db.collection('model')
   
    const result = await collection.findOne()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch data', 
     details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
