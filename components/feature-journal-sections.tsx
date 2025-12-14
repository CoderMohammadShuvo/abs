'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import HighlightCard from './highlight-card'

interface Course {
  id: string
  image: string
  title: string
  description: string
  rating: number
  students: number
  price: number
  buttonText: string
}

const FEATURED_COURSES: Course[] = [
  {
    id: '1',
    image: '/course1.png',
    title: 'Advanced React & Next.js',
    description: 'Master modern React patterns and build scalable Next.js applications.',
    rating: 4.9,
    students: 2543,
    price: 79.99,
    buttonText: 'Enroll Now',
  },
  {
    id: '2',
    image: '/course2.png',
    title: 'Design Systems Masterclass',
    description: 'Create and maintain comprehensive design systems for your organization.',
    rating: 4.8,
    students: 1820,
    price: 89.99,
    buttonText: 'Enroll Now',
  },
  {
    id: '3',
    image: '/course3.png',
    title: 'Machine Learning Bootcamp',
    description: 'Deep dive into ML algorithms, neural networks, and practical applications.',
    rating: 4.95,
    students: 3210,
    price: 99.99,
    buttonText: 'Enroll Now',
  },
  {
    id: '4',
    image: '/course1.png',
    title: 'Cloud Architecture AWS',
    description: 'Design and deploy scalable applications on AWS cloud infrastructure.',
    rating: 4.7,
    students: 1456,
    price: 84.99,
    buttonText: 'Enroll Now',
  },
]

export default function FeatureJournals() {
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
        <div className="mb-8 text-center max-w-3xl mx-auto ">
          <h2 className="text-[68px]  font-regular font-mono mb-2">Featured Journals</h2>
          <p className=''>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <div className="relative ">
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth-horizontal pb-4 pt-8"
          >
            {FEATURED_COURSES.map((highlight) => (
              <HighlightCard
                key={highlight.id}
                {...highlight}
                onButtonClick={() => console.log(`Clicked: ${highlight.title}`)}
              />
            ))}
          </div>
          <div className='flex justify-center w-full mt-8'>
            <Button className="px-6 py-3 mt-2  text-[#393F50] border bg-white rounded-none hover:bg-white">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 22H2C1.45 22 0.979167 21.8042 0.5875 21.4125C0.195833 21.0208 0 20.55 0 20V17H2V20H5V22ZM17 22V20H20V17H22V20C22 20.55 21.8042 21.0208 21.4125 21.4125C21.0208 21.8042 20.55 22 20 22H17ZM11 17.5C9 17.5 7.1875 16.9083 5.5625 15.725C3.9375 14.5417 2.75 12.9667 2 11C2.75 9.03333 3.9375 7.45833 5.5625 6.275C7.1875 5.09167 9 4.5 11 4.5C13 4.5 14.8125 5.09167 16.4375 6.275C18.0625 7.45833 19.25 9.03333 20 11C19.25 12.9667 18.0625 14.5417 16.4375 15.725C14.8125 16.9083 13 17.5 11 17.5ZM11 15.5C12.4667 15.5 13.8083 15.1 15.025 14.3C16.2417 13.5 17.175 12.4 17.825 11C17.175 9.6 16.2417 8.5 15.025 7.7C13.8083 6.9 12.4667 6.5 11 6.5C9.53333 6.5 8.19167 6.9 6.975 7.7C5.75833 8.5 4.825 9.6 4.175 11C4.825 12.4 5.75833 13.5 6.975 14.3C8.19167 15.1 9.53333 15.5 11 15.5ZM11 14.5C11.9667 14.5 12.7917 14.1583 13.475 13.475C14.1583 12.7917 14.5 11.9667 14.5 11C14.5 10.0333 14.1583 9.20833 13.475 8.525C12.7917 7.84167 11.9667 7.5 11 7.5C10.0333 7.5 9.20833 7.84167 8.525 8.525C7.84167 9.20833 7.5 10.0333 7.5 11C7.5 11.9667 7.84167 12.7917 8.525 13.475C9.20833 14.1583 10.0333 14.5 11 14.5ZM11 12.5C10.5833 12.5 10.2292 12.3542 9.9375 12.0625C9.64583 11.7708 9.5 11.4167 9.5 11C9.5 10.5833 9.64583 10.2292 9.9375 9.9375C10.2292 9.64583 10.5833 9.5 11 9.5C11.4167 9.5 11.7708 9.64583 12.0625 9.9375C12.3542 10.2292 12.5 10.5833 12.5 11C12.5 11.4167 12.3542 11.7708 12.0625 12.0625C11.7708 12.3542 11.4167 12.5 11 12.5ZM0 5V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H5V2H2V5H0ZM20 5V2H17V0H20C20.55 0 21.0208 0.195833 21.4125 0.5875C21.8042 0.979167 22 1.45 22 2V5H20Z" fill="#393F50" />
              </svg>


              See More
            </Button>
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
