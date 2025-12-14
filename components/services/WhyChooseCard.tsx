import { LucideIcon } from 'lucide-react'

interface WhyChooseCardProps {
    icon: LucideIcon
    title: string
    description: string
}

export default function WhyChooseCard({
    icon: Icon,
    title,
    description,
}: WhyChooseCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center text-center h-full hover:shadow-lg transition-shadow duration-300 max-w-[350px]">
            <div className="w-16 h-16 rounded-full bg-[#393F50] flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-xl font-semibold text-[#393F50] mb-4">
                {title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
                {description}
            </p>
        </div>
    )
}
