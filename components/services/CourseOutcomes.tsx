import { Book } from 'lucide-react'

const OUTCOMES = [
    'Write and structure scientific papers effectively for publication.',
    'Understand the specific requirements and guidelines of different scientific journals.',
    'Utilize academic language and citation styles to enhance clarity and credibility.',
    'Navigate the submission and revision processes confidently, responding to peer review feedback.',
]

const MENTORING_FEATURES = [
    'One-on-One Guidance with senior researchers',
    'Weekly progress meetings and task tracking',
    'Customized feedback on research documents (proposal, thesis, or manuscript)',
    'Support in identifying international PhD opportunities',
    'Access to PhD-level resources, templates, and samples',
    'Certificate of Completion from ABS Research Academy',
]

export default function CourseOutcomes() {
    return (
        <div className="mt-24 space-y-24">
            {/* Learning Outcomes Section */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#393F50] mb-6">
                    <Book className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-4">
                    Learning Outcomes
                </h2>

                <p className="text-gray-600 mb-12">
                    By the end of the course, participants will be able to
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left max-w-4xl mx-auto">
                    {OUTCOMES.map((outcome, index) => (
                        <div key={index} className="flex gap-3">
                            <span className="text-[#393F50] font-bold">•</span>
                            <p className="text-gray-600 leading-relaxed">{outcome}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mentoring Features Section */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#393F50] mb-6">
                    <Book className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-4">
                    Mentoring Features
                </h2>

                <p className="text-gray-600 mb-12">
                    By the end of the course, participants will be able to
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left max-w-4xl mx-auto">
                    {MENTORING_FEATURES.map((feature, index) => (
                        <div key={index} className="flex gap-3">
                            <span className="text-[#393F50] font-bold">•</span>
                            <p className="text-gray-600 leading-relaxed">{feature}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
