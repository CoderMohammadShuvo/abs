'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authenticatedFetch } from '@/lib/auth-client'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function NewConferencePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [location, setLocation] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [submissionDeadline, setSubmissionDeadline] = useState('')
    const [detailsJson, setDetailsJson] = useState('{\n  "description": "Conference description...",\n  "topics": ["AI", "Blockchain"]\n}')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            let details = {}
            try {
                details = JSON.parse(detailsJson)
            } catch {
                alert('Invalid JSON in Details')
                setLoading(false)
                return
            }

            const res = await authenticatedFetch('/api/conferences', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    slug,
                    location,
                    eventDate: eventDate || undefined,
                    submissionDeadline: submissionDeadline || undefined,
                    details
                })
            })

            if (res.ok) {
                router.push('/admin/conferences')
                router.refresh()
            } else {
                const data = await res.json()
                alert(data.error || 'Failed to create conference')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <Link
                    href="/admin/conferences"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Conferences
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Create Conference</h1>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                        <input
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                            <input
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Submission Deadline</label>
                            <input
                                type="date"
                                value={submissionDeadline}
                                onChange={(e) => setSubmissionDeadline(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Details (JSON)</label>
                        <textarea
                            value={detailsJson}
                            onChange={(e) => setDetailsJson(e.target.value)}
                            rows={5}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none font-mono text-xs"
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading || !title}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Conference
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
