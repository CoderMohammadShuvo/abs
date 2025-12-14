import { GraduationCap, BookOpen, Users, UserPlus, FileEdit } from 'lucide-react'

const AUDIENCE = [
    {
        icon: GraduationCap,
        text: 'Final-year undergraduate',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
    },
    {
        icon: BookOpen,
        text: "Master's students planning for PhD",
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
    },
    {
        icon: Users,
        text: 'Early-career researchers needing research supervision',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
    },
    {
        icon: UserPlus,
        text: 'Anyone seeking mentorship in the research journey',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
    },
    {
        icon: FileEdit,
        text: 'Academics preparing their PhD proposals or manuscripts',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
    },
]

export default function WhoShouldJoin() {
    return (
        <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                Who Should Join?
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
                {AUDIENCE.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-start gap-4 hover:shadow-md transition-shadow w-full md:w-[calc(33.333%-16px)] min-w-[280px]"
                    >
                        <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                            <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <p className="text-gray-600 font-medium">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
