'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import EditingWhatsIncluded from '@/components/services/EditingWhatsIncluded'
import EditingWhyChoose from '@/components/services/EditingWhyChoose'
import HowToGetStarted from '@/components/services/HowToGetStarted'
import { ArrowLeft, FileEdit, BookOpen, Languages, BarChart3 } from 'lucide-react'

const PLAN_TABS = [
    { id: 'editing', label: 'English Editing', icon: FileEdit },
    { id: 'publication', label: 'Publication Support', icon: BookOpen },
    { id: 'translation', label: 'Academic Translation', icon: Languages },
    { id: 'analysis', label: 'Statistical Analysis', icon: BarChart3 },
]

const PRICING_PLANS = [
    {
        id: 'basic',
        title: 'Basic Editing',
        features: [
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
        ],
        price: 1400,
        originalPrice: 2000,
    },
    {
        id: 'advanced',
        title: 'Advanced Editing',
        features: [
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
        ],
        price: 1400,
        originalPrice: 2000,
    },
    {
        id: 'premium',
        title: 'Premium Editing',
        features: [
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
        ],
        price: 1400,
        originalPrice: 2000,
    },
]

export default function EnglishEditingPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('editing')

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
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#393F50] mb-6">
                        English Editing and Formatting Services
                    </h1>

                    <div className="space-y-4 text-gray-600 leading-relaxed">
                        <p>
                            At ABS Research Academy, we understand the importance of clear, well-structured, and
                            professionally presented documents, especially in academic and research contexts.
                            Our English Editing and Formatting Services are designed to enhance the quality of your
                            written work, ensuring that it meets the highest standards of clarity, coherence, and
                            academic rigor.
                        </p>

                        <p>
                            Whether you are working on a research paper, thesis, dissertation, academic journal
                            article, or business report, our team of expert editors and proofreaders will assist you in
                            refining your document to ensure it is error-free, properly structured, and aligned with the
                            required formatting guidelines.
                        </p>
                    </div>
                </div>

                {/* Plan Section */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-8">
                        Plan
                    </h2>

                    {/* Plan Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {PLAN_TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-colors ${activeTab === tab.id
                                    ? 'bg-[#393F50] text-white border-[#393F50]'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PRICING_PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-xl font-bold text-[#393F50] mb-6">
                                    {plan.title}
                                </h3>

                                <div className="mb-6">
                                    <p className="text-sm text-gray-600 mb-4">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
                                    </p>

                                    <ul className="space-y-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex gap-2 text-sm text-gray-600">
                                                <span className="text-[#393F50] font-bold">•</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-sm text-gray-600">Service fee:</span>
                                        <span className="text-2xl font-bold text-[#393F50]">${plan.price}</span>
                                        <span className="text-sm text-gray-400 line-through">${plan.originalPrice}</span>
                                    </div>
                                </div>

                                <button className="w-full bg-[#393F50] hover:bg-[#2d3240] text-white py-3 rounded-lg font-medium transition-colors">
                                    Buy Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <EditingWhatsIncluded />
            <EditingWhyChoose />
            <HowToGetStarted />

            <Footer />
        </main>
    )
}
