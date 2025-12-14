'use client'

import { useState, useEffect } from 'react'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import {
    Activity,
    User,
    Database,
    Clock,
    Search
} from 'lucide-react'

export default function LogsPage() {
    const [logs, setLogs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filterEntity, setFilterEntity] = useState('')

    useEffect(() => {
        fetchLogs()
    }, [])

    const fetchLogs = async (entity?: string) => {
        setLoading(true)
        try {
            let url = '/api/logs?limit=50'
            if (entity) url += `&entity=${entity}`

            const res = await authenticatedFetch(url)
            const data = await res.json()
            if (data.success) {
                setLogs(data.data.logs)
            }
        } catch (error) {
            console.error('Failed to fetch logs', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        fetchLogs(filterEntity)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">System Logs</h1>
                    <p className="text-sm text-gray-500 mt-1">Audit trail and system activity</p>
                </div>
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        value={filterEntity}
                        onChange={(e) => setFilterEntity(e.target.value)}
                        placeholder="Filter by Entity..."
                        className="px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">
                        Filter
                    </button>
                </form>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading logs...</div>
                ) : logs.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No logs found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Action</th>
                                    <th className="px-6 py-4">Entity</th>
                                    <th className="px-6 py-4">Details</th>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${log.action.includes('DELETE') ? 'bg-red-100 text-red-700' :
                                                    log.action.includes('CREATE') ? 'bg-green-100 text-green-700' :
                                                        'bg-blue-100 text-blue-700'
                                                }`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-900">
                                                <Database className="w-3 h-3 text-gray-400" />
                                                {log.entity}
                                            </div>
                                            {log.entityId && <div className="text-xs text-gray-500 font-mono mt-0.5">{log.entityId}</div>}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-600 max-w-xs truncate">
                                            {log.changes ? JSON.stringify(log.changes) : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {log.user?.email || 'System'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {format(new Date(log.occurredAt), 'PPp')}
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
