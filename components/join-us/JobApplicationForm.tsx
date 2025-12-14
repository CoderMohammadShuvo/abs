'use client'

import { useState } from 'react'
import { Upload, ArrowRight } from 'lucide-react'

export default function JobApplicationForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        country: '',
        occupation: '',
        biography: '',
        areaOfInterest: '',
        confirmAccurate: false,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Application submitted:', formData)
        // Handle form submission
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-xl mx-auto bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                    <h3 className="text-2xl font-bold text-[#393F50] text-center mb-6">
                        Apply Form
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
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
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
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
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm appearance-none bg-white"
                                required
                            >
                                <option value="">Select your country</option>
                                <option value="usa">United States</option>
                                <option value="uk">United Kingdom</option>
                                <option value="canada">Canada</option>
                                <option value="australia">Australia</option>
                                <option value="bangladesh">Bangladesh</option>
                                <option value="india">India</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Current Occupation */}
                        <div>
                            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-2">
                                Current Occupation
                            </label>
                            <input
                                type="text"
                                id="occupation"
                                value={formData.occupation}
                                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                                placeholder="Enter your current occupation"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                required
                            />
                        </div>

                        {/* Biography */}
                        <div>
                            <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-2">
                                Biography
                            </label>
                            <textarea
                                id="biography"
                                value={formData.biography}
                                onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                                placeholder="Briefly describe your biography"
                                rows={4}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none"
                                required
                            />
                        </div>

                        {/* Upload Resume/CV */}
                        <div>
                            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Resume/CV
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                                <input
                                    type="file"
                                    id="resume"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                />
                                <label htmlFor="resume" className="cursor-pointer">
                                    <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                                    <span className="text-sm text-gray-600">Upload File</span>
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">PDF or DOC, max 5MB</p>
                        </div>

                        {/* Area of Interest */}
                        <div>
                            <label htmlFor="areaOfInterest" className="block text-sm font-medium text-gray-700 mb-2">
                                Area of Interest
                            </label>
                            <select
                                id="areaOfInterest"
                                value={formData.areaOfInterest}
                                onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm appearance-none bg-white"
                                required
                            >
                                <option value="">Select your interest</option>
                                <option value="research">Research</option>
                                <option value="green-finance">Green Finance</option>
                                <option value="digital-banking">Digital Banking</option>
                                <option value="ai">Artificial Intelligence</option>
                                <option value="sustainability">Sustainability</option>
                                <option value="fintech">Fintech</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Confirmation Checkbox */}
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="confirmAccurate"
                                checked={formData.confirmAccurate}
                                onChange={(e) => setFormData({ ...formData, confirmAccurate: e.target.checked })}
                                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                required
                            />
                            <label htmlFor="confirmAccurate" className="text-sm text-gray-600">
                                I confirm that all information provided is accurate.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#393F50] hover:bg-[#2d3240] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            Submit Application
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
