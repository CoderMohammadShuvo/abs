'use client'

import { useState, useEffect } from 'react'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import {
    MessageSquare,
    CheckCircle,
    XCircle,
    Clock,
    User,
    Mail,
    Phone,
    Building
} from 'lucide-react'

export default function ConsultancyRequestsPage() {
    const [requests, setRequests] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchRequests()
    }, [])

    const fetchRequests = async () => {
        setLoading(true)
        try {
            const res = await authenticatedFetch('/api/consultancy/requests?limit=50')
            const data = await res.json()
            if (data.success) {
                setRequests(data.data.requests)
            }
        } catch (error) {
            console.error('Failed to fetch requests', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await authenticatedFetch(`/api/consultancy/requests/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus })
            })
            if (res.ok) {
                setRequests(requests.map(r =>
                    r.id === id ? { ...r, status: newStatus } : r
                ))
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Consultancy Requests</h1>
                <p className="text-sm text-gray-500 mt-1">Manage inquiries and service requests</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading requests...</div>
                ) : requests.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No requests found.</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {requests.map((req) => (
                            <div key={req.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col lg:flex-row justify-between gap-6">
                                    <div className="space-y-4 flex-1">
                                        <div className="flex flex-wrap gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-gray-900 font-medium">
                                                <User className="w-4 h-4 text-gray-400" />
                                                {req.name}
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                {req.email}
                                            </div>
                                            {req.phone && (
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                    {req.phone}
                                                </div>
                                            )}
                                            {req.company && (
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <Building className="w-4 h-4 text-gray-400" />
                                                    {req.company}
                                                </div>
                                            )}
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 leading-relaxed border border-gray-100">
                                            {req.message}
                                        </div>

                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                            <Clock className="w-3.5 h-3.5" />
                                            {format(new Date(req.createdAt), 'PPpp')}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3 min-w-[140px]">
                                        <div className={`
                                            inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                                            ${req.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                                req.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'}
                                        `}>
                                            {req.status === 'APPROVED' && <CheckCircle className="w-3.5 h-3.5" />}
                                            {req.status === 'REJECTED' && <XCircle className="w-3.5 h-3.5" />}
                                            {req.status === 'PENDING' && <Clock className="w-3.5 h-3.5" />}
                                            {req.status}
                                        </div>

                                        {req.status === 'PENDING' && (
                                            <div className="flex gap-2 mt-auto">
                                                <button
                                                    onClick={() => updateStatus(req.id, 'REJECTED')}
                                                    className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                                                >
                                                    Reject
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(req.id, 'APPROVED')}
                                                    className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                                                >
                                                    Approve
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
