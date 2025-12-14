const WHY_CHOOSE_FEATURES = [
    {
        id: 1,
        title: 'Expert Editors',
        description: 'Our team consists of experienced academic editors with advanced degrees in various fields, ensuring high-quality, specialized editing for your documents.',
    },
    {
        id: 2,
        title: 'Attention to Detail',
        description: 'We focus on every aspect of your document, from the smallest grammatical errors to the overall structure and presentation.',
    },
    {
        id: 3,
        title: 'Timely Delivery',
        description: 'We understand the importance of deadlines and provide quick turnaround times while maintaining the highest standards of quality.',
    },
    {
        id: 4,
        title: 'Confidentiality and Integrity',
        description: 'We treat all documents with strict confidentiality and respect, ensuring your intellectual property is protected.',
    },
    {
        id: 5,
        title: 'Affordable Rates',
        description: 'We offer competitive pricing for editing and formatting services, providing high-quality results at an affordable cost.',
    },
]

export default function EditingWhyChoose() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12 max-w-4xl mx-auto">
                    Why Choose ABS Research Academy's English Editing and Formatting Services?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {WHY_CHOOSE_FEATURES.slice(0, 3).map((feature) => (
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {WHY_CHOOSE_FEATURES.slice(3).map((feature) => (
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
            </div>
        </section>
    )
}
