'use client'

import { useState } from 'react'
import { FileText, FileCheck, Calculator, Mail, FileEdit, Upload, Send } from 'lucide-react'

const APPLICATION_STEPS = [
    {
        id: 1,
        icon: '📄',
        title: 'Complete the Application Form',
        description: 'Fill out our scholarship application form, providing personal details, academic background, and motivation for applying.',
    },
    {
        id: 2,
        icon: '📝',
        title: 'Submit Your Academic Transcripts',
        description: 'Include your latest academic transcripts or certificates as proof of your qualifications.',
    },
    {
        id: 3,
        icon: '🧮',
        title: 'Financial Need Statement',
        description: 'Submit a brief statement explaining your financial need and how receiving this scholarship will help you achieve your academic and career goals.',
    },
    {
        id: 4,
        icon: '📧',
        title: 'Letter of Recommendation',
        description: 'Provide one letter of recommendation from an academic or professional reference who can speak to your qualifications and potential.',
    },
    {
        id: 5,
        icon: '📋',
        title: 'Personal Statement',
        description: 'Write a personal statement explaining why you want to pursue the specific course, how it aligns with your goals, and how you intend to use the knowledge gained to contribute to the development of your country or field.',
    },
]

export default function ScholarshipApplicationForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        country: '',
        academicBackground: '',
        agreeToTerms: false,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
    }

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* How to Apply Section */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-4">
                            How to Apply
                        </h2>
                        <p className="text-gray-600">
                            To apply for a scholarship, please follow these steps
                        </p>
                    </div>

                    {/* First 3 steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {APPLICATION_STEPS.slice(0, 3).map((step) => (
                            <div
                                key={step.id}
                                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="text-4xl">{step.icon}</div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500 mb-1">step {step.id}</div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-[#393F50] mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Last 2 steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {APPLICATION_STEPS.slice(3).map((step) => (
                            <div
                                key={step.id}
                                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="text-4xl">{step.icon}</div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500 mb-1">step {step.id}</div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-[#393F50] mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Application Form Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Description */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-6">
                            Apply for the Scholarship: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Fill out the form below to start your application. Make sure to have your
                            academic transcripts, CV, and personal statement ready before submitting.
                        </p>
                    </div>

                    {/* Right Side - Form */}
                    <div className="bg-white rounded-xl border border-gray-200 p-8">
                        <h3 className="text-xl font-bold text-[#393F50] mb-6">Apply Form</h3>

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

                            {/* Country of Residence */}
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                                    Country of Residence
                                </label>
                                <select
                                    id="country"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    required
                                >
                                    <option value="">Select your country</option>
                                    <option value="bangladesh">Bangladesh</option>
                                    <option value="india">India</option>
                                    <option value="pakistan">Pakistan</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Academic Background */}
                            <div>
                                <label htmlFor="academicBackground" className="block text-sm font-medium text-gray-700 mb-2">
                                    Academic Background
                                </label>
                                <textarea
                                    id="academicBackground"
                                    value={formData.academicBackground}
                                    onChange={(e) => setFormData({ ...formData, academicBackground: e.target.value })}
                                    placeholder="Briefly describe your academic history"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                    required
                                />
                            </div>

                            {/* Upload Resume/CV */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Resume/CV
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 mb-1">Upload File</p>
                                    <p className="text-xs text-gray-500">PDF or DOC, max 5MB</p>
                                </div>
                            </div>

                            {/* Upload Others */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload others
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 mb-1">Upload File</p>
                                    <p className="text-xs text-gray-500">PDF or DOC, max 5MB</p>
                                </div>
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
                                    I confirm that all information provided is accurate.
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#393F50] hover:bg-[#2d3240] text-white py-3.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                Submit Application
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
