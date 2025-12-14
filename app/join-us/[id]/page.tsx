'use client'

import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Qualifications from '@/components/join-us/Qualifications'
import InternshipBenefits from '@/components/join-us/InternshipBenefits'
import JobApplicationForm from '@/components/join-us/JobApplicationForm'
import { ArrowLeft, Key } from 'lucide-react'
import { use } from 'react'

const JOB_DETAILS = {
    title: 'HR Intern Positions at ABS Research Academy',
    description: `ABS Research Academy invites applications for three (3) Human Resource Intern positions. These roles offer enthusiastic individuals an excellent opportunity to gain practical HR experience in an international, research-driven organization. As an HR Intern, you will play an integral role in shaping and supporting our growing academic and administrative team, contributing to recruitment, team development, onboarding, and internal communication strategies. This internship is especially suited for those looking to build a career in Human Resources, Organizational Management, or Higher Education Administration.`,
}

const KEY_RESPONSIBILITIES = [
    {
        id: 1,
        icon: '🔑',
        text: 'Assist with recruitment of researchers, interns, ambassadors, and instructors',
    },
    {
        id: 2,
        icon: '🔑',
        text: 'Help manage onboarding processes and internal communications',
    },
    {
        id: 3,
        icon: '🔑',
        text: 'Support in organizing virtual training events, webinars, and team-building sessions',
    },
    {
        id: 4,
        icon: '🔑',
        text: 'Maintain accurate HR records, databases, and intern documentation',
    },
    {
        id: 5,
        icon: '🔑',
        text: 'Promote and implement inclusive and diverse workplace policies',
    },
    {
        id: 6,
        icon: '🔑',
        text: 'Assist in the development of HR policies and manuals',
    },
    {
        id: 7,
        icon: '🔑',
        text: 'Contribute to HR outreach and LinkedIn campaigns',
    },
    {
        id: 8,
        icon: '🔑',
        text: 'Liaise with other departments and provide cross-functional support',
    },
]

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-4 py-16 mt-[120px]">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors px-4 py-2 border border-gray-300 rounded-lg"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </button>

                {/* Job Title and Description */}
                <div className="max-w-5xl mx-auto mb-12">
                    <h1 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-6">
                        {JOB_DETAILS.title}
                    </h1>

                    <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                        {JOB_DETAILS.description}
                    </p>
                </div>

                {/* Key Responsibilities Section */}
                <div className="max-w-6xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                        Key Responsibilities
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {KEY_RESPONSIBILITIES.map((responsibility) => (
                            <div
                                key={responsibility.id}
                                className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl flex-shrink-0">{responsibility.icon}</span>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {responsibility.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Qualifications />

            <InternshipBenefits />

            <JobApplicationForm />

            <Footer />
        </main>
    )
}
