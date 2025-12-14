'use client'

import Link from 'next/link'
import { FileText } from 'lucide-react'

const SCHOLARSHIPS = [
    {
        id: 1,
        title: 'Scholarship: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        deadline: 'Month 00, 2000',
        studyArea: 'Study area name',
        university: 'University of City',
        sponsor: 'Sponsor name',
    },
    {
        id: 2,
        title: 'Scholarship: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        deadline: 'Month 00, 2000',
        studyArea: 'Study area name',
        university: 'University of City',
        sponsor: 'Sponsor name',
    },
    {
        id: 3,
        title: 'Scholarship: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        deadline: 'Month 00, 2000',
        studyArea: 'Study area name',
        university: 'University of City',
        sponsor: 'Sponsor name',
    },
    {
        id: 4,
        title: 'Scholarship: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        deadline: 'Month 00, 2000',
        studyArea: 'Study area name',
        university: 'University of City',
        sponsor: 'Sponsor name',
    },
    {
        id: 5,
        title: 'Scholarship: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        deadline: 'Month 00, 2000',
        studyArea: 'Study area name',
        university: 'University of City',
        sponsor: 'Sponsor name',
    },
]

export default function AvailableScholarships() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                    Our Available Scholarship
                </h2>

                {/* First 4 scholarships in 2x2 grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {SCHOLARSHIPS.slice(0, 4).map((scholarship) => (
                        <div
                            key={scholarship.id}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-lg font-bold text-[#393F50] mb-4">
                                {scholarship.title}
                            </h3>

                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                {scholarship.description}
                            </p>

                            <div className="space-y-2 mb-4">
                                <div className="text-sm">
                                    <span className="font-semibold text-gray-700">Deadline:</span>{' '}
                                    <span className="text-gray-600">{scholarship.deadline}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="font-semibold text-gray-700">Study area:</span>{' '}
                                    <span className="text-gray-600">{scholarship.studyArea}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="font-semibold text-gray-700">University:</span>{' '}
                                    <span className="text-gray-600">{scholarship.university}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="font-semibold text-gray-700">Sponsor:</span>{' '}
                                    <span className="text-gray-600">{scholarship.sponsor}</span>
                                </div>
                            </div>

                            <Link href={`/scholarship/${scholarship.id}`}>
                                <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    View Details
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* 5th scholarship centered */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold text-[#393F50] mb-4">
                            {SCHOLARSHIPS[4].title}
                        </h3>

                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                            {SCHOLARSHIPS[4].description}
                        </p>

                        <div className="space-y-2 mb-4">
                            <div className="text-sm">
                                <span className="font-semibold text-gray-700">Deadline:</span>{' '}
                                <span className="text-gray-600">{SCHOLARSHIPS[4].deadline}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold text-gray-700">Study area:</span>{' '}
                                <span className="text-gray-600">{SCHOLARSHIPS[4].studyArea}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold text-gray-700">University:</span>{' '}
                                <span className="text-gray-600">{SCHOLARSHIPS[4].university}</span>
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold text-gray-700">Sponsor:</span>{' '}
                                <span className="text-gray-600">{SCHOLARSHIPS[4].sponsor}</span>
                            </div>
                        </div>

                        <Link href={`/scholarship/${SCHOLARSHIPS[4].id}`}>
                            <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <FileText className="w-4 h-4" />
                                View Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
