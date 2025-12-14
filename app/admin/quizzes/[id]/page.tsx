'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { authenticatedFetch } from '@/lib/auth-client'
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function EditQuizPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [courses, setCourses] = useState<any[]>([])

    // Form State
    const [title, setTitle] = useState('')
    const [courseId, setCourseId] = useState('')
    const [timeLimit, setTimeLimit] = useState<number | ''>('')
    const [questions, setQuestions] = useState<any[]>([])

    useEffect(() => {
        Promise.all([fetchQuiz(), fetchCourses()])
            .finally(() => setLoading(false))
    }, [id])

    const fetchQuiz = async () => {
        try {
            const res = await authenticatedFetch(`/api/quizzes/${id}`)
            const data = await res.json()
            if (data.success) {
                const quiz = data.data
                setTitle(quiz.title)
                setCourseId(quiz.courseId)
                setTimeLimit(quiz.timeLimit || '')
                setQuestions(quiz.questions || [])
            } else {
                alert('Failed to load quiz')
                router.push('/admin/quizzes')
            }
        } catch (error) {
            console.error('Failed to fetch quiz', error)
        }
    }

    const fetchCourses = async () => {
        try {
            const res = await authenticatedFetch('/api/courses?limit=100')
            const data = await res.json()
            if (data.success) {
                setCourses(data.data.courses)
            }
        } catch (error) {
            console.error('Failed to fetch courses', error)
        }
    }

    const handleQuestionChange = (index: number, field: string, value: any) => {
        const newQuestions = [...questions]
        newQuestions[index] = { ...newQuestions[index], [field]: value }
        setQuestions(newQuestions)
    }

    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        const newQuestions = [...questions]
        const newOptions = [...newQuestions[qIndex].options]
        newOptions[oIndex] = value
        newQuestions[qIndex].options = newOptions
        setQuestions(newQuestions)
    }

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                question: '',
                options: ['', '', '', ''],
                correctAnswer: 0,
                points: 1
            }
        ])
    }

    const removeQuestion = (index: number) => {
        if (questions.length === 1 && questions.length > 0) return
        const newQuestions = [...questions]
        newQuestions.splice(index, 1)
        setQuestions(newQuestions)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !courseId) {
            alert('Please fill in required fields')
            return
        }

        setSaving(true)
        try {
            const res = await authenticatedFetch(`/api/quizzes/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title,
                    courseId,
                    timeLimit: timeLimit ? Number(timeLimit) : undefined,
                    questions
                })
            })

            const data = await res.json()

            if (res.ok) {
                router.push('/admin/quizzes')
                router.refresh()
            } else {
                alert(data.error || 'Failed to update quiz')
            }
        } catch (error) {
            console.error('Update quiz error:', error)
            alert('Failed to update quiz')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div className="p-12 text-center text-gray-500">Loading quiz...</div>
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <Link
                        href="/admin/quizzes"
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Quizzes
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Quiz</h1>
                    <p className="text-sm text-gray-500 mt-1">Update quiz details and questions</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Basic Info */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Quiz Details</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                placeholder="e.g. React Fundamentals"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Course</label>
                                <select
                                    value={courseId}
                                    onChange={(e) => setCourseId(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                >
                                    <option value="">Select a course...</option>
                                    {courses.map(course => (
                                        <option key={course.id} value={course.id}>{course.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit (Minutes)</label>
                                <input
                                    type="number"
                                    value={timeLimit}
                                    onChange={(e) => setTimeLimit(e.target.value === '' ? '' : Number(e.target.value))}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="Optional"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Questions</h3>
                        <button
                            onClick={addQuestion}
                            type="button"
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Question
                        </button>
                    </div>

                    {questions.map((q, qIndex) => (
                        <div key={qIndex} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group">
                            <button
                                onClick={() => removeQuestion(qIndex)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                title="Remove Question"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-700">
                                        {qIndex + 1}
                                    </span>
                                    <div className="flex-1">
                                        <input
                                            value={q.question}
                                            onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
                                            placeholder="Enter question text..."
                                        />
                                    </div>
                                </div>

                                <div className="pl-12 space-y-3">
                                    {q.options.map((option: string, oIndex: number) => (
                                        <div key={oIndex} className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name={`correct-${qIndex}`}
                                                checked={q.correctAnswer === oIndex}
                                                onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer"
                                            />
                                            <input
                                                value={option}
                                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                                className={`flex-1 px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all ${q.correctAnswer === oIndex ? 'border-indigo-500 bg-indigo-50/20' : 'border-gray-200'}`}
                                                placeholder={`Option ${oIndex + 1}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
