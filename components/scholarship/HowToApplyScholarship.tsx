'use client'

import { useState } from 'react'
import { FileText, FileCheck, Calculator, Mail, FileEdit, Copy } from 'lucide-react'

const APPLICATION_STEPS = [
    {
        id: 1,
        icon: FileText,
        title: 'Complete the Application Form',
        description: 'Fill out our scholarship application form, providing personal details, academic background, and motivation for applying.',
    },
    {
        id: 2,
        icon: FileCheck,
        title: 'Submit Your Academic Transcripts',
        description: 'Include your latest academic transcripts or certificates as proof of your qualifications.',
    },
    {
        id: 3,
        icon: Calculator,
        title: 'Financial Need Statement',
        description: 'Submit a brief statement explaining your financial need and how receiving this scholarship will help you achieve your academic and career goals.',
    },
    {
        id: 4,
        icon: Mail,
        title: 'Letter of Recommendation',
        description: 'Provide one letter of recommendation from an academic or professional reference who can speak to your qualifications and potential.',
    },
    {
        id: 5,
        icon: FileEdit,
        title: 'Personal Statement',
        description: 'Write a personal statement explaining why you want to pursue the specific course, how it aligns with your goals, and how you intend to use the knowledge gained to contribute to the development of your country or field.',
    },
]

export default function HowToApplyScholarship() {
    const [emailCopied, setEmailCopied] = useState(false)

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('scholarship@absresearchacademy.com')
        setEmailCopied(true)
        setTimeout(() => setEmailCopied(false), 2000)
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
                                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <step.icon className="w-8 h-8 text-orange-600" />
                                    </div>
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
                                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <step.icon className="w-8 h-8 text-orange-600" />
                                    </div>
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

                {/* Why Choose Section */}
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-6">
                        Why Choose ABS Research Academy?
                    </h2>

                    <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                        <p>
                            At ABS Research Academy, we are committed to empowering the next generation of researchers
                            and professionals. Through our scholarship program, we aim to break down financial barriers and
                            provide equal opportunities for individuals from developing countries to access world-class
                            education. By providing the tools, knowledge, and skills needed to excel, we help our scholars
                            contribute meaningfully to global development and innovation.
                        </p>

                        <p>
                            If you have a passion for learning and a vision for a better
                            future, we encourage you to apply for one of our scholarships
                            today! For more information or to apply, please contact us at
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg px-6 py-3">
                            <span className="text-sm text-gray-600">Email us: </span>
                            <span className="font-medium text-gray-900">scholarship@absresearchacademy.com</span>
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
