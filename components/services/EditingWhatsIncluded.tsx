'use client'

import { useState } from 'react'

const SERVICE_TABS = [
    'Academic Writing Editing',
    'Proofreading Services',
    'Formatting Services',
    'Structure and Organization',
    'Specialized Editing for Research Papers and Journals',
]

const FEATURES = [
    {
        id: 1,
        title: 'Grammar and Syntax Correction',
        description: 'We will check and correct any grammatical errors, sentence structures, and syntax issues, ensuring your writing is fluent and clear.',
    },
    {
        id: 2,
        title: 'Clarity and Coherence',
        description: 'Our editors will ensure that your arguments flow logically and your ideas are presented in a clear, cohesive manner.',
    },
    {
        id: 3,
        title: 'Vocabulary and Style Improvement',
        description: 'We will enhance your language by suggesting more appropriate and varied vocabulary, improving readability without altering your original meaning.',
    },
    {
        id: 4,
        title: 'Consistency in Terminology',
        description: 'We ensure that specialized terms, abbreviations, and references are used consistently throughout your document.',
    },
]

export default function EditingWhatsIncluded() {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-8">
                    What's Included
                </h2>

                {/* Service Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {SERVICE_TABS.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`px-4 py-2 text-sm rounded-lg border transition-colors ${activeTab === index
                                    ? 'bg-white text-[#393F50] border-[#393F50] font-medium'
                                    : 'bg-transparent text-gray-600 border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {FEATURES.slice(0, 3).map((feature) => (
                        <div
                            key={feature.id}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-lg font-bold text-[#393F50] mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600">• {feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold text-[#393F50] mb-3">
                            {FEATURES[3].title}
                        </h3>
                        <p className="text-sm text-gray-600">• {FEATURES[3].description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
