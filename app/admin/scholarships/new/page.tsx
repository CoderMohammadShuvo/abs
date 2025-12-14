'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authenticatedFetch } from '@/lib/auth-client'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function NewScholarshipPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    // Form fields
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [summary, setSummary] = useState('')
    const [deadline, setDeadline] = useState('')
    const [eligibilityJson, setEligibilityJson] = useState('{\n  "minGPA": 3.0,\n  "majors": ["CS", "Engineering"]\n}')
    const [detailsJson, setDetailsJson] = useState('{\n  "amount": 5000,\n  "requirements": ["Essay", "Transcript"]\n}')
    const [isActive, setIsActive] = useState(true)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            let eligibility = {}
            let applicationDetails = {}

            try {
                eligibility = JSON.parse(eligibilityJson)
                applicationDetails = JSON.parse(detailsJson)
            } catch (err) {
                alert('Invalid JSON in Eligibility or Details field')
                setLoading(false)
                return
            }

            // Inject deadline into applicationDetails if present
            if (deadline) {
                applicationDetails = { ...applicationDetails, deadline }
            }

            const res = await authenticatedFetch('/api/scholarships', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    slug,
                    eligibilitySummary: summary,
                    eligibility,
                    applicationDetails,
                    isActive
                })
            })

            const data = await res.json()

            if (res.ok) {
                router.push('/admin/scholarships')
                router.refresh()
            } else {
                alert(data.error || 'Failed to create scholarship')
            }
        } catch (error) {
            console.error('Create error:', error)
            alert('Failed to create scholarship')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <Link
                    href="/admin/scholarships"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Scholarships
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Create New Scholarship</h1>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                            <input
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
                                placeholder="my-scholarship-2024"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Summary (Text)</label>
                        <textarea
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
                            rows={2}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Deadline (Optional)</label>
                        <input
                            type="datetime-local"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full md:w-1/2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Config (JSON)</label>
                            <textarea
                                value={eligibilityJson}
                                onChange={(e) => setEligibilityJson(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono text-xs"
                                rows={6}
                            />
                            <p className="text-xs text-gray-400 mt-1">Advanced criteria structure</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Application Details (JSON)</label>
                            <textarea
                                value={detailsJson}
                                onChange={(e) => setDetailsJson(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono text-xs"
                                rows={6}
                            />
                            <p className="text-xs text-gray-400 mt-1">Benefits, requirements, etc.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                        />
                        <label className="text-sm text-gray-700">Active (Accepting Applications)</label>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || !title}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Create Scholarship
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
