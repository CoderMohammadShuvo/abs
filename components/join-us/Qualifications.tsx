const QUALIFICATIONS = {
    intro: 'We are looking for candidates who are',
    leftColumn: [
        {
            id: 1,
            title: 'Enrolled in or have completed a degree in:',
            items: [
                'Human Resource Management',
                'Business Administration',
                'Organizational Behavior',
                'Industrial-Organizational Psychology',
                'Public Administration',
            ],
        },
        {
            id: 2,
            text: 'Passionate about academic development and human resources',
        },
    ],
    rightColumn: [
        {
            id: 1,
            text: 'Strong verbal and written communication skills',
        },
        {
            id: 2,
            text: 'Organized, proactive, and self-motivated',
        },
        {
            id: 3,
            text: 'Comfortable working independently in a remote setting',
        },
        {
            id: 4,
            text: 'Prior volunteer or internship experience in HR is a plus',
        },
    ],
}

export default function Qualifications() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-4">
                        Qualifications
                    </h2>

                    <p className="text-center text-gray-700 mb-12">
                        {QUALIFICATIONS.intro}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {QUALIFICATIONS.leftColumn.map((item) => (
                                <div key={item.id}>
                                    {item.title ? (
                                        <div>
                                            <p className="text-gray-700 font-medium mb-3">• {item.title}</p>
                                            <ul className="ml-8 space-y-2">
                                                {item.items?.map((subItem, index) => (
                                                    <li key={index} className="text-gray-700 list-disc">
                                                        {subItem}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <p className="text-gray-700">• {item.text}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            {QUALIFICATIONS.rightColumn.map((item) => (
                                <p key={item.id} className="text-gray-700">
                                    • {item.text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
