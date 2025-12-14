'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CreditCard, Smartphone, Building2, ArrowRight } from 'lucide-react'
import { useAppSelector } from '@/lib/hooks'

export default function CheckoutPage() {
    const router = useRouter()
    const cartItems = useAppSelector(state => state.cart.items)
    const [selectedPayment, setSelectedPayment] = useState('card')

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = 5.00
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax

    const handlePlaceOrder = () => {
        // Handle order placement
        router.push('/checkout/invoice')
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[120px]">
                <h1 className="text-3xl font-serif text-[#393F50] mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Payment Method */}
                    <div>
                        <h2 className="text-xl font-bold text-[#393F50] mb-6">
                            Select Payment Method
                        </h2>

                        <div className="space-y-4">
                            {/* Credit/Debit Card */}
                            <div
                                onClick={() => setSelectedPayment('card')}
                                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${selectedPayment === 'card'
                                        ? 'border-[#393F50] bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'card' ? 'border-[#393F50]' : 'border-gray-300'
                                        }`}>
                                        {selectedPayment === 'card' && (
                                            <div className="w-3 h-3 rounded-full bg-[#393F50]" />
                                        )}
                                    </div>
                                    <CreditCard className="w-6 h-6 text-gray-700" />
                                    <div>
                                        <h3 className="font-bold text-gray-900">Credit/Debit Card</h3>
                                        <p className="text-sm text-gray-600">Pay securely with your card</p>
                                    </div>
                                </div>

                                {selectedPayment === 'card' && (
                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Card Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    CVV
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Payment */}
                            <div
                                onClick={() => setSelectedPayment('mobile')}
                                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${selectedPayment === 'mobile'
                                        ? 'border-[#393F50] bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'mobile' ? 'border-[#393F50]' : 'border-gray-300'
                                        }`}>
                                        {selectedPayment === 'mobile' && (
                                            <div className="w-3 h-3 rounded-full bg-[#393F50]" />
                                        )}
                                    </div>
                                    <Smartphone className="w-6 h-6 text-gray-700" />
                                    <div>
                                        <h3 className="font-bold text-gray-900">Mobile Payment</h3>
                                        <p className="text-sm text-gray-600">bKash, Nagad, Rocket</p>
                                    </div>
                                </div>

                                {selectedPayment === 'mobile' && (
                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Mobile Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="01XXXXXXXXX"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Bank Transfer */}
                            <div
                                onClick={() => setSelectedPayment('bank')}
                                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${selectedPayment === 'bank'
                                        ? 'border-[#393F50] bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'bank' ? 'border-[#393F50]' : 'border-gray-300'
                                        }`}>
                                        {selectedPayment === 'bank' && (
                                            <div className="w-3 h-3 rounded-full bg-[#393F50]" />
                                        )}
                                    </div>
                                    <Building2 className="w-6 h-6 text-gray-700" />
                                    <div>
                                        <h3 className="font-bold text-gray-900">Bank Transfer</h3>
                                        <p className="text-sm text-gray-600">Direct bank transfer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-fit">
                        <h2 className="text-xl font-bold text-[#393F50] mb-6">
                            Order Summary
                        </h2>

                        {/* Cart Items */}
                        <div className="space-y-4 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-16 h-20 bg-gradient-to-br from-orange-100 to-yellow-100 rounded flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl">📚</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        <p className="text-sm font-bold text-gray-900">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Price Breakdown */}
                        <div className="space-y-3 border-t border-gray-300 pt-4">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-300 pt-3">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <button
                            onClick={handlePlaceOrder}
                            className="w-full mt-6 bg-[#393F50] hover:bg-[#2d3240] text-white py-3.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            Place Order
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
