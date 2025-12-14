'use client'

import { useState, useEffect } from 'react'
import { authenticatedFetch } from '@/lib/auth-client'
import {
    Book,
    Plus,
    Edit,
    Trash2,
    DollarSign,
    Package
} from 'lucide-react'
import Link from 'next/link'

export default function BooksPage() {
    const [books, setBooks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        setLoading(true)
        try {
            const res = await authenticatedFetch('/api/books?limit=50')
            const data = await res.json()
            if (data.success) {
                setBooks(data.data.books)
            }
        } catch (error) {
            console.error('Failed to fetch books', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this book?')) return
        try {
            const res = await authenticatedFetch(`/api/books/${id}`, { method: 'DELETE' })
            if (res.ok) fetchBooks()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Books Inventory</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage books and stock levels</p>
                </div>
                <div className="flex gap-2">
                    <Link
                        href="/admin/orders"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Package className="w-4 h-4" />
                        Manage Orders
                    </Link>
                    <Link
                        href="/admin/books/new"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Book
                    </Link>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading books...</div>
                ) : books.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No books found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Author</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Stock</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {books.map((book) => (
                                    <tr key={book.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {book.coverUrl ? (
                                                    <img src={book.coverUrl} alt="" className="w-10 h-14 object-cover rounded bg-gray-100" />
                                                ) : (
                                                    <div className="w-10 h-14 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                                                        <Book className="w-5 h-5" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-gray-900">{book.title}</p>
                                                    <p className="text-xs text-gray-500">{book.isbn}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{book.author || 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">${book.price}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${book.stock > 10 ? 'bg-green-100 text-green-700' :
                                                    book.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {book.stock} in stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/books/${book.id}`} className="p-1.5 hover:bg-gray-100 rounded text-indigo-600">
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button onClick={() => handleDelete(book.id)} className="p-1.5 hover:bg-gray-100 rounded text-red-600">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
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
