'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Download, Mail, CheckCircle } from 'lucide-react'

// Mock invoice data
const INVOICE_DATA = {
    orderNumber: '#ORD-2025-12345',
    deliveryEstimate: 'Your book will arrive in 05 days via Express Shipping.',
    invoiceNumber: '0123456',
    date: '24-02-2024',
    billTo: {
        name: 'Paul Lugard',
        phone: '+880 20143219',
        email: 'paul.lugard@gmail.com',
    },
    items: [
        { description: 'Hanye All Catalog', unitPrice: 500, qty: 1, amount: 500 },
        { description: 'Haltech Pro Laptop Bag', unitPrice: 100, qty: 1, amount: 100 },
        { description: 'Dash Tea Preparation', unitPrice: 300, qty: 1, amount: 300 },
        { description: 'Dance Tea Preparation', unitPrice: 500, qty: 1, amount: 500 },
    ],
}

export default function SuccessPage() {
    const handleDownloadInvoice = () => {
        console.log('Download invoice')
        // Handle invoice download
    }

    const handleSendEmail = () => {
        console.log('Send email')
        // Handle email sending
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[80px]">
                <div className="max-w-2xl mx-auto">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-[#393F50] rounded-full flex items-center justify-center">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="text-2xl md:text-3xl font-serif text-[#393F50] text-center mb-8">
                        Thank you! Your payment was successful.
                    </h1>

                    {/* Order & Delivery Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <h2 className="text-lg font-bold text-[#393F50] mb-4">
                            Order & Delivery Info
                        </h2>
                        <p className="text-gray-600 mb-2">
                            Order Number: <span className="font-medium text-[#393F50]">{INVOICE_DATA.orderNumber}</span>
                        </p>
                        <p className="text-gray-600">
                            Delivery Estimate: {INVOICE_DATA.deliveryEstimate}
                        </p>
                    </div>

                    {/* Invoice Preview */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                        {/* Invoice Header */}
                        <div className="bg-[#393F50] text-white p-4">
                            <div className="flex justify-between items-start">
                                <div className="text-sm">
                                    <p>Date Of Delivery</p>
                                    <p className="font-medium">{INVOICE_DATA.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm">No. 0123456</p>
                                    <p className="text-xl font-bold">INVOICE</p>
                                </div>
                            </div>
                        </div>

                        {/* Bill To */}
                        <div className="p-4 border-b border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">Paid To/Bill To</p>
                            <p className="font-medium text-[#393F50]">{INVOICE_DATA.billTo.name}</p>
                            <p className="text-sm text-gray-600">{INVOICE_DATA.billTo.phone}</p>
                            <p className="text-sm text-gray-600">{INVOICE_DATA.billTo.email}</p>
                        </div>

                        {/* Invoice Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#393F50] text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium">DESCRIPTION</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium">UNIT PRICE</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium">QTY</th>
                                        <th className="px-4 py-3 text-right text-sm font-medium">AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {INVOICE_DATA.items.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.description}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 text-center">${item.unitPrice}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 text-center">{item.qty}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 text-right">${item.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleDownloadInvoice}
                            className="w-full bg-[#393F50] hover:bg-[#2d3240] text-white py-3.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            Download Invoice
                            <Download className="w-5 h-5" />
                        </button>

                        <button
                            onClick={handleSendEmail}
                            className="w-full bg-[#393F50] hover:bg-[#2d3240] text-white py-3.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            Send on E-mail
                            <Mail className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
