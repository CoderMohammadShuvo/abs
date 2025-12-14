import Image from 'next/image'
import { Quote } from 'lucide-react'

const TESTIMONIALS = [
    {
        id: 1,
        name: 'John Doe',
        role: 'PhD Candidate, University of Oxford',
        quote: "This course was a game-changer for my research career. The structured approach to scientific writing helped me publish my first paper in a high-impact journal. The mentorship was invaluable.",
        image: '/testimonial-1.png',
    },
    // Add more testimonials here if needed
]

export default function CourseTestimonials() {
    return (
        <div className="mt-24">
            <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                What Our Students Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TESTIMONIALS.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative"
                    >
                        <Quote className="absolute top-8 right-8 w-8 h-8 text-blue-100" />

                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#393F50]">{testimonial.name}</h3>
                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                        </div>

                        <p className="text-gray-600 italic leading-relaxed">
                            "{testimonial.quote}"
                        </p>
                    </div>
                ))}

                {/* Placeholder for more testimonials to show grid layout */}
                <div className="bg-gray-50 p-8 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center text-center">
                    <p className="text-gray-400">More success stories coming soon...</p>
                </div>
            </div>
        </div>
    )
}
