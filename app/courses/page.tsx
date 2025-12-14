import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, BookOpen, Clock, Star, Users } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export default async function CoursesIndexPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const search = typeof params.search === 'string' ? params.search : undefined
    const category = typeof params.category === 'string' ? params.category : undefined

    const where: any = {
        deletedAt: null
    }

    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
        ]
    }

    const courses = await prisma.course.findMany({
        where,
        include: {
            teacher: { include: { profile: true } },
            _count: { select: { modules: true, enrollments: true } }
        },
        orderBy: { createdAt: 'desc' }
    })

    const categories = await prisma.category.findMany()

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-[#1a1b2e] text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Explore Our Courses</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Discover new skills, deepen your passions, and advanced your career with our expert-led courses.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-10">
                {/* Search & Filter Bar */}
                <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-100">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="What do you want to learn?"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium whitespace-nowrap">
                            All Courses
                        </button>
                        {categories.map(cat => (
                            <button key={cat.id} className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg font-medium whitespace-nowrap transition-colors">
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                    {courses.map(course => (
                        <Link href={`/courses/${course.slug}`} key={course.id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="relative aspect-video bg-gray-100 overflow-hidden">
                                {course.thumbnail ? (
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                        <BookOpen className="w-10 h-10 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-900 uppercase tracking-wide">
                                    {course.level || 'Beginner'}
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                    <div className="flex items-center gap-1">
                                        <Users className="w-3.5 h-3.5" />
                                        <span>{course._count.enrollments} Students</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{course.duration || 10}h</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
                                    {course.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden">
                                            {/* Avatar placeholder */}
                                            {course.teacher?.profile?.avatarUrl && <img src={course.teacher.profile.avatarUrl} className="w-full h-full object-cover" />}
                                        </div>
                                        <span className="text-xs font-medium text-gray-700 truncate max-w-[100px]">
                                            {course.teacher?.profile?.fullName || 'Instructor'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm font-bold text-indigo-600">
                                        {course.isPaid ? `$${course.price}` : 'Free'}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
