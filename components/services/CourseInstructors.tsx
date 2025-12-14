import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const INSTRUCTORS = [
    {
        id: 1,
        name: 'Dr. Ayesha Rahman',
        title: 'Head of R&D',
        bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.',
        image: '/course1.png', // Placeholder
    },
    {
        id: 2,
        name: 'Prof. Karim Hossain',
        title: 'Lead Sustainability Research',
        bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.',
        image: '/course2.png', // Placeholder
    },
    {
        id: 3,
        name: 'Dr. Tanvir Alam',
        title: 'Director, Emerging Tech',
        bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.',
        image: '/course3.png', // Placeholder
    },
]

export default function CourseInstructors() {
    return (
        <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                Course Instructors
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {INSTRUCTORS.map((instructor, index) => (
                    <div
                        key={instructor.id}
                        className={`bg-white border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row gap-6 ${
                            // Center the last item if it's the only one in the last row (odd number of items)
                            index === INSTRUCTORS.length - 1 && INSTRUCTORS.length % 2 !== 0
                                ? 'md:col-span-2 md:w-2/3 md:mx-auto'
                                : ''
                            }`}
                    >
                        <div className="flex-shrink-0 w-full sm:w-48 h-48 relative rounded-lg overflow-hidden bg-gray-100">
                            <Image
                                src={instructor.image}
                                alt={instructor.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-xl font-bold text-[#393F50]">{instructor.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{instructor.title}</p>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-4">
                                {instructor.bio}
                            </p>

                            <div>
                                <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                    View Profile
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
