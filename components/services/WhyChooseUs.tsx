import { Building2, Users, FlaskConical, Globe, Award } from 'lucide-react'

const FEATURES = [
    {
        id: 1,
        icon: Building2,
        title: 'Expertise Across Industries',
        description: 'Our team has extensive experience across various sectors, including finance, technology, healthcare, environmental sustainability, and education, ensuring high-quality, industry-relevant insights.',
    },
    {
        id: 2,
        icon: Users,
        title: 'Tailored Solutions',
        description: 'We work closely with our clients to understand their specific research needs and deliver tailored, actionable insights that drive impact.',
    },
    {
        id: 3,
        icon: FlaskConical,
        title: 'Advanced Research Methods',
        description: 'We use state-of-the-art research methodologies, advanced data analytics, and the latest technology to provide accurate, reliable results.',
    },
    {
        id: 4,
        icon: Globe,
        title: 'Global Reach',
        description: 'With a diverse, multidisciplinary team, we offer research consultancy services to clients around the world, ensuring that solutions are relevant and actionable across different markets and regions.',
    },
    {
        id: 5,
        icon: Award,
        title: 'Commitment to Quality',
        description: 'We are dedicated to maintaining the highest standards of research excellence, ensuring that our clients receive the most accurate and actionable insights.',
    },
]

export default function WhyChooseUs() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                    Why Choose ABS Research Academy?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {FEATURES.slice(0, 3).map((feature) => (
                        <div
                            key={feature.id}
                            className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow"
                        >
                            <div className="w-16 h-16 bg-[#393F50] rounded-full flex items-center justify-center mx-auto mb-4">
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-[#393F50] mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {FEATURES.slice(3).map((feature) => (
                        <div
                            key={feature.id}
                            className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow"
                        >
                            <div className="w-16 h-16 bg-[#393F50] rounded-full flex items-center justify-center mx-auto mb-4">
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-[#393F50] mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
