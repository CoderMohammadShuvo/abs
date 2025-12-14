'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const SLIDES = [
  {
    id: 1,
    title: 'Master Your Craft',
    subtitle: 'Access world-class education from industry experts',
    bg: '/herobg1.jpg',
    image: '/heroright.png'
  },
  {
    id: 2,
    title: 'Unlock Your Potential',
    subtitle: 'Join thousands of students achieving their dreams',
    image: '/hero-slide-2-learning.jpg',
  },
  {
    id: 3,
    title: 'Build Your Future',
    subtitle: 'Comprehensive courses designed for real-world success',
    image: '/hero-slide-3-success.jpg',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const prev = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
    setAutoPlay(false)
  }

  const next = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length)
    setAutoPlay(false)
  }

  return (
    <div className="relative min-h-[500px] md:min-h-[600px] lg:h-screen bg-white overflow-hidden">
      {/* Slides */}
      <div className="relative w-full container mx-auto h-[400px] md:h-[500px] lg:h-[600px] mt-[100px] md:mt-[150px] rounded-2xl overflow-hidden" >
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={slide.bg || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-4 md:px-16">
              <div className="text-left text-white px-4 max-w-xl">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-normal font-mono mb-4">Learning Today <br />Unlimited Growth‍ <br /> with <span className='text-[#FF9500] italic'>ABS Research Academy</span></h1>
                <p className="text-base md:text-lg lg:text-xl">{slide.subtitle}</p>
              </div>
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                width={400}
                height={400}
                className="object-cover hidden md:block"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Left/Right Indicators - Hidden on mobile */}
      <button
        onClick={prev}
        className="hidden md:block absolute left-16 top-1/2 -translate-y-1/2 z-10 p-3  hover:bg-white/40 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 20L22 12V28L14 20ZM0 20C0 22.7667 0.524998 25.3667 1.575 27.8C2.625 30.2333 4.05 32.35 5.85 34.15C7.65 35.95 9.76667 37.375 12.2 38.425C14.6333 39.475 17.2333 40 20 40C22.7667 40 25.3667 39.475 27.8 38.425C30.2333 37.375 32.35 35.95 34.15 34.15C35.95 32.35 37.375 30.2333 38.425 27.8C39.475 25.3667 40 22.7667 40 20C40 17.2333 39.475 14.6333 38.425 12.2C37.375 9.76667 35.95 7.65 34.15 5.85C32.35 4.05 30.2333 2.625 27.8 1.575C25.3667 0.524998 22.7667 0 20 0C17.2333 0 14.6333 0.524998 12.2 1.575C9.76667 2.625 7.65 4.05 5.85 5.85C4.05 7.65 2.625 9.76667 1.575 12.2C0.524998 14.6333 0 17.2333 0 20ZM4 20C4 15.5333 5.55 11.75 8.65 8.65C11.75 5.55 15.5333 4 20 4C24.4667 4 28.25 5.55 31.35 8.65C34.45 11.75 36 15.5333 36 20C36 24.4667 34.45 28.25 31.35 31.35C28.25 34.45 24.4667 36 20 36C15.5333 36 11.75 34.45 8.65 31.35C5.55 28.25 4 24.4667 4 20Z" fill="white" />
        </svg>

      </button>

      <button
        onClick={next}
        className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 z-10 p-3  hover:bg-white/40 rounded-full transition-all"
        aria-label="Next slide"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26 20L18 12V28L26 20ZM40 20C40 22.7667 39.475 25.3667 38.425 27.8C37.375 30.2333 35.95 32.35 34.15 34.15C32.35 35.95 30.2333 37.375 27.8 38.425C25.3667 39.475 22.7667 40 20 40C17.2333 40 14.6333 39.475 12.2 38.425C9.76667 37.375 7.65 35.95 5.85 34.15C4.05 32.35 2.625 30.2333 1.575 27.8C0.525 25.3667 0 22.7667 0 20C0 17.2333 0.525 14.6333 1.575 12.2C2.625 9.76667 4.05 7.65 5.85 5.85C7.65 4.05 9.76667 2.625 12.2 1.575C14.6333 0.524998 17.2333 0 20 0C22.7667 0 25.3667 0.524998 27.8 1.575C30.2333 2.625 32.35 4.05 34.15 5.85C35.95 7.65 37.375 9.76667 38.425 12.2C39.475 14.6333 40 17.2333 40 20ZM36 20C36 15.5333 34.45 11.75 31.35 8.65C28.25 5.55 24.4667 4 20 4C15.5333 4 11.75 5.55 8.65 8.65C5.55 11.75 4 15.5333 4 20C4 24.4667 5.55 28.25 8.65 31.35C11.75 34.45 15.5333 36 20 36C24.4667 36 28.25 34.45 31.35 31.35C34.45 28.25 36 24.4667 36 20Z" fill="white" />
        </svg>

      </button>

      {/* Bottom Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index)
              setAutoPlay(false)
            }}
            className={`transition-all ${index === current
              ? 'bg-white w-8 h-2'
              : 'bg-white/50 hover:bg-white/75 w-2 h-2'
              } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
