import { MapPin, GraduationCap, DollarSign, Target, BookOpen } from 'lucide-react'

const CRITERIA = [
    {
        id: 1,
        icon: MapPin,
        title: 'Country of Residence',
        description: 'Applicants must be residents of developing countries (as defined by the United Nations or the World Bank).',
    },
    {
        id: 2,
        icon: GraduationCap,
        title: 'Academic Background',
        description: 'A strong academic record, ideally in fields related to research, business, finance, technology, or sustainability.',
    },
    {
        id: 3,
        icon: DollarSign,
        title: 'Demonstrated Need',
        description: 'Applicants must demonstrate financial need and show how the scholarship will significantly impact their academic and career development.',
    },
    {
        id: 4,
        icon: Target,
        title: 'Commitment to Contributing to Sustainable Development',
        description: 'Preference will be given to applicants who show a passion for research and development in areas such as sustainable finance, technology, environmental sustainability, or digital innovation.',
    },
    {
        id: 5,
        icon: BookOpen,
        title: 'English Proficiency',
        description: 'As courses are conducted in English, applicants must demonstrate proficiency in English, either through prior academic qualifications or other relevant assessments.',
    },
]

export default function EligibilityCriteria() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-4">
                        Eligibility Criteria for Scholarships
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        We invite applications for scholarships for our various training programs. The scholarships
                        are available for individuals from developing countries who meet the following criteria
                    </p>
                </div>

                {/* First 3 criteria in a row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {CRITERIA.slice(0, 3).map((criterion) => (
                        <div
                            key={criterion.id}
                            className="bg-white rounded-lg border border-gray-200 p-8 text-center hover:shadow-md transition-shadow"
                        >
                            <div className="w-20 h-20 bg-[#393F50] rounded-full flex items-center justify-center mx-auto mb-6">
                                <criterion.icon className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#393F50] mb-4">
                                {criterion.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {criterion.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Last 2 criteria in a row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {CRITERIA.slice(3).map((criterion) => (
                        <div
                            key={criterion.id}
                            className="bg-white rounded-lg border border-gray-200 p-8 text-center hover:shadow-md transition-shadow"
                        >
                            <div className="w-20 h-20 bg-[#393F50] rounded-full flex items-center justify-center mx-auto mb-6">
                                <criterion.icon className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#393F50] mb-4">
                                {criterion.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {criterion.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
