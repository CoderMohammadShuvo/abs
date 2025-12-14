import { ClipboardList, FileEdit, MessageSquare } from 'lucide-react'

export default function CourseOverview() {
    return (
        <div className="space-y-12">
            {/* Overview Text */}
            <div>
                <h2 className="text-3xl font-serif text-[#393F50] mb-6">Course Overview</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                        This course is designed to provide researchers, graduate students, and academics with the skills necessary to effectively write and publish scientific papers.
                    </p>
                    <p>
                        The course covers essential components of manuscript writing, focusing on structure, style, and strategies for submitting to high-impact journals.
                    </p>
                    <p>
                        This course is designed to provide researchers, graduate students, and academics with the skills necessary to effectively write and publish scientific papers.
                    </p>
                    <p>
                        The course covers essential components of manuscript writing, focusing on structure, style, and strategies for submitting to high-impact journals.
                    </p>
                </div>
            </div>

            {/* Course Features */}
            <div>
                <h2 className="text-3xl font-serif text-[#393F50] mb-8">Course Features</h2>

                <div className="space-y-8">
                    <div className="flex gap-6">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-[#393F50] flex items-center justify-center">
                                <ClipboardList className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#393F50] mb-2">Peer Review</h3>
                            <p className="text-gray-600">
                                Participants will review each other's drafts to gain insight into the revision process.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-[#393F50] flex items-center justify-center">
                                <FileEdit className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#393F50] mb-2">Practical Assignments</h3>
                            <p className="text-gray-600">
                                Writing exercises focused on drafting sections of a manuscript.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-[#393F50] flex items-center justify-center">
                                <MessageSquare className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#393F50] mb-2">Interactive Discussions</h3>
                            <p className="text-gray-600">
                                Group discussions about common writing challenges and strategies.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
