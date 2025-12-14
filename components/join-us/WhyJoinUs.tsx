import { Users, GraduationCap, TrendingUp, Briefcase } from 'lucide-react'

const WHY_JOIN_US_FEATURES = [
    {
        id: 1,
        icon: Users,
        title: 'Collaborative Research Opportunities',
        description: 'Work alongside a team of experts in fields like green finance, digital banking, AI, sustainability, and environmental policy.',
    },
    {
        id: 2,
        icon: GraduationCap,
        title: 'Training and Development',
        description: 'Access exclusive training courses designed to enhance your skills in academic writing, data analysis, fintech, and more.',
    },
    {
        id: 3,
        icon: TrendingUp,
        title: 'Career Growth',
        description: 'Be a part of a growing organization with plenty of opportunities for career advancement, networking, and professional development.',
    },
    {
        id: 4,
        icon: Briefcase,
        title: 'Impactful Work',
        description: 'Contribute to projects that drive sustainability, technological innovation, and social responsibility in a variety of industries.',
    },
]

export default function WhyJoinUs() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                    Why Join Us?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {WHY_JOIN_US_FEATURES.map((feature) => (
                        <div
                            key={feature.id}
                            className="bg-white rounded-lg border border-gray-200 p-8 text-center hover:shadow-lg transition-shadow"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#393F50] rounded-full mb-6">
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>

                            <h3 className="text-xl font-bold text-[#393F50] mb-4">
                                {feature.title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
