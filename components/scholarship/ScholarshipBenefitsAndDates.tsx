import { DollarSign, BookOpen, Users, Award, Globe } from 'lucide-react'

const BENEFITS = [
    {
        id: 1,
        icon: '💰',
        title: 'Full tuition covered',
    },
    {
        id: 2,
        icon: '📚',
        title: 'Free access to all course materials',
    },
    {
        id: 3,
        icon: '👨‍🏫',
        title: 'Expert mentorship from academics and professionals',
    },
    {
        id: 4,
        icon: '📜',
        title: 'Certificate of Completion recognized internationally',
    },
    {
        id: 5,
        icon: '🌐',
        title: 'Global networking opportunities with peers and scholars',
    },
]

const APPLICATION_DATES = [
    {
        date: 'Applications Open',
        starts: '1 Feb 2025',
        ends: '15 March 2025',
    },
    {
        date: 'Review Period',
        starts: '25 March 2025',
        ends: '31 March 2025',
    },
    {
        date: 'Results Announced',
        starts: '1 April 2025',
        ends: '',
    },
]

export default function ScholarshipBenefitsAndDates() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Benefits Section */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                        Benefits
                    </h2>

                    {/* First 3 benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {BENEFITS.slice(0, 3).map((benefit) => (
                            <div
                                key={benefit.id}
                                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="text-4xl mb-4">{benefit.icon}</div>
                                <p className="text-sm text-gray-700">{benefit.title}</p>
                            </div>
                        ))}
                    </div>

                    {/* Last 2 benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        {BENEFITS.slice(3).map((benefit) => (
                            <div
                                key={benefit.id}
                                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="text-4xl mb-4">{benefit.icon}</div>
                                <p className="text-sm text-gray-700">{benefit.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Application Dates Section */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                        Application dates
                    </h2>

                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                                            Date
                                        </th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                                            Starts
                                        </th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                                            Ends
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {APPLICATION_DATES.map((item, index) => (
                                        <tr
                                            key={index}
                                            className={index !== APPLICATION_DATES.length - 1 ? 'border-b border-gray-200' : ''}
                                        >
                                            <td className="py-4 px-6 text-sm text-gray-700">{item.date}</td>
                                            <td className="py-4 px-6 text-sm text-gray-700">{item.starts}</td>
                                            <td className="py-4 px-6 text-sm text-gray-700">{item.ends}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
