'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ConsultancyServices from '@/components/services/ConsultancyServices'
import WhyChooseUs from '@/components/services/WhyChooseUs'
import GetInTouch from '@/components/services/GetInTouch'
import { Send } from 'lucide-react'

export default function ConsultancyPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        organization: '',
        services: {
            customResearch: true,
            dataCollection: false,
            policyStrategy: false,
            sustainability: false,
        },
        message: '',
        agreeToTerms: false,
    })

    const handleServiceChange = (service: string) => {
        setFormData({
            ...formData,
            services: {
                ...formData.services,
                [service]: !formData.services[service as keyof typeof formData.services],
            },
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        // Handle form submission
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[80px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    {/* Left Side - Content */}
                    <div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#393F50] mb-6">
                            Research Consultancy Services at ABS Research Academy
                        </h1>

                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                At ABS Research Academy, we offer expert research consultancy services to help businesses, organizations, and academic institutions address complex challenges, gain insights, and achieve their strategic objectives.
                            </p>

                            <p>
                                Our team of experienced researchers and professionals is committed to providing tailored research solutions that drive informed decision-making, innovation, and growth.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Quote Form */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-[#393F50] mb-6">
                            Get a Quote
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            {/* Organization / Institution */}
                            <div>
                                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                                    Organization / Institution
                                </label>
                                <input
                                    type="text"
                                    id="organization"
                                    value={formData.organization}
                                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                    placeholder="Enter your organization / institution name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            {/* Select Service */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Select Service
                                </label>
                                <div className="space-y-3">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.services.customResearch}
                                            onChange={() => handleServiceChange('customResearch')}
                                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">Custom Research Solutions</span>
                                    </label>

                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.services.dataCollection}
                                            onChange={() => handleServiceChange('dataCollection')}
                                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">Data Collection and Analysis</span>
                                    </label>

                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.services.policyStrategy}
                                            onChange={() => handleServiceChange('policyStrategy')}
                                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">Policy and Strategy Development</span>
                                    </label>

                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.services.sustainability}
                                            onChange={() => handleServiceChange('sustainability')}
                                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">Sustainability and Environmental Research</span>
                                    </label>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Enter your message"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                    required
                                />
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={formData.agreeToTerms}
                                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    required
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600">
                                    I agree to the terms and privacy policy
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#393F50] hover:bg-[#2d3240] text-white py-3.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                Send Message
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <ConsultancyServices />
            <WhyChooseUs />
            <GetInTouch />

            <Footer />
        </main>
    )
}
