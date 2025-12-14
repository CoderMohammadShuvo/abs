'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authenticatedFetch } from '@/lib/auth-client'
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

export default function NewBlogPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState('')
    const [type, setType] = useState('BLOG')
    const [thumbnail, setThumbnail] = useState('')
    const [tags, setTags] = useState('') // comma separated

    const generateSlug = (val: string) => {
        return val.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
        if (!slug) setSlug(generateSlug(e.target.value))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean)

            const res = await authenticatedFetch('/api/blogs', {
                method: 'POST',
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
                router.push('/admin/blogs')
                router.refresh()
            } else {
                const data = await res.json()
                alert(data.error || 'Failed to create post')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Link
                    href="/admin/blogs"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blogs
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">New Blog Post</h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-xl border border-gray-200">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            value={title}
                            onChange={handleTitleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none text-lg font-medium"
                            placeholder="Enter post title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={15}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none font-sans"
                            placeholder="Write your content here..."
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Markdown or HTML supported (depending on renderer)</p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                        <h3 className="font-semibold text-gray-900">Publishing</h3>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                            <input
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg outline-none text-sm"
                                placeholder="tech, news, release"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                        <h3 className="font-semibold text-gray-900">Featured Image</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <div className="flex gap-2">
                                <input
                                    value={thumbnail}
                                    onChange={(e) => setThumbnail(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg outline-none text-sm"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                        {thumbnail && (
                            <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                                <img src={thumbnail} className="w-full h-full object-cover" alt="Preview" />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !title || !content}
                        className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Publish Post
                    </button>
                </div>
            </form>
        </div>
    )
}
