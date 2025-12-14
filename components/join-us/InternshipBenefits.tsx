const BENEFITS = [
    {
        id: 1,
        text: 'Remote & Flexible working environment',
    },
    {
        id: 2,
        text: 'Certificate of Internship upon successful completion',
    },
    {
        id: 3,
        text: 'Mentorship and supervision by experienced HR professionals',
    },
    {
        id: 4,
        text: 'Free access to premium training courses (e.g., Scientific Writing, PLS-SEM, Reference Management)',
    },
    {
        id: 5,
        text: 'Performance-based remuneration opportunities during project implementation',
    },
    {
        id: 6,
        text: 'Letter of Recommendation for outstanding performance',
    },
    {
        id: 7,
        text: 'Opportunities for networking, leadership, and long-term engagement within ABS Research Academy',
    },
]

export default function InternshipBenefits() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                        Benefits of the Internship
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {BENEFITS.map((benefit) => (
                            <div
                                key={benefit.id}
                                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {benefit.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
