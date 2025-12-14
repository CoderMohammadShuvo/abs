'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhyJoinUs from '@/components/join-us/WhyJoinUs'
import WhoCanJoinUs from '@/components/join-us/WhoCanJoinUs'
import JoiningProcess from '@/components/join-us/JoiningProcess'
import ApplicationForm from '@/components/join-us/ApplicationForm'
import WelcomingMessage from '@/components/join-us/WelcomingMessage'
import { Briefcase, Calendar, Clock, Users, MapPin } from 'lucide-react'
import Link from 'next/link'

const JOB_POSITIONS = [
    {
        id: 1,
        title: 'HR Intern Positions at ABS Research Academy',
        published: '2025-06-01',
        applicationDeadline: 'July 1, 2025',
        jobType: 'Remote | Volunteer',
        startDate: 'August 1, 2025',
        duration: '6-12 months',
        numberOfPositions: 3,
    },
    {
        id: 2,
        title: 'HR Intern Positions at ABS Research Academy',
        published: '2025-06-01',
        applicationDeadline: 'July 1, 2025',
        jobType: 'Remote | Volunteer',
        startDate: 'August 1, 2025',
        duration: '6-12 months',
        numberOfPositions: 3,
    },
    {
        id: 3,
        title: 'HR Intern Positions at ABS Research Academy',
        published: '2025-06-01',
        applicationDeadline: 'July 1, 2025',
        jobType: 'Remote | Volunteer',
        startDate: 'August 1, 2025',
        duration: '6-12 months',
        numberOfPositions: 3,
    },
    {
        id: 4,
        title: 'HR Intern Positions at ABS Research Academy',
        published: '2025-06-01',
        applicationDeadline: 'July 1, 2025',
        jobType: 'Remote | Volunteer',
        startDate: 'August 1, 2025',
        duration: '6-12 months',
        numberOfPositions: 3,
    },
    {
        id: 5,
        title: 'HR Intern Positions at ABS Research Academy',
        published: '2025-06-01',
        applicationDeadline: 'July 1, 2025',
        jobType: 'Remote | Volunteer',
        startDate: 'August 1, 2025',
        duration: '6-12 months',
        numberOfPositions: 3,
    },
    {
        id: 6,
        title: 'HR Intern Positions at ABS Research Academy',
        published: '2025-06-01',
        applicationDeadline: 'July 1, 2025',
        jobType: 'Remote | Volunteer',
        startDate: 'August 1, 2025',
        duration: '6-12 months',
        numberOfPositions: 3,
    },
]

export default function JoinUsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Banner */}
            <div className="relative h-64 flex items-center justify-center mt-[120px] bg-gradient-to-r from-blue-900/90 to-blue-800/90">
                <div className="absolute inset-0 bg-[url('/join-us-hero.jpg')] bg-cover bg-center opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80"></div>
                <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-serif text-white text-center px-4">
                    Join Us at ABS Research Academy!
                </h1>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Section Title */}
                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                    Build Your Career with ABS Research Academy
                </h2>

                {/* Job Positions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {JOB_POSITIONS.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-lg font-bold text-[#393F50] mb-4">
                                {job.title}
                            </h3>

                            <div className="space-y-3 mb-6 text-sm text-gray-600">
                                <div className="flex items-start gap-2">
                                    <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <span className="font-medium">Published:</span> {job.published}
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <span className="font-medium">Application Deadline:</span> {job.applicationDeadline}
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <Briefcase className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <span className="font-medium">Job Type:</span> {job.jobType}
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <span className="font-medium">Start Date:</span> {job.startDate}
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <span className="font-medium">Job Duration:</span> {job.duration}
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <span className="font-medium">Number of Positions:</span> {job.numberOfPositions}
                                    </div>
                                </div>
                            </div>

                            <Link href={`/join-us/${job.id}`}>
                                <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                                    <Briefcase className="w-4 h-4" />
                                    Apply Now
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* See More Button */}
                <div className="text-center">
                    <button className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        <MapPin className="w-5 h-5" />
                        See More
                    </button>
                </div>
            </div>

            <WhyJoinUs />

            <WhoCanJoinUs />

            <JoiningProcess />

            <ApplicationForm />

            <WelcomingMessage />

            <Footer />
        </main>
    )
}
