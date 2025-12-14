'use client'

import { useState } from 'react'
import { FileText, Search, FileEdit, Truck, Copy } from 'lucide-react'

const STEPS = [
    {
        id: 1,
        icon: FileText,
        title: 'Submit Your Document',
        description: 'Simply send us the document you wish to have edited or formatted, along with any specific guidelines or instructions (e.g., preferred style guide or formatting requirements).',
    },
    {
        id: 2,
        icon: Search,
        title: 'Review and Quote',
        description: 'We will review your document and provide a free quote based on the complexity and length of the document.',
    },
    {
        id: 3,
        icon: FileEdit,
        title: 'Editing and Formatting',
        description: 'Once approved, our team will begin the editing and formatting process, working to enhance your document\'s quality and presentation.',
    },
    {
        id: 4,
        icon: Truck,
        title: 'Final Delivery',
        description: 'After completing the editing and formatting, we will send you the polished document, ready for submission or publication.',
    },
]

export default function HowToGetStarted() {
    const [emailCopied, setEmailCopied] = useState(false)

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('info@absresearchacademy.com')
        setEmailCopied(true)
        setTimeout(() => setEmailCopied(false), 2000)
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                    How to Get Started
                </h2>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {STEPS.slice(0, 3).map((step) => (
                        <div
                            key={step.id}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <step.icon className="w-8 h-8 text-[#393F50]" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-gray-500 mb-1">step {step.id}</div>
                                    <h3 className="text-lg font-bold text-[#393F50]">
                                        {step.title}
                                    </h3>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-md mx-auto mb-16">
                    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Truck className="w-8 h-8 text-[#393F50]" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-gray-500 mb-1">step {STEPS[3].id}</div>
                                <h3 className="text-lg font-bold text-[#393F50]">
                                    {STEPS[3].title}
                                </h3>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">{STEPS[3].description}</p>
                    </div>
                </div>

                {/* Get Started Section */}
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-8">
                        Get Started
                    </h2>

                    <div className="flex items-center justify-center gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg px-6 py-3">
                            <span className="text-sm text-gray-600">Email us: </span>
                            <span className="font-medium text-gray-900">info@absresearchacademy.com</span>
                        </div>

                        <button
                            onClick={handleCopyEmail}
                            className="bg-[#393F50] hover:bg-[#2d3240] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <Copy className="w-4 h-4" />
                            Copy email
                        </button>
                    </div>

                    {emailCopied && (
                        <p className="text-sm text-green-600 mt-4">Email copied to clipboard!</p>
                    )}
                </div>
            </div>
        </section>
    )
}
