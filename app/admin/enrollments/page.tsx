'use client'

import { useState, useEffect } from 'react'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import {
    Search,
    BookOpen,
    User,
    CheckCircle,
    XCircle,
    Clock,
    Filter,
    Plus
} from 'lucide-react'
import Link from 'next/link'

interface Enrollment {
    id: string
    progress: number
    paid: boolean
    enrolledAt: string
    user: {
        profile?: {
            fullName: string
        }
        email: string
    }
    course: {
        title: string
        slug: string
    }
}

export default function EnrollmentsPage() {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchEnrollments()
    }, [])

    const fetchEnrollments = async (searchQuery = '') => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            // Note: Currently API doesn't support search largely, but we can pass it if we add support later
            // or we filter client side if needed, but better to request standard list
            const res = await authenticatedFetch(`/api/enrollments?${params.toString()}`)
            const data = await res.json()

            if (data.success) {
                setEnrollments(data.data.enrollments)
            }
        } catch (error) {
            console.error('Failed to fetch enrollments:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Enrollments</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage student course enrollments</p>
                </div>
                <Link
                    href="/admin/enrollments/new"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Enroll Student
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search student or course..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    />
                </div>
            </div>

            {/* List */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading enrollments...</div>
                ) : enrollments.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No enrollments found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Course</th>
                                    <th className="px-6 py-4">Progress</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Enrolled Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {enrollments.map((enrollment) => (
                                    <tr key={enrollment.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700">
                                                    {enrollment.user.profile?.fullName?.[0] || enrollment.user.email[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{enrollment.user.profile?.fullName || 'Unknown'}</p>
                                                    <p className="text-xs text-gray-500">{enrollment.user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-700">{enrollment.course.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-full max-w-[100px] h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-indigo-600 rounded-full"
                                                        style={{ width: `${enrollment.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-gray-600 font-medium">{Math.round(enrollment.progress)}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {enrollment.paid ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                    Paid
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {format(new Date(enrollment.enrolledAt), 'MMM d, yyyy')}
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
