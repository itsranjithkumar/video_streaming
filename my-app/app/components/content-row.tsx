'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Content {
  id: string
  title: string
  thumbnailUrl: string
}

interface ContentRowProps {
  title: string
  items: Content[]
}

export default function ContentRow({ title, items }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: 'left' | 'right') => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-2 md:space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold pl-4 md:pl-16">{title}</h2>
      
      <div className="group relative">
        <ChevronLeft 
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 
            cursor-pointer opacity-0 transition group-hover:opacity-100
            hover:scale-125 ${!isMoved && 'hidden'}`}
          onClick={() => handleClick('left')}
        />

        <div 
          ref={rowRef}
          className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide md:space-x-4 md:p-4"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="relative min-w-[180px] cursor-pointer transition 
                duration-200 ease-out md:min-w-[260px] md:hover:scale-105"
            >
              <Image
                src={item.thumbnailUrl}
                alt={item.title}
                width={260}
                height={146}
                className="rounded-sm object-cover md:rounded"
              />
            </div>
          ))}
        </div>

        <ChevronRight 
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 
            cursor-pointer opacity-0 transition group-hover:opacity-100
            hover:scale-125"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  )
}

