'use client'

import { useState, useMemo } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import BestSellingBooks from '@/components/bookshop/BestSellingBooks'
import BookShopFeatures from '@/components/bookshop/BookShopFeatures'
import Link from 'next/link'
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

const ALL_BOOKS = [
    {
        id: 1,
        title: 'Introduction to Financial Technology',
        price: 10.20,
        image: '/book1.jpg',
        category: 'Finance',
        language: 'English',
        format: 'Hardcover',
    },
    {
        id: 2,
        title: 'Data Science Fundamentals',
        price: 15.50,
        image: '/book2.jpg',
        category: 'Technology',
        language: 'English',
        format: 'Paperback',
    },
    {
        id: 3,
        title: 'Sustainable Banking Practices',
        price: 12.99,
        image: '/book3.jpg',
        category: 'Finance',
        language: 'English',
        format: 'eBook',
    },
    {
        id: 4,
        title: 'Research Methodology Guide',
        price: 18.75,
        image: '/book4.jpg',
        category: 'Academic',
        language: 'English',
        format: 'Hardcover',
    },
    {
        id: 5,
        title: 'Machine Learning Basics',
        price: 22.00,
        image: '/book1.jpg',
        category: 'Technology',
        language: 'English',
        format: 'Paperback',
    },
    {
        id: 6,
        title: 'Corporate Finance Theory',
        price: 25.50,
        image: '/book2.jpg',
        category: 'Finance',
        language: 'English',
        format: 'Hardcover',
    },
    {
        id: 7,
        title: 'Academic Writing Excellence',
        price: 14.99,
        image: '/book3.jpg',
        category: 'Academic',
        language: 'English',
        format: 'eBook',
    },
    {
        id: 8,
        title: 'Digital Transformation',
        price: 19.99,
        image: '/book4.jpg',
        category: 'Technology',
        language: 'English',
        format: 'Paperback',
    },
]

export default function BookShopPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [sortBy, setSortBy] = useState('default')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8

    // Get unique categories
    const categories = ['All', ...Array.from(new Set(ALL_BOOKS.map(book => book.category)))]

    // Filter and sort books
    const filteredAndSortedBooks = useMemo(() => {
        let result = [...ALL_BOOKS]

        // Apply search filter
        if (searchQuery) {
            result = result.filter(book =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Apply category filter
        if (selectedCategory !== 'All') {
            result = result.filter(book => book.category === selectedCategory)
        }

        // Apply sorting
        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price)
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price)
        } else if (sortBy === 'name') {
            result.sort((a, b) => a.title.localeCompare(b.title))
        }

        return result
    }, [searchQuery, selectedCategory, sortBy])

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedBooks.length / itemsPerPage)
    const paginatedBooks = filteredAndSortedBooks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Banner */}
            <div className="relative h-64 flex items-center justify-center mt-[120px] md:mt-[80px] bg-gradient-to-r from-blue-900/90 to-blue-800/90">
                <div className="absolute inset-0 bg-[url('/bookshelf.jpg')] bg-cover bg-center opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80"></div>
                <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-serif text-white">
                    Our Book Shop
                </h1>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Filter Dropdowns */}
                    <div className="flex flex-wrap gap-3">
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <option value="default">Sort By</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name">Name: A to Z</option>
                        </select>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 md:max-w-md ml-auto">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setCurrentPage(1)
                                }}
                                placeholder="Easy search by title, author, keyword"
                                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#393F50] text-white rounded-md hover:bg-[#2d3240] transition-colors">
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results count */}
                <div className="mb-4 text-sm text-gray-600">
                    Showing {paginatedBooks.length} of {filteredAndSortedBooks.length} books
                </div>

                {/* Popular Books Section */}
                <div className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-serif text-[#393F50] mb-8">
                        {searchQuery || selectedCategory !== 'All' ? 'Search Results' : 'Popular Books'}
                    </h2>

                    {paginatedBooks.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No books found matching your criteria.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {paginatedBooks.map((book) => (
                                <Link key={book.id} href={`/book-shop/${book.id}`}>
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                        {/* Book Image */}
                                        <div className="relative h-80 bg-gradient-to-br from-orange-100 to-yellow-100">
                                            <div className="w-full h-full flex items-center justify-center text-6xl">
                                                📚
                                            </div>
                                        </div>

                                        {/* Book Info */}
                                        <div className="p-4 text-center">
                                            <h3 className="text-lg font-bold text-[#393F50] mb-2 line-clamp-2">
                                                {book.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 mb-2">{book.category}</p>
                                            <p className="text-xl font-bold text-gray-900 mb-4">
                                                ${book.price.toFixed(2)}
                                            </p>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        // Handle buy now
                                                    }}
                                                    className="flex-1 py-2 bg-[#393F50] text-white rounded-lg text-sm font-medium hover:bg-[#2d3240] transition-colors"
                                                >
                                                    Buy Now
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        // Handle add to cart
                                                    }}
                                                    className="flex-1 py-2 bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
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

            <BestSellingBooks />
            <BookShopFeatures />

            <Footer />
        </main>
    )
}
