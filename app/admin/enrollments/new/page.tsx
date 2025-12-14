'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authenticatedFetch } from '@/lib/auth-client'
import { ArrowLeft, Save, Loader2, Search } from 'lucide-react'
import Link from 'next/link'

export default function NewEnrollmentPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState<any[]>([])
    const [users, setUsers] = useState<any[]>([])

    // Search states
    const [userSearch, setUserSearch] = useState('')
    const [courseSearch, setCourseSearch] = useState('')

    // Selection
    const [selectedUser, setSelectedUser] = useState('')
    const [selectedCourse, setSelectedCourse] = useState('')

    // Fetch initial data or on search
    useEffect(() => {
        fetchCourses()
        fetchUsers()
    }, [])

    // Debounce effects could be added here for search
    useEffect(() => {
        const timer = setTimeout(() => fetchUsers(userSearch), 500)
        return () => clearTimeout(timer)
    }, [userSearch])

    useEffect(() => {
        const timer = setTimeout(() => fetchCourses(courseSearch), 500)
        return () => clearTimeout(timer)
    }, [courseSearch])

    const fetchCourses = async (search = '') => {
        try {
            const res = await authenticatedFetch(`/api/courses?search=${search}&limit=50`)
            const data = await res.json()
            if (data.success) {
                setCourses(data.data.courses)
            }
        } catch (error) {
            console.error('Failed to fetch courses', error)
        }
    }

    const fetchUsers = async (search = '') => {
        try {
            // Assuming admin users API supports search
            const res = await authenticatedFetch(`/api/admin/users?search=${search}&role=STUDENT&limit=50`)
            const data = await res.json()
            if (data.success) {
                setUsers(data.data.users)
            }
        } catch (error) {
            console.error('Failed to fetch users', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedUser || !selectedCourse) return

        setLoading(true)
        try {
            const res = await authenticatedFetch('/api/enrollments', {
                method: 'POST',
                body: JSON.stringify({
                    userId: selectedUser,
                    courseId: selectedCourse
                })
            })

            const data = await res.json()

            if (res.ok) {
                router.push('/admin/enrollments')
                router.refresh()
            } else {
                alert(data.error || 'Failed to enroll user')
            }
        } catch (error) {
            console.error('Enrollment error:', error)
            alert('Failed to process enrollment')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/admin/enrollments"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Enrollments
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Enroll Student</h1>
                <p className="text-sm text-gray-500 mt-1">Manually enroll a student in a course</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* User Selection */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Select Student</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search student by name or email..."
                                value={userSearch}
                                onChange={(e) => setUserSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none mb-2"
                            />
                        </div>
                        <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
                            {users.map(user => (
                                <label
                                    key={user.id}
                                    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors ${selectedUser === user.userId ? 'bg-indigo-50' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="user"
                                        value={user.userId}
                                        checked={selectedUser === user.userId}
                                        onChange={(e) => setSelectedUser(e.target.value)}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{user.profile?.fullName || 'No Name'}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </label>
                            ))}
                            {users.length === 0 && (
                                <p className="p-3 text-sm text-gray-400 text-center">No students found</p>
                            )}
                        </div>
                    </div>

                    {/* Course Selection */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Select Course</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search course by title..."
                                value={courseSearch}
                                onChange={(e) => setCourseSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none mb-2"
                            />
                        </div>
                        <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
                            {courses.map(course => (
                                <label
                                    key={course.id}
                                    className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors ${selectedCourse === course.id ? 'bg-indigo-50' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="course"
                                        value={course.id}
                                        checked={selectedCourse === course.id}
                                        onChange={(e) => setSelectedCourse(e.target.value)}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{course.title}</p>
                                        <p className="text-xs text-gray-500">{course.level || 'No Level'} • {course.isPaid ? `$${course.price}` : 'Free'}</p>
                                    </div>
                                </label>
                            ))}
                            {courses.length === 0 && (
                                <p className="p-3 text-sm text-gray-400 text-center">No courses found</p>
                            )}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || !selectedUser || !selectedCourse}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Enroll Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
