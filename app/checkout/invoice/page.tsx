'use client'

import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { CheckCircle, Download, Printer } from 'lucide-react'
import { useAppSelector } from '@/lib/hooks'

export default function InvoicePage() {
    const router = useRouter()
    const cartItems = useAppSelector(state => state.cart.items)

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = 5.00
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax

    const orderNumber = `ORD-${Date.now()}`
    const orderDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[120px]">
                {/* Success Message */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-serif text-[#393F50] mb-2">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-gray-600">
                        Thank you for your purchase. Your order has been confirmed.
                    </p>
                </div>

                {/* Invoice */}
                <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                    {/* Invoice Header */}
                    <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-200">
                        <div>
                            <h2 className="text-2xl font-bold text-[#393F50] mb-2">INVOICE</h2>
                            <p className="text-sm text-gray-600">Order #{orderNumber}</p>
                            <p className="text-sm text-gray-600">Date: {orderDate}</p>
                        </div>
                        <div className="text-right">
                            <h3 className="font-bold text-gray-900 mb-1">ABS Research</h3>
                            <p className="text-sm text-gray-600">123 Research Street</p>
                            <p className="text-sm text-gray-600">Academic City, AC 12345</p>
                            <p className="text-sm text-gray-600">contact@absresearch.com</p>
                        </div>
                    </div>

                    {/* Shipping Information */}
                    <div className="mb-8">
                        <h3 className="font-bold text-gray-900 mb-3">Shipping Address</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">John Doe</p>
                            <p className="text-gray-600 text-sm">john.doe@example.com</p>
                            <p className="text-gray-600 text-sm mt-2">123 Main Street</p>
                            <p className="text-gray-600 text-sm">New York, NY 10001</p>
                            <p className="text-gray-600 text-sm">United States</p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-8">
                        <h3 className="font-bold text-gray-900 mb-4">Order Items</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Item</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Quantity</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Price</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xl">📚</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900">{item.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center text-gray-700">{item.quantity}</td>
                                            <td className="px-4 py-4 text-right text-gray-700">${item.price.toFixed(2)}</td>
                                            <td className="px-4 py-4 text-right font-medium text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="flex justify-end mb-8">
                        <div className="w-full max-w-sm space-y-2">
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
                            <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-300 pt-2">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                        <button
                            onClick={() => window.print()}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            <Printer className="w-5 h-5" />
                            Print Invoice
                        </button>
                        <button
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            <Download className="w-5 h-5" />
                            Download PDF
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="flex-1 px-6 py-3 bg-[#393F50] text-white rounded-lg font-medium hover:bg-[#2d3240] transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
