'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authenticatedFetch } from '@/lib/auth-client'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function NewProjectPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title) return

        setLoading(true)
        try {
            const res = await authenticatedFetch('/api/projects', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    description
                })
            })

            if (res.ok) {
                router.push('/admin/projects')
                router.refresh()
            } else {
                alert('Failed to create project')
            }
        } catch (error) {
            console.error('Create project error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <Link
                    href="/admin/projects"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            placeholder="e.g. Website Redesign"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                            placeholder="Project details..."
                        />
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || !title}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
