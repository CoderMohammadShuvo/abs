'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Activity,
    Users,
    BookOpen,
    Book,
    GraduationCap,
    FileText,
    Award,
    Settings,
    LogOut,
    Layers,
    PenTool,
    MessageSquare,
    Calendar,
    PieChart
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: BookOpen, label: 'Courses', href: '/admin/courses' },
    { icon: Book, label: 'Bookshop', href: '/admin/books' },
    { icon: GraduationCap, label: 'Enrollments', href: '/admin/enrollments' },
    { icon: Award, label: 'Certificates', href: '/admin/certificates' },
    { icon: FileText, label: 'Blogs & News', href: '/admin/blogs' },
    { icon: Layers, label: 'Quizzes', href: '/admin/quizzes' },
    { icon: Layers, label: 'Projects', href: '/admin/projects' }, // Reusing Layers icon or find better
    { icon: FileText, label: 'Journals', href: '/admin/journals' },
    { icon: MessageSquare, label: 'Consultancy', href: '/admin/consultancy/requests' },
    { icon: PieChart, label: 'Accounting', href: '/admin/accounts' },
    { icon: PenTool, label: 'Scholarships', href: '/admin/scholarships' },
    { icon: Calendar, label: 'Conferences', href: '/admin/conferences' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
    { icon: Activity, label: 'Activity Logs', href: '/admin/logs' },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-40 hidden lg:flex flex-col">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold">
                        A
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                        ABS Admin
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-indigo-50 text-indigo-600 shadow-sm"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 transition-colors",
                                isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"
                            )} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* User / Logout */}
            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    )
}
