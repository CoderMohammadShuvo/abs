'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CreditCard, Building2 } from 'lucide-react'

// Mock course data - in a real app this would come from state/context or URL params
const COURSE_DATA = {
    title: 'Scientific Writing',
    image: '/course2.png',
    price: 150,
    discount: 10,
    tax: 10,
}

const PAYMENT_METHODS = [
    { id: 'debit-credit', label: 'Transaction by Debit Card/Credit card', icon: CreditCard },
    { id: 'mastercard', label: 'Transaction by Mastercard', logo: '/mastercard-logo.png' },
    { id: 'visa', label: 'Transaction by VISA', logo: '/visa-logo.png' },
    { id: 'paypal', label: 'Transaction by Paypal', logo: '/paypal-logo.png' },
    { id: 'stripe', label: 'Transaction by Stripe', logo: '/stripe-logo.png' },
    { id: 'unionpay', label: 'Transaction by UnionPay', logo: '/unionpay-logo.png' },
    { id: 'bkash', label: 'Transaction by Bkash', logo: '/bkash-logo.png' },
    { id: 'bank', label: 'Bank Transaction', icon: Building2 },
]

export default function CheckoutPage() {
    const router = useRouter()
    const [selectedPayment, setSelectedPayment] = useState('bank')

    const discountAmount = (COURSE_DATA.price * COURSE_DATA.discount) / 100
    const total = COURSE_DATA.price - discountAmount + COURSE_DATA.tax

    const handleContinuePayment = () => {
        console.log('Continue payment with:', selectedPayment)
        // Handle payment processing
        // Navigate to success page
        router.push('/services/training-courses/success')
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[80px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Left Side - Course Summary */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
                        <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded text-sm font-medium text-gray-700 z-10">
                                Course
                            </div>
                            <Image
                                src={COURSE_DATA.image}
                                alt={COURSE_DATA.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <h2 className="text-2xl font-serif text-[#393F50] mb-6">
                            {COURSE_DATA.title}
                        </h2>

                        <div className="space-y-3 text-gray-600">
                            <div className="flex justify-between">
                                <span>Course price</span>
                                <span className="font-medium">${COURSE_DATA.price}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>Discount {COURSE_DATA.discount}% off</span>
                                <span className="font-medium">-${discountAmount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span className="font-medium">${COURSE_DATA.tax}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-3 mt-3">
                                <div className="flex justify-between text-lg font-bold text-[#393F50]">
                                    <span>Total</span>
                                    <span>${total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Payment Methods */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-xl font-bold text-[#393F50] mb-6">
                            Payment Method
                        </h3>

                        <div className="space-y-3 mb-6">
                            {PAYMENT_METHODS.map((method) => (
                                <label
                                    key={method.id}
                                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        value={method.id}
                                        checked={selectedPayment === method.id}
                                        onChange={(e) => setSelectedPayment(e.target.value)}
                                        className="w-4 h-4 text-blue-600"
                                    />

                                    {method.icon ? (
                                        <method.icon className="w-5 h-5 text-gray-600" />
                                    ) : method.logo ? (
                                        <div className="w-8 h-8 relative flex items-center justify-center">
                                            {/* Placeholder for logos - you can add actual logo images */}
                                            <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                                                {method.label.split(' ')[2]?.charAt(0) || 'P'}
                                            </div>
                                        </div>
                                    ) : null}

                                    <span className="text-gray-700">{method.label}</span>
                                </label>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600">Total Payment</span>
                                <span className="text-2xl font-bold text-[#393F50]">${total}</span>
                            </div>

                            <button
                                onClick={handleContinuePayment}
                                className="w-full bg-[#393F50] hover:bg-[#2d3240] text-white py-3.5 rounded-lg font-medium transition-colors"
                            >
                                Continue Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
