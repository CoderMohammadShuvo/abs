'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authenticatedFetch } from '@/lib/auth-client'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

function NewEntryForm() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Default to EXPENSE if not specified, otherwise use param
    const defaultType = searchParams.get('type') === 'INCOME' ? 'INCOME' : 'EXPENSE'

    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(defaultType)
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await authenticatedFetch('/api/accounts/entries', {
                method: 'POST',
                body: JSON.stringify({
                    type,
                    amount: parseFloat(amount),
                    category,
                    description,
                    recordedAt: date
                })
            })

            if (res.ok) {
                router.push('/admin/accounts')
            } else {
                const data = await res.json()
                alert(data.error || 'Failed to record entry')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg outline-none"
                    >
                        <option value="INCOME">Income</option>
                        <option value="EXPENSE">Expense</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg outline-none"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg outline-none text-xl font-medium"
                    placeholder="0.00"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg outline-none"
                        placeholder={type === 'INCOME' ? 'e.g., Course Sales, Sponsorship' : 'e.g., Server Cost, Marketing'}
                        list="categories"
                    />
                    <datalist id="categories">
                        <option value="Sales" />
                        <option value="Marketing" />
                        <option value="Salary" />
                        <option value="IT Infrastructure" />
                        <option value="Office Supplies" />
                    </datalist>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg outline-none"
                        placeholder="Additional details..."
                    />
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={loading || !amount}
                    className={`flex items-center gap-2 px-6 py-2 text-white rounded-lg text-sm font-medium transition-colors ${type === 'INCOME' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700'
                        }`}
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Record {type === 'INCOME' ? 'Income' : 'Expense'}
                </button>
            </div>
        </form>
    )
}

export default function NewEntryPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <Link
                    href="/admin/accounts"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Accounts
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Record Transaction</h1>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <Suspense fallback={<div>Loading form...</div>}>
                    <NewEntryForm />
                </Suspense>
            </div>
        </div>
    )
}
