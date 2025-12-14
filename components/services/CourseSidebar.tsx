import Image from 'next/image'
import Link from 'next/link'
import { Clock, Layers, FileText, Video, MonitorPlay, FileSpreadsheet, ExternalLink } from 'lucide-react'

interface CourseSidebarProps {
    course: {
        title: string
        image: string
        duration: string
        totalClasses: string
        totalExams: string
        liveClasses: string
        recordedClasses: string
        lectureSheets: string
        price: number
        originalPrice: number
        offerEnds?: string
    }
}

export default function CourseSidebar({ course }: CourseSidebarProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            {/* Course Image */}
            <div className="relative h-48 w-full">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <h3 className="text-white text-xl font-bold">{course.title}</h3>
                </div>
            </div>

            <div className="p-6">
                <h4 className="text-lg font-semibold text-[#393F50] mb-4 border-b border-gray-100 pb-2">
                    {course.title}
                </h4>

                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Course Duration</span>
                        </div>
                        <span className="font-medium text-[#393F50]">{course.duration}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            <span>Total Classes</span>
                        </div>
                        <span className="font-medium text-[#393F50]">{course.totalClasses}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span>Total Exams</span>
                        </div>
                        <span className="font-medium text-[#393F50]">{course.totalExams}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                            <MonitorPlay className="w-4 h-4" />
                            <span>Live Classes</span>
                        </div>
                        <span className="font-medium text-[#393F50]">{course.liveClasses}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            <span>Recorded Classes</span>
                        </div>
                        <span className="font-medium text-[#393F50]">{course.recordedClasses}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                            <FileSpreadsheet className="w-4 h-4" />
                            <span>Lecture Sheets</span>
                        </div>
                        <span className="font-medium text-[#393F50]">{course.lectureSheets}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-bold text-[#393F50]">${course.price}</span>
                        <span className="text-gray-400 line-through text-sm">${course.originalPrice}</span>
                    </div>
                    {course.offerEnds && (
                        <p className="text-red-500 text-xs font-medium">
                            Course offer duration- {course.offerEnds}
                        </p>
                    )}
                </div>

                <Link href="/services/training-courses/register" className="block">
                    <button className="w-full bg-[#393F50] hover:bg-[#2d3240] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                        Enroll Now
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </Link>
            </div>
        </div>
    )
}
