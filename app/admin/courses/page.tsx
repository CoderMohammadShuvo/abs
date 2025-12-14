'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Search,
    Plus,
    MoreVertical,
    BookOpen,
    Users,
    Clock,
    DollarSign,
    Edit,
    Trash2,
    Filter,
    Eye
} from 'lucide-react'
import { format } from 'date-fns'

interface Course {
    id: string
    title: string
    slug: string
    level: string
    price: number
    isPaid: boolean
    thumbnail?: string
    createdAt: string
    _count?: {
        enrollments: number
        modules: number
    }
    teacher?: {
        profile?: {
            fullName: string
        }
    }
}

import { authenticatedFetch } from '@/lib/auth-client'

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [filterLevel, setFilterLevel] = useState('')

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = async (searchQuery = '', level = '') => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (searchQuery) params.append('search', searchQuery)
            if (level) params.append('level', level)

            const res = await authenticatedFetch(`/api/courses?${params.toString()}`)
            const data = await res.json()

            if (data.success) {
                setCourses(data.data.courses)
            }
        } catch (error) {
            console.error('Failed to fetch courses:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        // Debounce could be added here
        fetchCourses(e.target.value, filterLevel)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this course?')) return

        try {
            const res = await authenticatedFetch(`/api/courses/${id}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                fetchCourses(search, filterLevel)
            }
        } catch (error) {
            console.error('Failed to delete course:', error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your course catalog and content</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/courses/categories"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Filter className="w-4 h-4" />
                        Categories
                    </Link>
                    <Link
                        href="/admin/courses/new"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Course
                    </Link>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            value={filterLevel}
                            onChange={(e) => {
                                setFilterLevel(e.target.value)
                                fetchCourses(search, e.target.value)
                            }}
                            className="pl-10 pr-8 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:outline-none appearance-none cursor-pointer"
                        >
                            <option value="">All Levels</option>
                            <option value="BEGINNER">Beginner</option>
                            <option value="INTERMEDIATE">Intermediate</option>
                            <option value="ADVANCED">Advanced</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Courses List */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading courses...</div>
                ) : courses.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                        <p className="text-gray-500 mt-1">Get started by creating your first course.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Course Details</th>
                                    <th className="px-6 py-4">Instructor</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Stats</th>
                                    <th className="px-6 py-4">Created</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {courses.map((course) => (
                                    <tr key={course.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                    {course.thumbnail ? (
                                                        <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <BookOpen className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 line-clamp-1">{course.title}</p>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 mt-1">
                                                        {course.level || 'Unspecified'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700 uppercase">
                                                    {course.teacher?.profile?.fullName?.[0] || 'U'}
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    {course.teacher?.profile?.fullName || 'Unknown'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 text-sm font-medium ${course.isPaid ? 'text-gray-900' : 'text-green-600'}`}>
                                                {course.isPaid ? `$${course.price}` : 'Free'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1" title="Students">
                                                    <Users className="w-4 h-4" />
                                                    {course._count?.enrollments || 0}
                                                </div>
                                                <div className="flex items-center gap-1" title="Modules">
                                                    <BookOpen className="w-4 h-4" />
                                                    {course._count?.modules || 0}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {format(new Date(course.createdAt), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/courses/${course.id}`}
                                                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-indigo-600 transition-colors"
                                                    title="Edit Course"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(course.id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors"
                                                    title="Delete Course"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
