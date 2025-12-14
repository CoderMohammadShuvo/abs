'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { removeFromCart, updateQuantity } from '@/lib/slices/cartSlice'
import Link from 'next/link'

export default function CartPage() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(state => state.cart.items)

    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        email: '',
        streetAddress: '',
        city: '',
        postalCode: '',
        country: '',
        saveAddress: false,
    })

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    const handleUpdateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id, quantity: newQuantity }))
        }
    }

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id))
    }

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle checkout process
        console.log('Shipping Info:', shippingInfo)
        console.log('Cart Items:', cartItems)
        // Navigate to checkout page
        router.push('/checkout')
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[120px]">
                <h1 className="text-3xl font-serif text-[#393F50] mb-8">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-6 text-lg">Your cart is empty</p>
                        <Link href="/book-shop">
                            <button className="px-8 py-3 bg-[#393F50] text-white rounded-lg hover:bg-[#2d3240] transition-colors">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Side - Cart Items */}
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                                >
                                    {/* Item Image */}
                                    <div className="w-24 h-32 bg-gradient-to-br from-orange-100 to-yellow-100 rounded flex items-center justify-center flex-shrink-0">
                                        <span className="text-4xl">📚</span>
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg text-[#393F50]">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-gray-600">By: Mark Anupam Mallik</p>
                                                <p className="text-sm text-gray-600">Category: Fiction</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center border border-gray-300 rounded">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 hover:bg-gray-100 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-4 py-2 text-sm font-medium min-w-[60px] text-center">
                                                    {item.quantity.toString().padStart(2, '0')}
                                                </span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 hover:bg-gray-100 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <p className="text-xl font-bold text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Subtotal */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <span className="text-xl font-medium text-gray-700">Sub-total</span>
                                <span className="text-2xl font-bold text-gray-900">
                                    ${subtotal.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Right Side - Shipping Information */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-fit">
                            <h2 className="text-xl font-bold text-[#393F50] mb-6">
                                Shipping Information
                            </h2>

                            <form onSubmit={handleContinue} className="space-y-4">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        value={shippingInfo.fullName}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={shippingInfo.email}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                        placeholder="Enter your email address"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                {/* Street Address */}
                                <div>
                                    <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-2">
                                        Street Address
                                    </label>
                                    <textarea
                                        id="streetAddress"
                                        value={shippingInfo.streetAddress}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, streetAddress: e.target.value })}
                                        placeholder="Enter your street address"
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                                        required
                                    />
                                </div>

                                {/* City Name */}
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                        City Name
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        value={shippingInfo.city}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                        placeholder="Enter your city name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                {/* Postal Code / ZIP */}
                                <div>
                                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                                        Postal Code / ZIP
                                    </label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        value={shippingInfo.postalCode}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                                        placeholder="Enter your postal code/ZIP"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                {/* Country Name */}
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                                        Country Name
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        value={shippingInfo.country}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                                        placeholder="Enter your country name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                {/* Save Address Checkbox */}
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="saveAddress"
                                        checked={shippingInfo.saveAddress}
                                        onChange={(e) => setShippingInfo({ ...shippingInfo, saveAddress: e.target.checked })}
                                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="saveAddress" className="text-sm text-gray-600">
                                        Save this address for future orders
                                    </label>
                                </div>

                                {/* Continue Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#393F50] hover:bg-[#2d3240] text-white py-3.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    Continue
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    )
}
