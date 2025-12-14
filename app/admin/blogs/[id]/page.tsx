'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { authenticatedFetch } from '@/lib/auth-client'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState('')
    const [type, setType] = useState('BLOG')
    const [thumbnail, setThumbnail] = useState('')
    const [tags, setTags] = useState('')
    const [comments, setComments] = useState<any[]>([])

    useEffect(() => {
        fetchBlog()
    }, [id])

    const fetchBlog = async () => {
        try {
            const [resBlog, resComments] = await Promise.all([
                authenticatedFetch(`/api/blogs/${id}`),
                authenticatedFetch(`/api/blogs/${id}/comments`)
            ])
            const dataBlog = await resBlog.json()
            const dataComments = await resComments.json()

            if (dataBlog.success) {
                const b = dataBlog.data
                setTitle(b.title)
                setSlug(b.slug)
                setContent(b.content)
                setType(b.type)
                setThumbnail(b.thumbnail || '')
                setTags(b.tags?.join(', ') || '')
            }
            if (dataComments.success) {
                setComments(dataComments.data.comments)
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
            const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean)

            const res = await authenticatedFetch(`/api/blogs/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title,
                    slug,
                    type,
                    content,
                    thumbnail: thumbnail || undefined,
                    tags: tagsArray
                })
            })

            if (res.ok) {
                alert('Updated successfully!')
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

    if (loading) return <div className="p-12 text-center">Loading...</div>

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <Link
                    href="/admin/blogs"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blogs
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none text-lg font-medium"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <textarea
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                rows={15}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none font-sans"
                                required
                            />
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-4">Comments ({comments.length})</h3>
                        <div className="space-y-4 max-h-60 overflow-y-auto">
                            {comments.map(comment => (
                                <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
                                                {comment.user?.profile?.fullName?.[0] || 'U'}
                                            </div>
                                            <span className="text-sm font-medium">{comment.user?.profile?.fullName || 'User'}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{comment.content}</p>
                                </div>
                            ))}
                            {comments.length === 0 && <p className="text-sm text-gray-500">No comments yet.</p>}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                        <h3 className="font-semibold text-gray-900">Settings</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg outline-none"
                            >
                                <option value="BLOG">Blog Post</option>
                                <option value="NEWS">News</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                            <input
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg outline-none text-sm text-gray-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                            <input
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                            <input
                                value={thumbnail}
                                onChange={(e) => setThumbnail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg outline-none text-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Update Post
                    </button>
                </div>
            </form>
        </div>
    )
}
