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
    Briefcase,
    FileText
} from 'lucide-react'
import Link from 'next/link'

export default function ScholarshipsPage() {
    const [scholarships, setScholarships] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchScholarships()
    }, [])

    const fetchScholarships = async () => {
        setLoading(true)
        try {
            const res = await authenticatedFetch('/api/scholarships?limit=50')
            const data = await res.json()

            if (data.success) {
                setScholarships(data.data.scholarships)
            }
        } catch (error) {
            console.error('Failed to fetch scholarships:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Scholarships</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage scholarships and view applications</p>
                </div>
                <div className="flex gap-2">
                    <Link
                        href="/admin/scholarships/applications"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                        <FileText className="w-4 h-4" />
                        All Applications
                    </Link>
                    <Link
                        href="/admin/scholarships/new"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Scholarship
                    </Link>
                </div>
            </div>

            {/* List */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading scholarships...</div>
                ) : scholarships.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No scholarships found</h3>
                        <p className="text-gray-500 mt-1">Create a scholarship to start receiving applications.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Slug</th>
                                    <th className="px-6 py-4">Applications</th>
                                    <th className="px-6 py-4">Created</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {scholarships.map((scholarship) => (
                                    <tr key={scholarship.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{scholarship.title}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {scholarship.slug}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {scholarship._count?.applications || 0}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {format(new Date(scholarship.createdAt), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${scholarship.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {scholarship.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/scholarships/${scholarship.id}`}
                                                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                            >
                                                View
                                            </Link>
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
