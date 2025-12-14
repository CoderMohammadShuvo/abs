'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function WelcomingMessage() {
    const [copied, setCopied] = useState(false)
    const email = 'info@absresearchacademy.com'

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-6">
                        We Look Forward to Welcoming You!
                    </h2>

                    <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
                        By joining ABS Research Academy, you'll be part of an innovative, forward-thinking organization dedicated to making a positive difference in the world through research, education, and collaboration. Take the next step in your career or research journey with us!
                    </p>

                    <div className="space-y-4">
                        <p className="text-gray-600 text-sm">
                            If you have any questions or need further assistance, please don't hesitate to reach out to us at
                        </p>

                        <div className="flex items-center justify-center gap-3">
                            <div className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700">
                                Email us: <span className="font-medium">{email}</span>
                            </div>

                            <button
                                onClick={handleCopyEmail}
                                className="flex items-center gap-2 bg-[#393F50] hover:bg-[#2d3240] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy email
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
