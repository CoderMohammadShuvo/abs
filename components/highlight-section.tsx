'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import HighlightCard, { HighlightCardProps } from './highlight-card'

const HIGHLIGHTS: HighlightCardProps[] = [
  {
    id: '1',
    image: '/highlightimage1.png',
    title: 'Web Development Mastery',
    description: 'Learn modern web development with React, Next.js, and full-stack technologies. Build production-ready applications.',
    buttonText: 'Explore Course',
  },
  {
    id: '2',
    image: '/highlightimage2.png',
    title: 'UI/UX Design Bootcamp',
    description: 'Master design principles, tools, and create beautiful user experiences. From wireframes to high-fidelity designs.',
    buttonText: 'View Details',
  },
  {
    id: '3',
    image: '/highlightimage3.png',
    title: 'Data Science & AI',
    description: 'Dive deep into machine learning, data analysis, and artificial intelligence. Hands-on projects included.',
    buttonText: 'Start Learning',
  },
  {
    id: '4',
    image: '/highlightimage4.jpg',
    title: 'Mobile App Development',
    description: 'Build iOS and Android apps with React Native and Flutter. Deploy to app stores.',
    buttonText: 'Get Started',
  },
]

export default function HighlightSection() {
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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-[68px]  font-regular font-mono mb-2">Highlights</h2>
        </div>

        <div className="relative">
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth-horizontal pb-4"
          >
            {HIGHLIGHTS.map((highlight) => (
              <HighlightCard
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
