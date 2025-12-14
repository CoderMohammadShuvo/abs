'use client'

import { useState, useEffect } from 'react'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import {
    LayoutDashboard,
    ArrowUpCircle,
    ArrowDownCircle,
    DollarSign,
    Plus,
    Trash2,
    TrendingUp,
    Filter
} from 'lucide-react'
import Link from 'next/link'

export default function AccountsPage() {
    const [summary, setSummary] = useState<any>(null)
    const [entries, setEntries] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [resSummary, resEntries] = await Promise.all([
                authenticatedFetch('/api/accounts/summary'),
                authenticatedFetch('/api/accounts/entries?limit=50')
            ])

            const dataSummary = await resSummary.json()
            const dataEntries = await resEntries.json()

            if (dataSummary.success) setSummary(dataSummary.data)
            if (dataEntries.success) setEntries(dataEntries.data.entries)
        } catch (error) {
            console.error('Failed to fetch accounts data', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return
        try {
            const res = await authenticatedFetch(`/api/accounts/entries/${id}`, { method: 'DELETE' })
            if (res.ok) fetchData()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Accounting</h1>
                    <p className="text-sm text-gray-500 mt-1">Financial overview and transactions</p>
                </div>
                <div className="flex gap-2">
                    <Link
                        href="/admin/accounts/new?type=EXPENSE"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-red-600 rounded-lg text-sm font-medium transition-colors"
                    >
                        <ArrowDownCircle className="w-4 h-4" />
                        Add Expense
                    </Link>
                    <Link
                        href="/admin/accounts/new?type=INCOME"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <ArrowUpCircle className="w-4 h-4" />
                        Add Income
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 rounded-lg text-green-600">
                            <ArrowUpCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Income</p>
                            <h3 className="text-2xl font-bold text-gray-900">${summary?.totalIncome?.toLocaleString() || '0'}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-50 rounded-lg text-red-600">
                            <ArrowDownCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Expense</p>
                            <h3 className="text-2xl font-bold text-gray-900">${summary?.totalExpense?.toLocaleString() || '0'}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Net Balance</p>
                            <h3 className={`text-2xl font-bold ${summary?.balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                                ${summary?.balance?.toLocaleString() || '0'}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
                </div>
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading transactions...</div>
                ) : entries.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No transactions recorded yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Description</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Recorded By</th>
                                    <th className="px-6 py-4 text-right">Amount</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {entries.map((entry) => (
                                    <tr key={entry.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {format(new Date(entry.recordedAt), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{entry.description || 'No description'}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                                {entry.category || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {entry.user?.profile?.fullName || 'System'}
                                        </td>
                                        <td className={`px-6 py-4 text-right font-medium ${entry.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                                            {entry.type === 'INCOME' ? '+' : '-'}${entry.amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleDelete(entry.id)} className="p-1.5 hover:bg-gray-100 rounded text-red-500">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
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
