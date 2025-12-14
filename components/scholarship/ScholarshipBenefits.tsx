import { FolderOpen, Heart, Award, Users } from 'lucide-react'

const BENEFITS = [
    {
        id: 1,
        icon: FolderOpen,
        title: 'Free Access to All Course Materials',
        description: 'Participants will have full access to all course content, including lectures, readings, assignments, and any additional resources.',
    },
    {
        id: 2,
        icon: Heart,
        title: 'Mentorship',
        description: 'Access to expert guidance from instructors and industry leaders to help enhance your skills and understanding of the subject.',
    },
    {
        id: 3,
        icon: Award,
        title: 'Certification',
        description: 'Successful completion of the course will result in the issuance of an official certificate, which can be added to your academic or professional portfolio.',
    },
    {
        id: 4,
        icon: Users,
        title: 'Networking Opportunities',
        description: 'Connect with fellow scholars and professionals from around the world, and build a network of like-minded individuals in your field.',
    },
]

export default function ScholarshipBenefits() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-4">
                        Scholarship Benefits
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        The ABS Research Academy Scholarship covers the full course fees for one of our training
                        programs. The scholarship includes
                    </p>
                </div>

                {/* First 3 benefits in a row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {BENEFITS.slice(0, 3).map((benefit) => (
                        <div
                            key={benefit.id}
                            className="bg-white rounded-lg border border-gray-200 p-8 text-center hover:shadow-md transition-shadow"
                        >
                            <div className="w-20 h-20 bg-[#393F50] rounded-full flex items-center justify-center mx-auto mb-6">
                                <benefit.icon className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#393F50] mb-4">
                                {benefit.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* 4th benefit centered */}
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center hover:shadow-md transition-shadow">
                        <div className="w-20 h-20 bg-[#393F50] rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[#393F50] mb-4">
                            {BENEFITS[3].title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {BENEFITS[3].description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
