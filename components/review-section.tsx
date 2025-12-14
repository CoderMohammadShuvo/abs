'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import HighlightCard from './highlight-card'
import ReviewCard from './review-card'

interface Review {
  id: string
  image: string
  name: string
  title: string
  description: string
  
}

export const FEATURED_COURSES: Review[] = [
  {
    id: '1',
    image: '/reviewperson.png',
    name:'Ayesha Rahman',
    title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    description: 'In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.',
    
  },
  {
    id: '2',
    image: '/reviewperson2.png',
    name:'James Okafor',
    title: 'Design Systems Masterclass',
    description: 'In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.',
  },
  {
    id: '3',
    image: '/reviewperson3.jpg',
    name:'James Okafor',
    title: 'Machine Learning Bootcamp',
    description: 'Deep dive into ML algorithms, neural networks, and practical applications.',

  },
  {
    id: '4',
    image: '/reviewperson.png',
    name:'Ayesha Rahman',
    title: 'Cloud Architecture AWS',
    description: 'In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.',
  },
]

export default function ReviewSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 20
      )
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = container.clientWidth * 0.8
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
      setTimeout(checkScroll, 100)
    }
  }

  return (
    <section className="bg-white h-ful pt-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center  mx-auto ">
          <h2 className="text-[68px]  font-regular font-mono mb-2">Testimonials & Reviews</h2>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <div className="relative ">
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth-horizontal pb-4 pt-8"
          >
            {FEATURED_COURSES.map((highlight) => (
               //@ts-ignore
              <ReviewCard
                key={highlight.id}
                {...highlight}
                onButtonClick={() => console.log(`Clicked: ${highlight.title}`)}
              />
            ))}
          </div>

          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/3 -translate-y-1/2 z-10 p-3 bg-background border border-border rounded-full hover:bg-muted transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/3 -translate-y-1/2 z-10 p-3 bg-background border border-border rounded-full hover:bg-muted transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
