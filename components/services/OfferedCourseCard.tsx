import { LucideIcon } from 'lucide-react'

interface OfferedCourseCardProps {
    title: string
    description: string
    icon: LucideIcon
    keyTopics: string[]
    targetAudience: string[]
}

export default function OfferedCourseCard({
    title,
    description,
    icon: Icon,
    keyTopics,
    targetAudience,
}: OfferedCourseCardProps) {
    return (
        <div className="min-w-[350px] max-w-[400px] bg-white rounded-xl border border-gray-200 p-6 flex flex-col h-full shrink-0">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#393F50] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#393F50] leading-tight">
                    {title}
                </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {description}
            </p>

            {/* Key Topics */}
            <div className="border border-gray-200 rounded-lg p-4 mb-6 flex-grow">
                <h4 className="text-sm font-semibold text-[#393F50] mb-3">Key Topics</h4>
                <ul className="space-y-2">
                    {keyTopics.map((topic, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                            <span>{topic}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Target Audience */}
            <div>
                <h4 className="text-sm font-semibold text-[#393F50] mb-3">Target Audience</h4>
                <div className="flex flex-wrap gap-2">
                    {targetAudience.map((audience, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-600 bg-white"
                        >
                            {audience}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
