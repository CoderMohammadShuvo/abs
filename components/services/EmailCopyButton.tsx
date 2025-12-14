'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function EmailCopyButton() {
    const [copied, setCopied] = useState(false)
    const email = 'info@absresearchacademy.com'

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <div className="px-6 py-3 bg-white border border-gray-200 rounded text-gray-600 font-medium">
                Email us: <span className="text-[#393F50] font-bold">{email}</span>
            </div>
            <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-3 bg-[#393F50] text-white rounded hover:bg-[#2d3240] transition-colors font-medium"
            >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy email'}
            </button>
        </div>
    )
}
