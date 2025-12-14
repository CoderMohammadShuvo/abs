'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { authenticatedFetch } from '@/lib/auth-client'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [author, setAuthor] = useState('')
    const [price, setPrice] = useState('0')
    const [stock, setStock] = useState('0')
    const [description, setDescription] = useState('')
    const [isbn, setIsbn] = useState('')
    const [coverUrl, setCoverUrl] = useState('')

    useEffect(() => {
        fetchBook()
    }, [id])

    const fetchBook = async () => {
        try {
            const res = await authenticatedFetch(`/api/books/${id}`)
            const data = await res.json()
            if (data.success) {
                const b = data.data
                setTitle(b.title)
                setSlug(b.slug)
                setAuthor(b.author || '')
                setPrice(b.price.toString())
                setStock(b.stock.toString())
                setDescription(b.description || '')
                setIsbn(b.isbn || '')
                setCoverUrl(b.coverUrl || '')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const res = await authenticatedFetch(`/api/books/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title,
                    slug,
                    author,
                    price: parseFloat(price),
                    stock: parseInt(stock),
                    description,
                    isbn,
                    coverUrl: coverUrl || undefined
                })
            })

            if (res.ok) {
                alert('Book updated!')
            } else {
                const data = await res.json()
                alert(data.error || 'Failed to update')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-12 text-center text-gray-500">Loading...</div>

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <Link
                    href="/admin/books"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Books
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Edit Book</h1>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                            <input
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                            <input
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                            <input
                                type="number"
                                min="0"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                            <input
                                value={isbn}
                                onChange={(e) => setIsbn(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cover URL</label>
                            <input
                                value={coverUrl}
                                onChange={(e) => setCoverUrl(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Update Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
