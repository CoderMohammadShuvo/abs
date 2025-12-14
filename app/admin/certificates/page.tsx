'use client'

import { useState, useEffect } from 'react'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import {
    Search,
    Award,
    Calendar,
    Download,
    ExternalLink
} from 'lucide-react'

interface Certificate {
    id: string
    certId: string
    issuedAt: string
    user: {
        profile?: {
            fullName: string
        }
        email: string
    }
    course: {
        title: string
    }
}

export default function CertificatesPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchCertificates()
    }, [])

    const fetchCertificates = async (searchQuery = '') => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (searchQuery) params.append('search', searchQuery)

            const res = await authenticatedFetch(`/api/certificates?${params.toString()}`)
            const data = await res.json()

            if (data.success) {
                setCertificates(data.data.certificates)
            }
        } catch (error) {
            console.error('Failed to fetch certificates:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        fetchCertificates(e.target.value)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
                    <p className="text-sm text-gray-500 mt-1">View and manage issued certificates</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Certificate ID..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    />
                </div>
            </div>

            {/* List */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading certificates...</div>
                ) : certificates.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No certificates found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Certificate ID</th>
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Course</th>
                                    <th className="px-6 py-4">Issued Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {certificates.map((cert) => (
                                    <tr key={cert.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 font-mono text-sm text-indigo-600">
                                                <Award className="w-4 h-4" />
                                                {cert.certId}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700">
                                                    {cert.user?.profile?.fullName?.[0] || cert.user?.email?.[0]?.toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{cert.user?.profile?.fullName || 'Unknown'}</p>
                                                    <p className="text-xs text-gray-500">{cert.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {cert.course?.title || 'Unknown Course'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {format(new Date(cert.issuedAt), 'MMM d, yyyy')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={`/certificates/${cert.certId}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-indigo-600 transition-colors"
                                                    title="View Public Verification"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
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
