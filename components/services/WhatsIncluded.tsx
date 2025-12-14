import { Bookmark } from 'lucide-react'

const INCLUDED_FEATURES = [
    'Survey/Questionnaire design support',
    'Data collection (online/offline methods)',
    'Data cleaning & validation',
    'Descriptive statistics (tables, graphs, charts)',
    'Basic report of findings',
]

export default function WhatsIncluded() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                    What's Included
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {INCLUDED_FEATURES.slice(0, 3).map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-gray-200 p-6 flex items-center gap-3 hover:shadow-md transition-shadow"
                        >
                            <Bookmark className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    {INCLUDED_FEATURES.slice(3).map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-gray-200 p-6 flex items-center gap-3 hover:shadow-md transition-shadow"
                        >
                            <Bookmark className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
