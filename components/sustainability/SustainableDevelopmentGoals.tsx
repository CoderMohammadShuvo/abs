"use client"
import Image from 'next/image'

const SDG_GOALS = [
    { id: 1, title: 'SDG 1: No Poverty', count: '0 Documents', icon: '🏘️' },
    { id: 2, title: 'SDG 2: Zero Hunger', count: '0 Journal', icon: '🌾' },
    { id: 3, title: 'SDG 3: Good Health and Well-being', count: '0 Journal', icon: '🏥' },
    { id: 4, title: 'SDG 4: Quality Education', count: '0 Journal', icon: '📚' },
    { id: 5, title: 'SDG 5: Gender Equality', count: '0 Journal', icon: '⚖️' },
    { id: 6, title: 'SDG 6: Clean Water and Sanitation', count: '0 Journal', icon: '💧' },
    { id: 7, title: 'SDG 7: Affordable and Clean Energy', count: '0 Journal', icon: '⚡' },
    { id: 8, title: 'SDG 8: Decent Work and Economic Growth', count: '0 Journal', icon: '📈' },
    { id: 9, title: 'SDG 9: Industry, Innovation and Infrastructure', count: '0 Journal', icon: '🏗️' },
    { id: 10, title: 'SDG 10: Reduced Inequalities', count: '0 Journal', icon: '🤝' },
    { id: 11, title: 'SDG 11: Sustainable Cities and Communities', count: '0 Journal', icon: '🏙️' },
    { id: 12, title: 'SDG 12: Responsible Consumption and Production', count: '0 Journal', icon: '♻️' },
    { id: 13, title: 'SDG 13: Climate Action', count: '0 Journal', icon: '🌍' },
    { id: 14, title: 'SDG 14: Life Below Water', count: '0 Journal', icon: '🐠' },
    { id: 15, title: 'SDG 15: Life on Land', count: '0 Journal', icon: '🌳' },
    { id: 16, title: 'SDG 16: Peace, Justice and Strong Institutions', count: '0 Journal', icon: '⚖️' },
    { id: 17, title: 'SDG 17: Partnerships for the Goals', count: '0 Journal', icon: '🤝' },
]

export default function SustainableDevelopmentGoals() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* SDG Logo */}
                <div className="text-center mb-12">
                    <div className="inline-block">
                        <Image
                            src="/sdg-logo.png"
                            alt="Sustainable Development Goals"
                            width={400}
                            height={100}
                            className="mx-auto"
                            onError={(e) => {
                                // Fallback if image doesn't exist
                                e.currentTarget.style.display = 'none'
                            }}
                        />
                        {/* Fallback text if image doesn't load */}
                        <div className="text-2xl md:text-3xl font-bold text-blue-600 mt-4">
                            SUSTAINABLE DEVELOPMENT GOALS
                        </div>
                    </div>
                </div>

                {/* SDG Goals List */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {SDG_GOALS.map((goal) => (
                        <div
                            key={goal.id}
                            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                                    {goal.icon}
                                </div>
                                <h3 className="text-base font-medium text-gray-700">
                                    {goal.title}
                                </h3>
                            </div>
                            <span className="text-sm text-gray-500">{goal.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
