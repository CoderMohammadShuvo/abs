'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { FileText, ChevronLeft, ChevronRight } from 'lucide-react'

const RELATED_NEWS = [
    {
        id: 1,
        image: '/news1.jpg',
        publishDate: '00 Moth 2000',
        title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        excerpt: 'In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.',
        featured: true,
    },
    {
        id: 2,
        image: '/news2.jpg',
        publishDate: '00 Moth 2000',
        title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        excerpt: 'In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.',
    },
    {
        id: 3,
        image: '/news3.jpg',
        publishDate: '00 Moth 2000',
        title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        excerpt: 'In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.',
    },
    {
        id: 4,
        image: '/news4.jpg',
        publishDate: '00 Moth 2000',
        title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        excerpt: 'In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.',
    },
]

export default function OthersNews() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400
            const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header with Navigation Buttons */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50]">
                        Others News
                    </h2>

                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {RELATED_NEWS.map((article, index) => (
                        <div
                            key={article.id}
                            className="flex-shrink-0 w-80 bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gradient-to-br from-pink-200 to-orange-200">
                                {index === 0 && (
                                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                                        Latest News
                                    </div>
                                )}
                                <div className="w-full h-full flex items-center justify-center text-6xl">
                                    📰
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="text-xs text-gray-500 mb-2">
                                    Publish Date: {article.publishDate}
                                </p>
                                <h3 className="text-lg font-bold text-[#393F50] mb-3">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                    {article.excerpt}
                                </p>
                                <Link href={`/news/${article.id}`}>
                                    <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#393F50] transition-colors">
                                        <FileText className="w-4 h-4" />
                                        Read more
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    )
}
