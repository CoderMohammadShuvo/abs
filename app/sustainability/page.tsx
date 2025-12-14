import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import SustainableDevelopmentGoals from '@/components/sustainability/SustainableDevelopmentGoals'
import { DollarSign, Search, Leaf, BookOpen, Users } from 'lucide-react'

const INITIATIVES = [
    {
        id: 1,
        icon: DollarSign,
        title: 'Promoting Green Finance Education',
        description: 'We offer specialized courses in Green Finance and Sustainable Banking, focusing on the principles and practices that drive environmental sustainability within the financial sector. By educating the next generation of financial leaders, we empower them to integrate sustainability into their business strategies, investments, and lending practices.',
    },
    {
        id: 2,
        icon: Search,
        title: 'Research on Sustainable Development',
        description: 'Our research initiatives focus on green technologies, renewable energy, climate change mitigation, and sustainable finance, addressing pressing global challenges. We aim to contribute to policy frameworks and innovative solutions that accelerate the transition to a low-carbon, circular economy.',
    },
    {
        id: 3,
        icon: Leaf,
        title: 'Eco-friendly Operations',
        description: 'We are committed to reducing our environmental impact by promoting sustainable practices within the academy.',
    },
    {
        id: 4,
        icon: BookOpen,
        title: 'Sustainability in Curriculum',
        description: 'Every course we offer integrates sustainability principles, ensuring that students are equipped with the knowledge to address global environmental challenges in their careers. From sustainable finance to green technology innovations, we prioritize education that aligns with sustainable goals.',
    },
    {
        id: 5,
        icon: Users,
        title: 'Community Engagement',
        description: 'We encourage our students, staff, and faculty to actively participate in community-based sustainability projects. Through workshops, seminars, and outreach programs, we foster a deeper understanding of how individuals and organizations can contribute to a more sustainable future.',
    },
]

export default function SustainabilityPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[80px]">
                {/* Hero Section */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#393F50] mb-6">
                        ABS Research Academy's Commitment to Sustainability
                    </h1>

                    <p className="text-gray-600 leading-relaxed">
                        At ABS Research Academy, sustainability is at the heart of our mission. We recognize the
                        vital role that education, research, and innovation play in fostering a more sustainable
                        future. As an institution, we are committed to promoting sustainable practices and green
                        initiatives within our operations, research, and educational programs.
                    </p>
                </div>

                {/* Our Sustainability Initiatives Section */}
                <div className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-serif text-[#393F50] mb-12">
                        Our Sustainability Initiatives Include
                    </h2>

                    {/* First 2 initiatives in a row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {INITIATIVES.slice(0, 2).map((initiative) => (
                            <div
                                key={initiative.id}
                                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-[#393F50] rounded-full flex items-center justify-center flex-shrink-0">
                                        <initiative.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#393F50] flex-1">
                                        {initiative.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {initiative.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Next 2 initiatives in a row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {INITIATIVES.slice(2, 4).map((initiative) => (
                            <div
                                key={initiative.id}
                                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-[#393F50] rounded-full flex items-center justify-center flex-shrink-0">
                                        <initiative.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#393F50] flex-1">
                                        {initiative.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {initiative.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Last initiative centered */}
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-[#393F50] rounded-full flex items-center justify-center flex-shrink-0">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-[#393F50] flex-1">
                                    {INITIATIVES[4].title}
                                </h3>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {INITIATIVES[4].description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <SustainableDevelopmentGoals />

            <Footer />
        </main>
    )
}
