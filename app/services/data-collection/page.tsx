'use client'

import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsIncluded from '@/components/services/WhatsIncluded'
import AdvancedAnalysis from '@/components/services/AdvancedAnalysis'
import DataCollectionQuote from '@/components/services/DataCollectionQuote'
import { ArrowLeft } from 'lucide-react'

const PRICING_DATA = [
    {
        sampleSize: '< 100 Samples',
        questions1_15: '$ 150 - 200',
        questions16_30: '$ 200 - 250',
        questions31_50: '$ 250 - 300',
        questions50Plus: '$ 300+',
        deliveryTime: '3 - 5 Business days',
    },
    {
        sampleSize: '100 - 200 Samples',
        questions1_15: '$ 250 - 300',
        questions16_30: '$ 300 - 350',
        questions31_50: '$ 350 - 400',
        questions50Plus: '$ 400+',
        deliveryTime: '5 - 7 Business days',
    },
    {
        sampleSize: '300 - 500 Samples',
        questions1_15: '$ 350 - 400',
        questions16_30: '$ 400 - 500',
        questions31_50: '$ 500 - 600',
        questions50Plus: '$ 600+',
        deliveryTime: '7 - 10 Business days',
    },
    {
        sampleSize: '500+ Samples',
        questions1_15: '$ 500 - 600',
        questions16_30: '$ 600 - 700',
        questions31_50: '$ 750 - 900',
        questions50Plus: '$ 900+',
        deliveryTime: '10 - 14 Business days',
    },
]

export default function DataCollectionPage() {
    const router = useRouter()

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[80px]">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </button>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Left Side - Illustration Card */}
                    <div className="bg-[#393F50] rounded-2xl p-8 flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Data Collection and Analysis
                            </h2>
                            {/* Placeholder for illustration - you can add an actual illustration here */}
                            <div className="bg-[#2d3240] rounded-xl p-8 mt-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-blue-500 h-20 rounded"></div>
                                    <div className="bg-yellow-500 h-20 rounded"></div>
                                    <div className="bg-green-500 h-20 rounded"></div>
                                    <div className="bg-purple-500 h-20 rounded"></div>
                                    <div className="bg-red-500 h-20 rounded"></div>
                                    <div className="bg-orange-500 h-20 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Description */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-6">
                            Data Collection and Analysis
                        </h1>
                        <p className="text-gray-600 leading-relaxed">
                            At ABS Research Academy, we provide end-to-end data collection and analysis
                            services tailored to your research or business needs. Our team ensures high-quality,
                            reliable, and actionable data, using advanced methods such as surveys, interviews,
                            econometric/statistical modeling, and big data analytics.
                        </p>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                        Pricing
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] border-collapse border border-gray-200 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-4 text-left border border-gray-200 font-bold text-gray-700">
                                        Sample Size
                                    </th>
                                    <th className="p-4 text-center border border-gray-200 font-bold text-gray-700">
                                        1-15 Questions
                                    </th>
                                    <th className="p-4 text-center border border-gray-200 font-bold text-gray-700">
                                        16-30 Questions
                                    </th>
                                    <th className="p-4 text-center border border-gray-200 font-bold text-gray-700">
                                        31-50 Questions
                                    </th>
                                    <th className="p-4 text-center border border-gray-200 font-bold text-gray-700">
                                        50+ Questions
                                    </th>
                                    <th className="p-4 text-center border border-gray-200 font-bold text-gray-700">
                                        Estimated Delivery time
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {PRICING_DATA.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="p-4 border border-gray-200 text-gray-700">
                                            {row.sampleSize}
                                        </td>
                                        <td className="p-4 border border-gray-200 text-center text-gray-700">
                                            {row.questions1_15}
                                        </td>
                                        <td className="p-4 border border-gray-200 text-center text-gray-700">
                                            {row.questions16_30}
                                        </td>
                                        <td className="p-4 border border-gray-200 text-center text-gray-700">
                                            {row.questions31_50}
                                        </td>
                                        <td className="p-4 border border-gray-200 text-center text-gray-700">
                                            {row.questions50Plus}
                                        </td>
                                        <td className="p-4 border border-gray-200 text-center text-gray-700">
                                            {row.deliveryTime}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Rush Delivery Section */}
                <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-serif text-[#393F50] mb-4">
                        Rush Delivery
                    </h3>
                    <p className="text-gray-600">
                        Need results faster? Rush delivery (50% faster turnaround) is available at{' '}
                        <span className="font-bold text-[#393F50]">+25% fee</span>
                    </p>
                </div>
            </div>

            <WhatsIncluded />
            <AdvancedAnalysis />
            <DataCollectionQuote />

            <Footer />
        </main>
    )
}
