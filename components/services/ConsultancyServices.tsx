import { FileSearch, BarChart3, FileText, Leaf, BookOpen } from 'lucide-react'

const SERVICES = [
    {
        id: 1,
        icon: FileSearch,
        title: 'Custom Research Solutions',
        description: 'We understand that each organization has unique research needs. Whether you are exploring new markets, seeking to understand consumer behavior, or analyzing industry trends, we offer customized research solutions designed to meet your specific goals. Our services include:',
        keyPoints: [
            'Market and industry analysis',
            'Competitive benchmarking and strategic insights',
            'Feasibility studies and business planning',
            'Consumer behavior analysis',
            'Sector-specific reports and trends',
        ],
    },
    {
        id: 2,
        icon: BarChart3,
        title: 'Data Collection and Analysis',
        description: 'Effective research relies on high-quality data. We provide comprehensive data collection and analysis services to ensure that your research is based on accurate, reliable, and actionable information. We use both qualitative and quantitative research methods, including:',
        keyPoints: [
            'Surveys, interviews, and focus groups',
            'Statistical analysis and econometric modeling',
            'Content and thematic analysis',
            'Big data and machine learning analytics',
        ],
    },
    {
        id: 3,
        icon: FileText,
        title: 'Policy and Strategy Development',
        description: 'Our consultancy team helps organizations and governments develop evidence-based policies and strategies that align with their objectives and drive sustainable growth. We work closely with stakeholders to provide actionable recommendations on:',
        keyPoints: [
            'Public policy development',
            'Corporate social responsibility (CSR) strategies',
            'Sustainability and green finance',
            'Economic development and growth strategies',
            'Environmental impact assessments',
        ],
    },
    {
        id: 4,
        icon: Leaf,
        title: 'Sustainability and Environmental Research',
        description: 'We specialize in providing research consultancy services focused on environmental sustainability and green finance. Our team offers insights and solutions to help organizations integrate sustainable practices into their operations. Services include:',
        keyPoints: [
            'Climate risk assessments and adaptation strategies',
            'Green finance solutions, including ESG (Environmental, Social, Governance) reporting',
            'Environmental impact assessments',
            'Renewable energy and energy efficiency research',
            'Policy frameworks for sustainable development',
        ],
    },
    {
        id: 5,
        icon: BookOpen,
        title: 'English Editing and Formatting Services',
        description: 'We understand the importance of clear, well-structured, and professionally presented documents, especially in academic and research contexts.',
        keyPoints: [
            'Academic writing editing and clarity improvement',
            'Proofreading for grammar, spelling, and consistency',
            'Journal- and publisher-specific formatting (APA, MLA, Chicago, etc.)',
            'Structural editing for logical flow and strong sections',
            'Specialized research paper and journal submission readiness',
        ],
    },
]

export default function ConsultancyServices() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                    Our research consultancy services
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {SERVICES.slice(0, 4).map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-[#393F50] rounded-full flex items-center justify-center flex-shrink-0">
                                    <service.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-[#393F50] flex-1">
                                    {service.title}
                                </h3>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                {service.description}
                            </p>

                            <div className="mb-6">
                                <p className="font-semibold text-gray-700 text-sm mb-3">Key Points</p>
                                <ul className="space-y-2">
                                    {service.keyPoints.map((point, index) => (
                                        <li key={index} className="flex gap-2 text-sm text-gray-600">
                                            <span className="text-[#393F50] font-bold">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <FileSearch className="w-4 h-4" />
                                View Details
                            </button>
                        </div>
                    ))}
                </div>

                {/* English Editing Service - Full Width */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#393F50] rounded-full flex items-center justify-center flex-shrink-0">
                            {/* < SERVICES[4].icon className="w-6 h-6 text-white" /> */}
                        </div>
                        <h3 className="text-xl font-bold text-[#393F50] flex-1">
                            {SERVICES[4].title}
                        </h3>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {SERVICES[4].description}
                    </p>

                    <div className="mb-6">
                        <p className="font-semibold text-gray-700 text-sm mb-3">Key Points</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {SERVICES[4].keyPoints.map((point, index) => (
                                <li key={index} className="flex gap-2 text-sm text-gray-600">
                                    <span className="text-[#393F50] font-bold">•</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button className="py-2 px-6 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mx-auto">
                        <FileSearch className="w-4 h-4" />
                        View Details
                    </button>
                </div>

                {/* Read More Button */}
                <div className="text-center mt-8">
                    <button className="py-2 px-8 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mx-auto">
                        <FileSearch className="w-4 h-4" />
                        Read More
                    </button>
                </div>
            </div>
        </section>
    )
}
