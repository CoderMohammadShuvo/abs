'use client'

import { useState } from 'react'
import { Send, Copy } from 'lucide-react'

export default function GetInTouch() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        organization: '',
        services: {
            customResearch: false,
            dataCollection: false,
            policyStrategy: false,
            sustainability: false,
        },
        message: '',
        agreeToTerms: false,
    })

    const [emailCopied, setEmailCopied] = useState(false)

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
    }

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('info@absresearchacademy.com')
        setEmailCopied(true)
        setTimeout(() => setEmailCopied(false), 2000)
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-6">
                        Get in Touch
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        If you're looking to gain deeper insights, make informed decisions, or drive innovation
                        within your organization, ABS Research Academy is here to help. Contact us today to
                        learn more about our research consultancy services and how we can support your goals.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-[#393F50] mb-6">
                        Get a Quote
                    </h3>

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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">Or</span>
                        </div>
                    </div>

                    {/* Email Copy */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-3">Email us at:</p>
                        <button
                            onClick={handleCopyEmail}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#393F50] hover:bg-[#2d3240] text-white rounded-lg font-medium transition-colors"
                        >
                            <span>info@absresearchacademy.com</span>
                            <Copy className="w-4 h-4" />
                        </button>
                        {emailCopied && (
                            <p className="text-sm text-green-600 mt-2">Email copied to clipboard!</p>
                        )}
                    </div>
                </div>

                {/* Bottom Text */}
                <div className="max-w-3xl mx-auto text-center mt-12">
                    <p className="text-gray-600 leading-relaxed">
                        At ABS Research Academy, we believe that knowledge is power—and the right research
                        can unlock incredible opportunities for growth, innovation, and sustainable development.
                        Let us help you achieve your objectives with precision, expertise, and actionable insights.
                    </p>
                </div>
            </div>
        </section>
    )
}
