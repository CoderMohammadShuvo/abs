'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Tag, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { authenticatedFetch } from '@/lib/auth-client'

interface Category {
    id: string
    name: string
    slug: string
    description?: string
    _count?: {
        courseLinks: number
    }
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' })
    const [submitting, setSubmitting] = useState(false)

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const res = await authenticatedFetch('/api/courses/categories')
            const data = await res.json()
            if (data.success) {
                setCategories(data.data)
            }
        } catch (error) {
            console.error('Failed to fetch categories', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        setNewCategory({ ...newCategory, name, slug })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const res = await authenticatedFetch('/api/courses/categories', {
                method: 'POST',
                body: JSON.stringify(newCategory)
            })

            if (res.ok) {
                setNewCategory({ name: '', slug: '', description: '' })
                setIsCreating(false)
                fetchCategories()
            } else {
                const data = await res.json()
                if (data.error) {
                    alert(data.error)
                }
            }
        } catch (error) {
            console.error('Failed to create category', error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Link href="/admin/courses" className="text-gray-400 hover:text-gray-600">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                    </div>
                    <p className="text-sm text-gray-500">Manage course categories and taxonomy</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Category
                </button>
            </div>

            {/* Create Form */}
            {isCreating && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 animate-in fade-in slide-in-from-top-2">
                    <h3 className="font-semibold text-gray-900 mb-4">New Category</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    required
                                    value={newCategory.name}
                                    onChange={handleNameChange}
                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                    placeholder="e.g. Computer Science"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                                <input
                                    required
                                    value={newCategory.slug}
                                    onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                    placeholder="e.g. computer-science"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <input
                                    value={newCategory.description}
                                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                    placeholder="Optional description"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                Create Category
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
                    ))
                ) : categories.map((cat) => (
                    <div key={cat.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <Tag className="w-5 h-5" />
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-indigo-600">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{cat.description || 'No description'}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                            <span>{cat.slug}</span>
                            <span>{cat._count?.courseLinks || 0} Courses</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
