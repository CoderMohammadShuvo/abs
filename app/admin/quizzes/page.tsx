'use client'

import { useState, useEffect } from 'react'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import {
    Search,
    Plus,
    BookOpen,
    Clock,
    MoreVertical,
    Edit,
    Trash2,
    Eye
} from 'lucide-react'
import Link from 'next/link'

interface Quiz {
    id: string
    title: string
    type: string
    timeLimit?: number
    questions: any[]
    createdAt: string
    course?: {
        title: string
    }
}

export default function QuizzesPage() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchQuizzes()
    }, [])

    const fetchQuizzes = async (courseId = '') => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (courseId) params.append('courseId', courseId)

            const res = await authenticatedFetch(`/api/quizzes?${params.toString()}`)
            const data = await res.json()

            if (data.success) {
                setQuizzes(data.data.quizzes)
            }
        } catch (error) {
            console.error('Failed to fetch quizzes:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this quiz?')) return

        try {
            const res = await authenticatedFetch(`/api/quizzes/${id}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                fetchQuizzes()
            }
        } catch (error) {
            console.error('Failed to delete quiz:', error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quizzes</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage course quizzes and assessments</p>
                </div>
                <Link
                    href="/admin/quizzes/new"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Create Quiz
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search quizzes..." // Note: Search backend impl pending, UI only for now
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    />
                </div>
            </div>

            {/* List */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading quizzes...</div>
                ) : quizzes.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No quizzes found</h3>
                        <p className="text-gray-500 mt-1">Create a quiz to assess student learning.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Quiz Title</th>
                                    <th className="px-6 py-4">Course</th>
                                    <th className="px-6 py-4">Questions</th>
                                    <th className="px-6 py-4">Time Limit</th>
                                    <th className="px-6 py-4">Created</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {quizzes.map((quiz) => (
                                    <tr key={quiz.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{quiz.title}</p>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 mt-1">
                                                {quiz.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {quiz.course?.title || 'Unassigned'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {Array.isArray(quiz.questions) ? quiz.questions.length : 0}
                                        </td>
                                        <td className="px-6 py-4">
                                            {quiz.timeLimit ? (
                                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                    <Clock className="w-4 h-4" />
                                                    {quiz.timeLimit}m
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-400">No limit</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {format(new Date(quiz.createdAt), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/quizzes/${quiz.id}`}
                                                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-indigo-600 transition-colors"
                                                    title="Edit Quiz"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(quiz.id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600 transition-colors"
                                                    title="Delete Quiz"
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
