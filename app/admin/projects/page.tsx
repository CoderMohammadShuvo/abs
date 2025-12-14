'use client'

import { useState, useEffect } from 'react'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import {
    Search,
    Plus,
    Briefcase,
    Calendar,
    Users,
    MoreVertical,
    Edit,
    Trash2
} from 'lucide-react'
import Link from 'next/link'

interface Project {
    id: string
    title: string
    description?: string
    createdAt: string
    tasks: any[]
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        setLoading(true)
        try {
            const res = await authenticatedFetch('/api/projects?limit=50')
            const data = await res.json()
            if (data.success) {
                setProjects(data.data.projects)
            }
        } catch (error) {
            console.error('Failed to fetch projects', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return

        try {
            const res = await authenticatedFetch(`/api/projects/${id}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                fetchProjects()
            }
        } catch (error) {
            console.error('Failed to delete project', error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage projects and assign tasks</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Create Project
                </Link>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <div key={project.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    href={`/admin/projects/${project.id}`}
                                    className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-indigo-600"
                                >
                                    <Edit className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-red-600"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10">{project.description || 'No description provided'}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar className="w-3.5 h-3.5" />
                                {format(new Date(project.createdAt), 'MMM d, yyyy')}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                {project.tasks?.length || 0} Tasks
                            </div>
                        </div>

                        <Link href={`/admin/projects/${project.id}`} className="absolute inset-0 z-0" />
                        <div className="absolute top-6 right-6 z-10"></div> {/* Container for actions to be clickable above the full card link */}
                    </div>
                ))}

                {projects.length === 0 && !loading && (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        No projects found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    )
}
