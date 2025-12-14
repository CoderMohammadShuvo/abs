'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react'
import { useAppDispatch } from '@/lib/hooks'
import { addToCart } from '@/lib/slices/cartSlice'
import Link from 'next/link'

export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [quantity, setQuantity] = useState(1)

    const book = {
        id: id,
        title: 'The Art of Research',
        author: 'Dr. Mark Anupam Mallik',
        price: 10.20,
        description: 'A comprehensive guide to conducting academic research with practical insights and methodologies.',
        isbn: '978-1-234567-89-0',
        publisher: 'Academic Press',
        publicationDate: '2025',
        pages: 450,
        language: 'English',
        format: 'Hardcover',
        category: 'Academic',
    }

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: book.id,
            title: book.title,
            price: book.price,
            quantity: quantity,
        }))
        alert('Added to cart!')
    }

    const handleBuyNow = () => {
        dispatch(addToCart({
            id: book.id,
            title: book.title,
            price: book.price,
            quantity: quantity,
        }))
        router.push('/cart')
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[120px]">
                {/* Back Button */}
                <Link href="/book-shop">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Book Shop
                    </button>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side - Book Image */}
                    <div>
                        <div className="relative h-[600px] bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg sticky top-24">
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-9xl">📚</span>
                            </div>
                            <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                                <Heart className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Book Details */}
                    <div>
                        <div className="mb-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                {book.category}
                            </span>
                        </div>

                        <h1 className="text-4xl font-serif text-[#393F50] mb-4">
                            {book.title}
                        </h1>

                        <p className="text-xl text-gray-600 mb-6">
                            by {book.author}
                        </p>

                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl font-bold text-gray-900">
                                ${book.price.toFixed(2)}
                            </span>
                        </div>

                        <p className="text-gray-700 mb-8 leading-relaxed">
                            {book.description}
                        </p>

                        {/* Book Details */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-8">
                            <h3 className="font-bold text-[#393F50] mb-4">Book Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">ISBN:</span>
                                    <span className="font-medium text-gray-900">{book.isbn}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Publisher:</span>
                                    <span className="font-medium text-gray-900">{book.publisher}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Publication Date:</span>
                                    <span className="font-medium text-gray-900">{book.publicationDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Pages:</span>
                                    <span className="font-medium text-gray-900">{book.pages}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Language:</span>
                                    <span className="font-medium text-gray-900">{book.language}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Format:</span>
                                    <span className="font-medium text-gray-900">{book.format}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    −
                                </button>
                                <span className="w-16 text-center font-medium text-lg">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 py-4 bg-[#393F50] text-white rounded-lg font-medium hover:bg-[#2d3240] transition-colors"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="font-bold text-[#393F50] mb-4">Shipping & Returns</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>• Free shipping on orders over $50</li>
                                <li>• 30-day return policy</li>
                                <li>• Secure payment processing</li>
                                <li>• Ships within 2-3 business days</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Related Books */}
                <div className="mt-16">
                    <h2 className="text-3xl font-serif text-[#393F50] mb-8">
                        You May Also Like
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <Link key={item} href={`/book-shop/${item}`}>
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="relative h-64 bg-gradient-to-br from-orange-100 to-yellow-100">
                                        <div className="w-full h-full flex items-center justify-center text-6xl">
                                            📚
                                        </div>
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="font-bold text-[#393F50] mb-2">
                                            Related Book {item}
                                        </h3>
                                        <p className="text-lg font-bold text-gray-900">
                                            ${(10.20 + item).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
