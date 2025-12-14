import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { CourseForm } from '../_components/CourseForm'
import { ModuleManager } from '../_components/ModuleManager'

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditCoursePage({ params }: PageProps) {
    const { id } = await params

    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            categories: {
                include: {
                    category: true
                }
            }
        }
    })

    if (!course) {
        notFound()
    }

    // Serialize dates and decimals for client component
    const serializedCourse = {
        ...course,
        price: Number(course.price),
        createdAt: course.createdAt.toISOString(),
        updatedAt: course.updatedAt.toISOString(),
        deletedAt: course.deletedAt ? course.deletedAt.toISOString() : null,
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
                <p className="text-sm text-gray-500 mt-1">Manage course details, curriculum and settings</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Form Area */}
                <div className="xl:col-span-2 space-y-8">
                    <CourseForm initialData={serializedCourse} isEdit />

                    <div className="border-t border-gray-200 pt-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Course Curriculum</h2>
                        <ModuleManager courseId={id} />
                    </div>
                </div>

                {/* Right Sidebar (Analytics or Quick Actions) */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4">Course Status</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Status</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Published
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Students</span>
                                <span className="font-medium text-gray-900">--</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Rating</span>
                                <span className="font-medium text-gray-900">--</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                        <h3 className="font-semibold text-indigo-900 mb-2">Need Help?</h3>
                        <p className="text-sm text-indigo-700 mb-4">Check our documentation for tips on creating engaging courses.</p>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                            View Guide &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
