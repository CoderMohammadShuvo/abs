'use client'

import { useState, useMemo } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Search, ChevronDown, FileText, ChevronLeft, ChevronRight } from 'lucide-react'

const ALL_BLOG_POSTS = [
    {
        id: 1,
        title: 'How financial institutions can drive climate action through innovative green bonds and ESG-focused investments.',
        authors: 'Abu Bakkar Siddik, Li Yong, Anna Min Du, John W. Goodell',
        publicationDate: 'July 22, 2025',
        year: 2025,
        keywords: 'Artificial intelligence adoption, Digital banking services, Industry pressure, stakeholder pressure, Environmental sustainability performance, and Banks.',
        category: 'Finance',
    },
    {
        id: 2,
        title: 'Exploring how mobile banking and blockchain are reshaping access to finance in developing nations.',
        authors: 'Abu Bakkar Siddik, Li Yong, Anna Min Du, John W. Goodell',
        publicationDate: 'July 22, 2025',
        year: 2025,
        keywords: 'Artificial intelligence adoption, Digital banking services, Industry pressure, stakeholder pressure, Environmental sustainability performance, and Banks.',
        category: 'Technology',
    },
    {
        id: 3,
        title: 'Why integrating environmental and social risk assessments is no longer optional for banks worldwide.',
        authors: 'Abu Bakkar Siddik, Li Yong, Anna Min Du, John W. Goodell',
        publicationDate: 'June 15, 2025',
        year: 2025,
        keywords: 'Artificial intelligence adoption, Digital banking services, Industry pressure, stakeholder pressure, Environmental sustainability performance, and Banks.',
        category: 'Sustainability',
    },
    {
        id: 4,
        title: 'A guide for scholars on designing robust methodologies that address real-world challenges.',
        authors: 'Abu Bakkar Siddik, Li Yong, Anna Min Du, John W. Goodell',
        publicationDate: 'May 10, 2025',
        year: 2025,
        keywords: 'Artificial intelligence adoption, Digital banking services, Industry pressure, stakeholder pressure, Environmental sustainability performance, and Banks.',
        category: 'Research',
    },
    {
        id: 5,
        title: 'AI is revolutionizing the financial sector — but what are the implications for efficiency, security, and ethics?',
        authors: 'Abu Bakkar Siddik, Li Yong, Anna Min Du, John W. Goodell',
        publicationDate: 'April 20, 2025',
        year: 2025,
        keywords: 'Artificial intelligence adoption, Digital banking services, Industry pressure, stakeholder pressure, Environmental sustainability performance, and Banks.',
        category: 'Technology',
    },
    {
        id: 6,
        title: 'How corporate social responsibility initiatives can create lasting solutions for climate change.',
        authors: 'Abu Bakkar Siddik, Li Yong, Anna Min Du, John W. Goodell',
        publicationDate: 'March 12, 2025',
        year: 2025,
        keywords: 'Artificial intelligence adoption, Digital banking services, Industry pressure, stakeholder pressure, Environmental sustainability performance, and Banks.',
        category: 'Sustainability',
    },
    {
        id: 7,
        title: 'The role of fintech in promoting financial inclusion in emerging markets.',
        authors: 'Jane Smith, Michael Brown',
        publicationDate: 'February 5, 2024',
        year: 2024,
        keywords: 'Fintech, Financial inclusion, Emerging markets',
        category: 'Finance',
    },
    {
        id: 8,
        title: 'Blockchain technology and its impact on supply chain management.',
        authors: 'David Lee, Sarah Johnson',
        publicationDate: 'January 18, 2024',
        year: 2024,
        keywords: 'Blockchain, Supply chain, Technology',
        category: 'Technology',
    },
]

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('date-desc')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedYear, setSelectedYear] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    // Get unique categories and years
    const categories = ['All', ...Array.from(new Set(ALL_BLOG_POSTS.map(post => post.category)))]
    const years = ['All', ...Array.from(new Set(ALL_BLOG_POSTS.map(post => post.year.toString()))).sort().reverse()]

    // Filter and sort blog posts
    const filteredAndSortedPosts = useMemo(() => {
        let result = [...ALL_BLOG_POSTS]

        // Apply search filter
        if (searchQuery) {
            result = result.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.keywords.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Apply category filter
        if (selectedCategory !== 'All') {
            result = result.filter(post => post.category === selectedCategory)
        }

        // Apply year filter
        if (selectedYear !== 'All') {
            result = result.filter(post => post.year.toString() === selectedYear)
        }

        // Apply sorting
        if (sortBy === 'date-desc') {
            result.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime())
        } else if (sortBy === 'date-asc') {
            result.sort((a, b) => new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime())
        } else if (sortBy === 'title') {
            result.sort((a, b) => a.title.localeCompare(b.title))
        }

        return result
    }, [searchQuery, sortBy, selectedCategory, selectedYear])

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedPosts.length / itemsPerPage)
    const paginatedPosts = filteredAndSortedPosts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Banner */}
            <div className="relative h-64 flex items-center justify-center mt-[120px] md:mt-[80px] bg-gradient-to-r from-blue-900/90 to-blue-800/90">
                <div className="absolute inset-0 bg-[url('/blog-hero.jpg')] bg-cover bg-center opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80"></div>
                <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-serif text-white">
                    Our Blog
                </h1>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setCurrentPage(1)
                            }}
                            placeholder="Easy search by title, author, keyword"
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#393F50] text-white rounded-md hover:bg-[#2d3240] transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <option value="date-desc">Sort By: Newest First</option>
                        <option value="date-asc">Sort By: Oldest First</option>
                        <option value="title">Sort By: Title</option>
                    </select>
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value)
                            setCurrentPage(1)
                        }}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <option value="All">All Categories</option>
                        {categories.filter(c => c !== 'All').map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <select
                        value={selectedYear}
                        onChange={(e) => {
                            setSelectedYear(e.target.value)
                            setCurrentPage(1)
                        }}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <option value="All">All Years</option>
                        {years.filter(y => y !== 'All').map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                {/* Results count */}
                <div className="mb-4 text-sm text-gray-600">
                    Showing {paginatedPosts.length} of {filteredAndSortedPosts.length} blog posts
                </div>

                {/* Blog Posts Grid */}
                {paginatedPosts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No blog posts found matching your criteria.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {paginatedPosts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                        {post.category}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold text-[#393F50] mb-3 leading-tight">
                                    {post.title}
                                </h2>

                                <div className="space-y-2 mb-4">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Authors:</span> {post.authors}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Publication Date:</span> {post.publicationDate}
                                    </p>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        <span className="font-medium">Keywords:</span> {post.keywords}
                                    </p>
                                </div>

                                <Link href={`/blog/${post.id}`}>
                                    <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#393F50] transition-colors">
                                        <FileText className="w-4 h-4" />
                                        Read full blog
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum
                            if (totalPages <= 5) {
                                pageNum = i + 1
                            } else if (currentPage <= 3) {
                                pageNum = i + 1
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i
                            } else {
                                pageNum = currentPage - 2 + i
                            }

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === pageNum
                                            ? 'bg-[#393F50] text-white'
                                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            )
                        })}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <>
                                <span className="px-2 text-gray-500">...</span>
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    )
}
