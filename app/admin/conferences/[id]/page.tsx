'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function ConferenceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [conference, setConference] = useState<any>(null)
    const [submissions, setSubmissions] = useState<any[]>([])

    // Edit Form
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [location, setLocation] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [submissionDeadline, setSubmissionDeadline] = useState('')
    const [detailsJson, setDetailsJson] = useState('{}')

    useEffect(() => {
        fetchData()
    }, [id])

    const fetchData = async () => {
        try {
            const [resConf, resSub] = await Promise.all([
                authenticatedFetch(`/api/conferences/${id}`),
                authenticatedFetch(`/api/conference-submissions?conferenceId=${id}`)
            ])
            const dataConf = await resConf.json()
            const dataSub = await resSub.json()

            if (dataConf.success) {
                const c = dataConf.data
                setConference(c)
                setTitle(c.title)
                setSlug(c.slug)
                setLocation(c.location || '')
                setEventDate(c.eventDate ? c.eventDate.split('T')[0] : '')
                setSubmissionDeadline(c.submissionDeadline ? c.submissionDeadline.split('T')[0] : '')
                setDetailsJson(JSON.stringify(c.details || {}, null, 2))
            }

            if (dataSub.success) {
                setSubmissions(dataSub.data.submissions)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            let details = {}
            try {
                details = JSON.parse(detailsJson)
            } catch {
                alert('Invalid JSON')
                return
            }

            const res = await authenticatedFetch(`/api/conferences/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title,
                    slug,
                    location,
                    eventDate: eventDate || null,
                    submissionDeadline: submissionDeadline || null,
                    details
                })
            })

            if (res.ok) {
                alert('Conference updated!')
                fetchData()
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (loading) return <div className="p-12 text-center text-gray-500">Loading...</div>
    if (!conference) return <div className="p-12 text-center">Conference not found</div>

    return (
        <div className="space-y-8">
            <div>
                <Link
                    href="/admin/conferences"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Conferences
                </Link>
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Manage Conference</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Edit Form */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h2 className="text-lg font-semibold mb-4">Edit Details</h2>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                            <input
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                                <input
                                    type="date"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Submission Deadline</label>
                                <input
                                    type="date"
                                    value={submissionDeadline}
                                    onChange={(e) => setSubmissionDeadline(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Details (JSON)</label>
                            <textarea
                                value={detailsJson}
                                onChange={(e) => setDetailsJson(e.target.value)}
                                rows={5}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none font-mono text-xs"
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                Update Changes
                            </button>
                        </div>
                    </form>
                </div>

                {/* Submissions List */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 h-fit">
                    <h2 className="text-lg font-semibold mb-4">Paper Submissions ({submissions.length})</h2>
                    {submissions.length === 0 ? (
                        <div className="text-gray-500 text-sm">No submissions yet.</div>
                    ) : (
                        <div className="space-y-4">
                            {submissions.map(sub => (
                                <div key={sub.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <h4 className="font-medium text-gray-900">{sub.formData?.paperTitle || 'Untitled Paper'}</h4>
                                    <p className="text-xs text-gray-500 mt-1">By {sub.user?.profile?.fullName} ({sub.user?.email})</p>
                                    <p className="text-xs text-gray-500 mt-1">Submitted: {format(new Date(sub.createdAt), 'MMM d, yyyy')}</p>

                                    <div className="flex gap-2 mt-3">
                                        <a
                                            href={sub.formData?.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-indigo-600 font-medium hover:underline"
                                        >
                                            View Paper
                                        </a>
                                        {/* Status actions could go here */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
