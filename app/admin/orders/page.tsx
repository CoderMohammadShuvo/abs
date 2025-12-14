'use client'

import { useState, useEffect } from 'react'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import {
    Package,
    ArrowLeft,
    CheckCircle,
    XCircle,
    Clock,
    Truck
} from 'lucide-react'
import Link from 'next/link'

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const res = await authenticatedFetch('/api/orders?limit=50')
            const data = await res.json()
            if (data.success) {
                setOrders(data.data.orders)
            }
        } catch (error) {
            console.error('Failed to fetch orders', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await authenticatedFetch(`/api/orders/${id}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus })
            })
            if (res.ok) {
                setOrders(orders.map(o =>
                    o.id === id ? { ...o, status: newStatus } : o
                ))
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/admin/books"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Books
                </Link>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage customer orders</p>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No orders found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs text-gray-600">#{order.id.slice(-6)}</span>
                                            <div className="text-xs text-gray-500 mt-1">{order.items?.length} items</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <p className="font-medium text-gray-900">{order.user?.profile?.fullName || 'Guest'}</p>
                                            <p className="text-xs text-gray-500">{order.user?.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                        order.status === 'PAID' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.total}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{format(new Date(order.createdAt), 'MMM d, yyyy')}</td>
                                        <td className="px-6 py-4 text-right">
                                            {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                                                <div className="flex justify-end gap-2">
                                                    {order.status === 'PENDING' && (
                                                        <button
                                                            onClick={() => updateStatus(order.id, 'PAID')}
                                                            className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-200 hover:bg-blue-100"
                                                        >
                                                            Mark Paid
                                                        </button>
                                                    )}
                                                    {order.status === 'PAID' && (
                                                        <button
                                                            onClick={() => updateStatus(order.id, 'SHIPPED')}
                                                            className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded border border-orange-200 hover:bg-orange-100"
                                                        >
                                                            Ship
                                                        </button>
                                                    )}
                                                    {order.status === 'SHIPPED' && (
                                                        <button
                                                            onClick={() => updateStatus(order.id, 'DELIVERED')}
                                                            className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded border border-green-200 hover:bg-green-100"
                                                        >
                                                            Deliver
                                                        </button>
                                                    )}
                                                </div>
                                            )}
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
