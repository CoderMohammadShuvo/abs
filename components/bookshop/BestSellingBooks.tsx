'use client'

import Link from 'next/link'

const BEST_SELLING_BOOKS = [
    {
        id: 1,
        title: 'Research Methodology',
        author: 'Dr. Sarah Johnson',
        price: 15.99,
        rating: 4.8,
        sales: '10K+ sold',
    },
    {
        id: 2,
        title: 'Data Analysis Guide',
        author: 'Prof. Michael Chen',
        price: 18.50,
        rating: 4.9,
        sales: '8K+ sold',
    },
    {
        id: 3,
        title: 'Academic Writing',
        author: 'Dr. Emily Brown',
        price: 12.99,
        rating: 4.7,
        sales: '12K+ sold',
    },
    {
        id: 4,
        title: 'Statistical Methods',
        author: 'Prof. David Lee',
        price: 20.00,
        rating: 4.9,
        sales: '9K+ sold',
    },
    {
        id: 5,
        title: 'Literature Review',
        author: 'Dr. Amanda White',
        price: 14.50,
        rating: 4.6,
        sales: '7K+ sold',
    },
    {
        id: 6,
        title: 'Thesis Writing',
        author: 'Prof. James Wilson',
        price: 16.99,
        rating: 4.8,
        sales: '11K+ sold',
    },
]

export default function BestSellingBooks() {
    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-4">
                        Best Selling Books
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our most popular academic books trusted by researchers and students worldwide
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BEST_SELLING_BOOKS.map((book) => (
                        <Link key={book.id} href={`/book-shop/${book.id}`}>
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                                {/* Book Image */}
                                <div className="relative h-64 bg-gradient-to-br from-orange-100 to-yellow-100 overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300">
                                        📚
                                    </div>
                                    {/* Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                            BESTSELLER
                                        </span>
                                    </div>
                                </div>

                                {/* Book Info */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-[#393F50] mb-1 group-hover:text-blue-600 transition-colors">
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                        by {book.author}
                                    </p>

                                    {/* Rating and Sales */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-500">★</span>
                                            <span className="text-sm font-medium text-gray-700">
                                                {book.rating}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {book.sales}
                                        </span>
                                    </div>

                                    {/* Price and Button */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-gray-900">
                                            ${book.price.toFixed(2)}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                // Handle add to cart
                                            }}
                                            className="px-4 py-2 bg-[#393F50] text-white rounded-lg text-sm font-medium hover:bg-[#2d3240] transition-colors"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link href="/book-shop">
                        <button className="px-8 py-3 bg-[#393F50] text-white rounded-lg font-medium hover:bg-[#2d3240] transition-colors">
                            View All Books
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
