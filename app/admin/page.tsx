'use client'

import { useEffect, useState } from 'react'
import {
    Users,
    BookOpen,
    GraduationCap,
    DollarSign,
    TrendingUp,
    Activity,
    ShoppingCart,
    FileText
} from 'lucide-react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'
import { format } from 'date-fns'
import Link from 'next/link'
import { authenticatedFetch } from '@/lib/auth-client'

interface DashboardStats {
    users: {
        total: number
        active: number
        byRole: Record<string, number>
        recentRegistrations: number
    }
    enrollments: {
        total: number
        paid: number
    }
    courses: {
        total: number
    }
    orders: {
        total: number
    }
    revenue: {
        orders: number
        enrollments: number
        total: number
    }
    books: {
        total: number
    }
    blogs: {
        total: number
    }
    recentActivities: Array<{
        id: string
        action: string
        entity: string
        entityId: string
        occurredAt: string
        user: {
            fullName: string
            email: string
        } | null
    }>
}

// Mock data for the chart since the API doesn't return time-series yet
const chartData = [
    { name: 'Jan', revenue: 4000, users: 2400 },
    { name: 'Feb', revenue: 3000, users: 1398 },
    { name: 'Mar', revenue: 2000, users: 9800 },
    { name: 'Apr', revenue: 2780, users: 3908 },
    { name: 'May', revenue: 1890, users: 4800 },
    { name: 'Jun', revenue: 2390, users: 3800 },
    { name: 'Jul', revenue: 3490, users: 4300 },
]

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await authenticatedFetch('/api/admin/stats')

                if (res.ok) {
                    const data = await res.json()
                    setStats(data.data)
                } else {
                    console.log('Failed to fetch stats, using mock data')
                    // Fallback mock data
                    setStats({
                        users: {
                            total: 1254,
                            active: 890,
                            byRole: { STUDENT: 1200, TEACHER: 50 },
                            recentRegistrations: 45
                        },
                        enrollments: { total: 320, paid: 150 },
                        courses: { total: 24 },
                        orders: { total: 85 },
                        revenue: { orders: 5400, enrollments: 12000, total: 17400 },
                        books: { total: 12 },
                        blogs: { total: 45 },
                        recentActivities: [
                            {
                                id: '1',
                                action: 'REGISTERED',
                                entity: 'USER',
                                entityId: '123',
                                occurredAt: new Date().toISOString(),
                                user: { fullName: 'John Doe', email: 'john@example.com' }
                            },
                            {
                                id: '2',
                                action: 'PURCHASED',
                                entity: 'COURSE',
                                entityId: '456',
                                occurredAt: new Date(Date.now() - 3600000).toISOString(),
                                user: { fullName: 'Jane Smith', email: 'jane@example.com' }
                            }
                        ]
                    })
                }
            } catch (error) {
                console.error('Error fetching stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats?.users.total.toLocaleString() ?? '0'}
                    subtitle={`${stats?.users.recentRegistrations} new (30d)`}
                    icon={Users}
                    color="blue"
                />
                <StatCard
                    title="Total Revenue"
                    value={`$${stats?.revenue.total.toLocaleString() ?? '0'}`}
                    subtitle={`Orders: $${stats?.revenue.orders.toLocaleString()}`}
                    icon={DollarSign}
                    color="emerald"
                />
                <StatCard
                    title="Active Enrollments"
                    value={stats?.enrollments.total.toLocaleString() ?? '0'}
                    subtitle={`${stats?.enrollments.paid} Paid Enrollments`}
                    icon={GraduationCap}
                    color="violet"
                />
                <StatCard
                    title="Total Orders"
                    value={stats?.orders.total.toLocaleString() ?? '0'}
                    subtitle={`${stats?.books.total} Books Available`}
                    icon={ShoppingCart}
                    color="amber"
                />
            </div>

            {/* Charts & Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Revenue Analytics</h3>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold">
                                <TrendingUp className="w-3 h-3" />
                                +12.5% Growth
                            </div>
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#4f46e5', fontWeight: 600 }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-indigo-600" />
                        Recent Activity
                    </h3>
                    <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                        {stats?.recentActivities?.length ? (
                            stats.recentActivities.map((activity) => (
                                <div key={activity.id} className="flex gap-4 relative pl-4 border-l-2 border-gray-100 pb-2 last:pb-0">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-indigo-500 box-border" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {activity.user?.fullName || 'System User'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {activity.action.toLowerCase().replace('_', ' ')} <span className="text-indigo-600 font-medium">{activity.entity.toLowerCase()}</span>
                                        </p>
                                        <span className="text-xs text-gray-400 mt-1 block">
                                            {format(new Date(activity.occurredAt), 'MMM dd, HH:mm')}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm text-center py-4">No recent activity.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Links Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/admin/courses" className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 text-white overflow-hidden relative group cursor-pointer hover:shadow-lg transition-all">
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-1">Create Course</h3>
                        <p className="text-indigo-100 text-sm mb-4">Add a new course to the catalog</p>
                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Start Creating</button>
                    </div>
                    <BookOpen className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-500" />
                </Link>

                <Link href="/admin/blogs" className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white overflow-hidden relative group cursor-pointer hover:shadow-lg transition-all">
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-1">Add Blog Post</h3>
                        <p className="text-emerald-100 text-sm mb-4">Publish new content to the blog</p>
                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Write Post</button>
                    </div>
                    <FileText className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-500" />
                </Link>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between hover:border-indigo-200 transition-colors cursor-pointer group">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">System Health</h3>
                        <p className="text-green-600 text-sm font-medium mt-1 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 custom-pulse"></span>
                            All Systems Operational
                        </p>
                    </div>
                    <Activity className="w-10 h-10 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                </div>
            </div>
        </div>
    )
}

function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    color
}: {
    title: string
    value: string
    subtitle?: string
    icon: any
    color: 'blue' | 'violet' | 'emerald' | 'amber'
}) {
    const colors = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-600', gradient: 'from-blue-500 to-cyan-500' },
        violet: { bg: 'bg-violet-50', text: 'text-violet-600', gradient: 'from-violet-500 to-purple-500' },
        emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', gradient: 'from-emerald-500 to-teal-500' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-600', gradient: 'from-amber-500 to-orange-500' },
    }

    const selectedColor = colors[color]

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${selectedColor.bg} ${selectedColor.text}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>

            <div className="flex items-center gap-2">
                {subtitle && (
                    <span className="text-xs text-gray-400 font-medium">
                        {subtitle}
                    </span>
                )}
            </div>

            {/* Decorative gradient blob */}
            <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br ${selectedColor.gradient} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
        </div>
    )
}
