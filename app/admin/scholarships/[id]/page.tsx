'use client'

import { useState, useEffect, use } from 'react'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import { ArrowLeft, FileText, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

export default function ScholarshipByIdPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [scholarship, setScholarship] = useState<any>(null)
    const [applications, setApplications] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            // 1. Fetch scholarship
            // 2. Fetch applications for this scholarship
            try {
                const [resS, resA] = await Promise.all([
                    authenticatedFetch(`/api/scholarships/${id}`),
                    authenticatedFetch(`/api/applications?scholarshipId=${id}&limit=100`)
                ])

                const dataS = await resS.json()
                const dataA = await resA.json()

                if (dataS.success) setScholarship(dataS.data)
                if (dataA.success) setApplications(dataA.data.applications)

            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    const updateAppStatus = async (appId: string, newStatus: string) => {
        try {
            const res = await authenticatedFetch(`/api/applications/${appId}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus })
            })
            if (res.ok) {
                setApplications(apps => apps.map(app =>
                    app.id === appId ? { ...app, status: newStatus } : app
                ))
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (loading) return <div className="p-12 text-center text-gray-500">Loading details...</div>
    if (!scholarship) return <div className="p-12 text-center">Scholarship not found</div>

    return (
        <div className="space-y-8">
            <div>
                <Link
                    href="/admin/scholarships"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Scholarships
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{scholarship.title}</h1>
                        <p className="text-sm text-gray-500 mt-1">{scholarship.slug}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${scholarship.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {scholarship.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>

            {/* Stats / Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-wrap">{scholarship.eligibilitySummary || 'No summary provided.'}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Details</h3>
                    <div className="space-y-2 text-sm">
                        {scholarship.applicationDetails?.deadline && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Deadline</span>
                                <span className="font-medium">{format(new Date(scholarship.applicationDetails.deadline), 'MMM d, yyyy')}</span>
                            </div>
                        )}
                        {scholarship.applicationDetails?.amount && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Amount</span>
                                <span className="font-medium">${scholarship.applicationDetails.amount}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Applications List */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Applications ({applications.length})</h2>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {applications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No applications yet.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                        <th className="px-6 py-4">Applicant</th>
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
                                                                onClick={() => updateAppStatus(app.id, 'APPROVED')}
                                                                className="p-1.5 hover:bg-green-50 text-green-600 rounded"
                                                                title="Approve"
                                                            >
                                                                <CheckCircle className="w-5 h-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => updateAppStatus(app.id, 'REJECTED')}
                                                                className="p-1.5 hover:bg-red-50 text-red-600 rounded"
                                                                title="Reject"
                                                            >
                                                                <XCircle className="w-5 h-5" />
                                                            </button>
                                                        </>
                                                    )}
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
        </div>
    )
}
