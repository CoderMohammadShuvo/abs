'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Search, ChevronDown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

const NEWS_ARTICLES = [
    {
        id: 1,
        title: 'Breaking: New Research Shows Climate Change Impact on Global Economy',
        excerpt: 'Recent studies reveal significant economic implications of climate change across multiple sectors...',
        date: 'November 20, 2025',
        category: 'Environment',
        image: '/news1.jpg',
    },
    {
        id: 2,
        title: 'AI Revolution in Healthcare: New Diagnostic Tools Save Lives',
        excerpt: 'Artificial intelligence is transforming medical diagnostics with unprecedented accuracy rates...',
        date: 'November 19, 2025',
        category: 'Technology',
        image: '/news2.jpg',
    },
    {
        id: 3,
        title: 'Global Education Summit Announces Major Reforms',
        excerpt: 'World leaders gather to discuss the future of education in the digital age...',
        date: 'November 18, 2025',
        category: 'Education',
        image: '/news3.jpg',
    },
    {
        id: 4,
        title: 'Sustainable Development Goals: Progress Report 2025',
        excerpt: 'UN releases comprehensive report on global progress towards sustainability targets...',
        date: 'November 17, 2025',
        category: 'Sustainability',
        image: '/news4.jpg',
    },
    {
        id: 5,
        title: 'Breakthrough in Renewable Energy Storage Technology',
        excerpt: 'Scientists develop new battery technology that could revolutionize clean energy...',
        date: 'November 16, 2025',
        category: 'Science',
        image: '/news5.jpg',
    },
    {
        id: 6,
        title: 'International Conference on Digital Transformation',
        excerpt: 'Industry leaders discuss the future of digital innovation and its societal impact...',
        date: 'November 15, 2025',
        category: 'Technology',
        image: '/news6.jpg',
    },
]

export default function NewsPage() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Banner */}
            <div className="relative h-64 flex items-center justify-center mt-[120px] bg-gradient-to-r from-blue-900/90 to-blue-800/90">
                <div className="absolute inset-0 bg-[url('/news-hero.jpg')] bg-cover bg-center opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80"></div>
                <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-serif text-white">
                    Latest News
                </h1>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search news by title, category, or keyword"
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#393F50] text-white rounded-md hover:bg-[#2d3240] transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        All Categories
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Sort By Date
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {NEWS_ARTICLES.map((article) => (
                        <Link key={article.id} href={`/news/${article.id}`}>
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                                {/* Article Image */}
                                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100">
                                    <div className="w-full h-full flex items-center justify-center text-6xl">
                                        📰
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Article Content */}
                                <div className="p-5">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                        <Calendar className="w-4 h-4" />
                                        <span>{article.date}</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-[#393F50] mb-2 line-clamp-2">
                                        {article.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 line-clamp-3">
                                        {article.excerpt}
                                    </p>

                                    <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>

                    <button className="px-4 py-2 bg-[#393F50] text-white rounded-lg text-sm font-medium">
                        01
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        02
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        03
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <Footer />
        </main>
    )
}
