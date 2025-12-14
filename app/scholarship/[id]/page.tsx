'use client'

import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ScholarshipBenefitsAndDates from '@/components/scholarship/ScholarshipBenefitsAndDates'
import ScholarshipApplicationForm from '@/components/scholarship/ScholarshipApplicationForm'
import TermsAndConditions from '@/components/scholarship/TermsAndConditions'
import Image from 'next/image'
import { ArrowLeft, Target, DollarSign, Clock } from 'lucide-react'
import { use } from 'react'

export default function ScholarshipDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
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
                    {/* Left Side - Image */}
                    <div className="relative h-[300px] rounded-2xl overflow-hidden border border-gray-200 bg-white p-8 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-32 h-32 mx-auto mb-4 relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
                                        <span className="text-4xl">🎓</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-blue-900">SCHOLARSHIP</h3>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-6">
                            Scholarship: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        </h1>

                        <p className="text-gray-600 leading-relaxed">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>

                {/* Details and Contact Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side - Scholarship Details */}
                    <div className="bg-white rounded-xl border border-gray-200 p-8">
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                <span className="text-sm font-semibold text-gray-700">Application:</span>
                                <span className="text-sm text-gray-600">Open</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                <span className="text-sm font-semibold text-gray-700">Deadline:</span>
                                <span className="text-sm text-gray-600">15 March 2025</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                <span className="text-sm font-semibold text-gray-700">Study area:</span>
                                <span className="text-sm text-gray-600">Study area name</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                <span className="text-sm font-semibold text-gray-700">University:</span>
                                <span className="text-sm text-gray-600">University of City</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                <span className="text-sm font-semibold text-gray-700">Sponsor:</span>
                                <span className="text-sm text-gray-600">Sponsor name</span>
                            </div>
                        </div>

                        {/* Scholarship Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Target className="w-5 h-5 text-gray-600" />
                                </div>
                                <h4 className="text-xs font-semibold text-gray-700 mb-2">Scholarship focus:</h4>
                                <p className="text-xs text-gray-600">Aboriginal and/or Torres Strait Islander, Academic excellence</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <DollarSign className="w-5 h-5 text-gray-600" />
                                </div>
                                <h4 className="text-xs font-semibold text-gray-700 mb-2">Scholarship Value:</h4>
                                <p className="text-xs text-gray-600">Living stipend of $48,400 per annum (2025 rate), indexed annually, your tuition fees covered</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-5 h-5 text-gray-600" />
                                </div>
                                <h4 className="text-xs font-semibold text-gray-700 mb-2">Scholarship duration:</h4>
                                <p className="text-xs text-gray-600">PhD: 4 years, MPhil: 2 years</p>
                            </div>
                        </div>

                        {/* Eligibility Criteria */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-sm font-bold text-[#393F50] mb-4">Eligibility Criteria</h3>
                            <ul className="space-y-2">
                                <li className="flex gap-2 text-sm text-gray-600">
                                    <span className="text-[#393F50] font-bold">•</span>
                                    <span>Resident of a developing country</span>
                                </li>
                                <li className="flex gap-2 text-sm text-gray-600">
                                    <span className="text-[#393F50] font-bold">•</span>
                                    <span>Strong academic background in research-related fields</span>
                                </li>
                                <li className="flex gap-2 text-sm text-gray-600">
                                    <span className="text-[#393F50] font-bold">•</span>
                                    <span>Demonstrated financial need</span>
                                </li>
                                <li className="flex gap-2 text-sm text-gray-600">
                                    <span className="text-[#393F50] font-bold">•</span>
                                    <span>Commitment to sustainable development goals</span>
                                </li>
                                <li className="flex gap-2 text-sm text-gray-600">
                                    <span className="text-[#393F50] font-bold">•</span>
                                    <span>Proficiency in English</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side - Contact Us */}
                    <div className="bg-white rounded-xl border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-[#393F50] mb-6">
                            Contact us
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Email us:</p>
                                <a
                                    href="mailto:scholarship@absresearchacademy.com"
                                    className="text-lg font-medium text-[#393F50] hover:text-blue-600 transition-colors"
                                >
                                    scholarship@absresearchacademy.com
                                </a>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-2">Call:</p>
                                <a
                                    href="tel:+8801112233443"
                                    className="text-lg font-medium text-[#393F50] hover:text-blue-600 transition-colors"
                                >
                                    +880 1112233443
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ScholarshipBenefitsAndDates />
            <ScholarshipApplicationForm />
            <TermsAndConditions />

            <Footer />
        </main>
    )
}
