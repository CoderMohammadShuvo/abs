'use client'

import { use } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react'

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[120px]">
                {/* Back Button */}
                <Link href="/news">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Back to News
                    </button>
                </Link>

                <div className="max-w-4xl mx-auto">
                    {/* Article Header */}
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                Technology
                            </span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                                Research
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-serif text-[#393F50] mb-6 leading-tight">
                            Breaking: New Research Shows Climate Change Impact on Global Economy
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>November 20, 2025</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                <span>By Dr. Sarah Johnson</span>
                            </div>
                            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                                <Share2 className="w-5 h-5" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="relative h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg mb-8">
                        <div className="w-full h-full flex items-center justify-center text-9xl">
                            📰
                        </div>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none">
                        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                            Recent studies reveal significant economic implications of climate change across multiple sectors,
                            affecting global markets and investment strategies in unprecedented ways.
                        </p>

                        <h2 className="text-2xl font-bold text-[#393F50] mt-8 mb-4">
                            Key Findings
                        </h2>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            The comprehensive research, conducted over a period of five years, has uncovered critical insights
                            into how climate change is reshaping the global economic landscape. The study analyzed data from
                            over 150 countries and examined various economic indicators to understand the full scope of climate
                            impact on financial systems.
                        </p>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            One of the most significant findings is the direct correlation between rising global temperatures
                            and decreased productivity in key industries. Manufacturing, agriculture, and construction sectors
                            have shown measurable declines in output during extreme weather events, leading to substantial
                            economic losses.
                        </p>

                        <h2 className="text-2xl font-bold text-[#393F50] mt-8 mb-4">
                            Economic Implications
                        </h2>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            The research highlights several critical areas where climate change is having the most profound
                            economic impact. These include disruptions to supply chains, increased insurance costs, and the
                            need for significant infrastructure investments to adapt to changing environmental conditions.
                        </p>

                        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                            <li>Supply chain disruptions costing billions annually</li>
                            <li>Rising insurance premiums in climate-vulnerable regions</li>
                            <li>Increased investment in climate-resilient infrastructure</li>
                            <li>Shifts in agricultural productivity and food security</li>
                            <li>Growing demand for renewable energy solutions</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#393F50] mt-8 mb-4">
                            Future Outlook
                        </h2>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Looking ahead, the research suggests that proactive measures and strategic investments in climate
                            adaptation can significantly mitigate economic risks. Countries and corporations that prioritize
                            sustainability and climate resilience are likely to gain competitive advantages in the evolving
                            global economy.
                        </p>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            The study concludes with recommendations for policymakers and business leaders to integrate climate
                            considerations into their long-term planning and decision-making processes. This includes investing
                            in green technologies, developing climate risk assessment frameworks, and fostering international
                            cooperation on climate action.
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-700">Tags:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                Climate Change
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                Global Economy
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                Research
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                Sustainability
                            </span>
                        </div>
                    </div>

                    {/* Related News */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <h3 className="text-2xl font-bold text-[#393F50] mb-6">
                            Related News
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2].map((item) => (
                                <Link key={item} href={`/news/${item + 1}`}>
                                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                                        <h4 className="font-bold text-[#393F50] mb-2">
                                            Related Article Title {item}
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Brief description of the related news article...
                                        </p>
                                        <span className="text-sm text-blue-600 hover:text-blue-700">
                                            Read More →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
