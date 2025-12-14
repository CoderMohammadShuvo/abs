'use client'

import { useState, useEffect } from 'react'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import {
    Calendar,
    Plus,
    MapPin,
    MoreVertical,
    Edit,
    Trash2,
    Users
} from 'lucide-react'
import Link from 'next/link'

export default function ConferencesPage() {
    const [conferences, setConferences] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchConferences()
    }, [])

    const fetchConferences = async () => {
        setLoading(true)
        try {
            const res = await authenticatedFetch('/api/conferences?limit=50')
            const data = await res.json()
            if (data.success) {
                setConferences(data.data.conferences)
            }
        } catch (error) {
            console.error('Failed to fetch conferences', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return

        try {
            const res = await authenticatedFetch(`/api/conferences/${id}`, {
                method: 'DELETE'
            })
            if (res.ok) fetchConferences()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Conferences</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage conference events and submissions</p>
                </div>
                <Link
                    href="/admin/conferences/new"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Conference
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {conferences.map(conf => (
                    <div key={conf.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div className="flex gap-2">
                                <Link href={`/admin/conferences/${conf.id}`} className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
                                    <Edit className="w-4 h-4" />
                                </Link>
                                <button onClick={() => handleDelete(conf.id)} className="p-1.5 hover:bg-gray-100 rounded text-red-500">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{conf.title}</h3>

                        <div className="space-y-2 text-sm text-gray-500 mb-4">
                            {conf.eventDate && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {format(new Date(conf.eventDate), 'PPP')}
                                </div>
                            )}
                            {conf.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {conf.location}
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                            <Link
                                href={`/admin/conferences/${conf.id}?tab=submissions`}
                                className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:underline"
                            >
                                <Users className="w-4 h-4" />
                                View Submissions
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {conferences.length === 0 && !loading && (
                <div className="text-center py-12 text-gray-500">No conferences found.</div>
            )}
        </div>
    )
}
