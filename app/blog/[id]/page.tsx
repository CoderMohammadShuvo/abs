'use client'

import { use } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowLeft, Share2, MessageCircle } from 'lucide-react'

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[120px]">
                {/* Back Button */}
                <Link href="/blog">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Blog
                    </button>
                </Link>

                <div className="max-w-4xl mx-auto">
                    {/* Blog Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-serif text-[#393F50] mb-6 leading-tight">
                            How financial institutions can drive climate action through innovative green bonds and ESG-focused investments
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                <span>Abu Bakkar Siddik, Li Yong, Anna Min Du, John W. Goodell</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>July 22, 2025</span>
                            </div>
                            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                                <Share2 className="w-5 h-5" />
                                <span>Share</span>
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                Finance
                            </span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                                Sustainability
                            </span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                                ESG
                            </span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-8">
                        <div className="w-full h-full flex items-center justify-center text-9xl">
                            📊
                        </div>
                    </div>

                    {/* Blog Content */}
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-bold text-[#393F50] mt-8 mb-4">
                            Abstract
                        </h2>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            This research explores how financial institutions can leverage green bonds and Environmental,
                            Social, and Governance (ESG) investments to drive meaningful climate action. Through comprehensive
                            analysis of market trends and case studies, we demonstrate the potential for sustainable finance
                            to create positive environmental impact while maintaining financial returns.
                        </p>

                        <h2 className="text-2xl font-bold text-[#393F50] mt-8 mb-4">
                            Introduction
                        </h2>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            The global financial sector is increasingly recognizing its role in addressing climate change.
                            Green bonds and ESG-focused investments have emerged as powerful tools for channeling capital
                            toward environmentally sustainable projects and companies. This blog post examines the mechanisms,
                            benefits, and challenges of these innovative financial instruments.
                        </p>

                        <h2 className="text-2xl font-bold text-[#393F50] mt-8 mb-4">
                            The Rise of Green Bonds
                        </h2>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Green bonds have experienced remarkable growth over the past decade. These fixed-income instruments
                            are specifically earmarked to raise money for climate and environmental projects. The green bond
                            market has expanded from virtually nothing in 2007 to hundreds of billions of dollars in annual
                            issuance today.
                        </p>

                        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                            <li>Renewable energy projects (solar, wind, hydroelectric)</li>
                            <li>Energy efficiency improvements in buildings and infrastructure</li>
                            <li>Sustainable transportation systems</li>
                            <li>Climate change adaptation initiatives</li>
                            <li>Biodiversity conservation and ecosystem protection</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#393F50] mt-8 mb-4">
                            ESG Investment Strategies
                        </h2>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            ESG investing goes beyond traditional financial analysis by incorporating environmental, social,
                            and governance factors into investment decisions. This approach recognizes that companies with
                            strong ESG practices are often better positioned for long-term success and resilience.
                        </p>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Research shows that ESG-focused portfolios can deliver competitive returns while contributing to
                            positive societal outcomes. Financial institutions are increasingly integrating ESG criteria into
                            their investment processes, driven by both investor demand and regulatory requirements.
                        </p>

                        <h2 className="text-2xl font-bold text-[#393F50] mt-8 mb-4">
                            Challenges and Opportunities
                        </h2>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Despite the growth and promise of green finance, several challenges remain. These include
                            standardization of green bond frameworks, verification of environmental impact, and ensuring
                            that investments genuinely contribute to climate goals rather than serving as greenwashing.
                        </p>

                        <h2 className="text-2xl font-bold text-[#393F50] mt-8 mb-4">
                            Conclusion
                        </h2>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Financial institutions have a critical role to play in the transition to a low-carbon economy.
                            Through innovative instruments like green bonds and comprehensive ESG integration, the financial
                            sector can drive significant climate action while creating value for investors and society.
                        </p>
                    </div>

                    {/* Keywords */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-700">Keywords:</span>
                        </div>
                        <p className="text-gray-600">
                            Artificial intelligence adoption, Digital banking services, Industry pressure, stakeholder pressure,
                            Environmental sustainability performance, and Banks.
                        </p>
                    </div>

                    {/* Related Posts */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <h3 className="text-2xl font-bold text-[#393F50] mb-6">
                            Related Blog Posts
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2].map((item) => (
                                <Link key={item} href={`/blog/${item + 1}`}>
                                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                                        <h4 className="font-bold text-[#393F50] mb-2">
                                            Related Blog Post Title {item}
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Brief description of the related blog post...
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
