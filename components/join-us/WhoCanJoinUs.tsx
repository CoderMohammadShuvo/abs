import { GraduationCap, Briefcase, Users, Handshake } from 'lucide-react'

const WHO_CAN_JOIN = [
    {
        id: 1,
        icon: '👨‍🔬',
        title: 'Researchers & Academics',
        description: 'Join for collaborations, publish papers, access funding.',
    },
    {
        id: 2,
        icon: '💼',
        title: 'Job Seekers & Professionals',
        description: 'Grow careers in green finance, AI, sustainable banking.',
    },
    {
        id: 3,
        icon: '🎓',
        title: 'Students & Early-Career Scholars',
        description: 'Access training, mentorship, scholarships.',
    },
    {
        id: 4,
        icon: '🤝',
        title: 'Partners & Consultants',
        description: 'Collaborate on sustainability, fintech, and policy projects.',
    },
]

export default function WhoCanJoinUs() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                    Who Can Join Us?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {WHO_CAN_JOIN.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="text-5xl mb-4">
                                {item.icon}
                            </div>

                            <h3 className="text-lg font-bold text-[#393F50] mb-3">
                                {item.title}
                            </h3>

                            <p className="text-sm text-gray-600">
                                • {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
