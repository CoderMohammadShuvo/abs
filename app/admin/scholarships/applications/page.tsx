'use client'

import { useState, useEffect } from 'react'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import { ArrowLeft, Download, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        setLoading(true)
        try {
            const res = await authenticatedFetch('/api/applications?limit=100')
            const data = await res.json()
            if (data.success) {
                setApplications(data.data.applications)
            }
        } catch (error) {
            console.error('Failed to fetch applications', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await authenticatedFetch(`/api/applications/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus })
            })
            if (res.ok) {
                // Optimistic update
                setApplications(apps => apps.map(app =>
                    app.id === id ? { ...app, status: newStatus } : app
                ))
            }
        } catch (error) {
            console.error('Failed to update status', error)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/admin/scholarships"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Scholarships
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Scholarship Applications</h1>
                <p className="text-sm text-gray-500 mt-1">Review all student applications</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading applications...</div>
                ) : applications.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No applications found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Applicant</th>
                                    <th className="px-6 py-4">Scholarship</th>
                                    <th className="px-6 py-4">Applied Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{app.user?.profile?.fullName || 'Unknown User'}</p>
                                            <p className="text-xs text-gray-500">{app.user?.email}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {app.scholarship?.title || 'Deleted Scholarship'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {format(new Date(app.createdAt), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${app.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                                    app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {app.status === 'PENDING' && (
                                                    <>
                                                        <button
                                                            onClick={() => updateStatus(app.id, 'APPROVED')}
                                                            className="p-1.5 hover:bg-green-50 text-green-600 rounded"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(app.id, 'REJECTED')}
                                                            className="p-1.5 hover:bg-red-50 text-red-600 rounded"
                                                            title="Reject"
                                                        >
                                                            <XCircle className="w-5 h-5" />
                                                        </button>
                                                    </>
                                                )}
                                                {/* Details button? */}
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
