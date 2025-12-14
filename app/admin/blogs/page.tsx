'use client'

import { useState, useEffect } from 'react'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import {
    Newspaper,
    Plus,
    Tag,
    Eye,
    MessageSquare,
    Edit,
    Trash2
} from 'lucide-react'
import Link from 'next/link'

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const res = await authenticatedFetch('/api/blogs?limit=50')
            const data = await res.json()
            if (data.success) {
                setBlogs(data.data.blogs)
            }
        } catch (error) {
            console.error('Failed to fetch blogs', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return

        try {
            const res = await authenticatedFetch(`/api/blogs/${id}`, {
                method: 'DELETE'
            })
            if (res.ok) fetchBlogs()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blogs & News</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage articles and updates</p>
                </div>
                <Link
                    href="/admin/blogs/new"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Post
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(blog => (
                    <div key={blog.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                        {blog.thumbnail ? (
                            <div className="h-48 w-full bg-gray-100 overflow-hidden relative">
                                <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${blog.type === 'NEWS' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
                                        {blog.type}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="h-48 w-full bg-gray-100 flex items-center justify-center relative">
                                <Newspaper className="w-12 h-12 text-gray-300" />
                                <div className="absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded text-xs font-bold text-gray-600">{blog.type}</div>
                            </div>
                        )}

                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                            <div className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1">{blog.content.substring(0, 150)}...</div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {blog.tags?.slice(0, 3).map((tag: string) => (
                                    <span key={tag} className="flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
                                        <Tag className="w-3 h-3" /> {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                <span className="text-xs text-gray-500">{format(new Date(blog.createdAt), 'MMM d, yyyy')}</span>
                                <div className="flex items-center gap-3 text-gray-500 text-xs">
                                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {blog.viewCount}</span>
                                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {blog._count?.comments || 0}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/admin/blogs/${blog.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1">
                                <Edit className="w-3.5 h-3.5" /> Edit
                            </Link>
                            <div className="h-4 w-px bg-gray-300 mx-2"></div>
                            <button
                                onClick={() => handleDelete(blog.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {blogs.length === 0 && !loading && (
                <div className="text-center py-12 text-gray-500">No blog posts found.</div>
            )}
        </div>
    )
}
