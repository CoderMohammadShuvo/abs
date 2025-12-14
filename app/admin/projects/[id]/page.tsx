'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { authenticatedFetch } from '@/lib/auth-client'
import { format } from 'date-fns'
import { ArrowLeft, Plus, CheckCircle2, Circle, Clock, MoreVertical, Search } from 'lucide-react'
import Link from 'next/link'

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [project, setProject] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [tasks, setTasks] = useState<any[]>([])
    const [showTaskForm, setShowTaskForm] = useState(false)

    // New Task Form
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [newTaskDesc, setNewTaskDesc] = useState('')
    const [newTaskPriority, setNewTaskPriority] = useState('MEDIUM')
    const [newTaskDue, setNewTaskDue] = useState('')
    const [searchUser, setSearchUser] = useState('')
    const [foundUsers, setFoundUsers] = useState<any[]>([])
    const [assignedUserIds, setAssignedUserIds] = useState<string[]>([])
    const [selectedUsers, setSelectedUsers] = useState<any[]>([])

    useEffect(() => {
        fetchProject()
    }, [id])

    // Search users for assignment
    useEffect(() => {
        if (!searchUser) {
            setFoundUsers([])
            return
        }
        const delaySearch = setTimeout(async () => {
            try {
                const res = await authenticatedFetch(`/api/admin/users?search=${searchUser}&limit=5`)
                const data = await res.json()
                if (data.success) setFoundUsers(data.data.users)
            } catch (err) {
                console.error(err)
            }
        }, 300)
        return () => clearTimeout(delaySearch)
    }, [searchUser])

    const fetchProject = async () => {
        try {
            const res = await authenticatedFetch(`/api/projects/${id}`)
            const data = await res.json()
            if (data.success) {
                setProject(data.data)
                setTasks(data.data.tasks || [])
            } else {
                router.push('/admin/projects')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await authenticatedFetch(`/api/projects/${id}/tasks`, {
                method: 'POST',
                body: JSON.stringify({
                    title: newTaskTitle,
                    description: newTaskDesc,
                    priority: newTaskPriority,
                    dueAt: newTaskDue || undefined,
                    assignedUserIds: assignedUserIds.length > 0 ? assignedUserIds : undefined
                })
            })

            if (res.ok) {
                setShowTaskForm(false)
                setNewTaskTitle('')
                setNewTaskDesc('')
                setAssignedUserIds([])
                setSelectedUsers([])
                fetchProject() // Refresh tasks
            } else {
                alert('Failed to create task')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const addUser = (user: any) => {
        if (!assignedUserIds.includes(user.id)) {
            setAssignedUserIds([...assignedUserIds, user.id])
            setSelectedUsers([...selectedUsers, user])
        }
        setSearchUser('')
        setFoundUsers([])
    }

    const removeUser = (userId: string) => {
        setAssignedUserIds(assignedUserIds.filter(id => id !== userId))
        setSelectedUsers(selectedUsers.filter(u => u.id !== userId))
    }

    if (loading) return <div className="p-12 text-center text-gray-500">Loading...</div>
    if (!project) return null

    return (
        <div className="space-y-6">
            <div>
                <Link
                    href="/admin/projects"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
                        <p className="text-gray-600 mt-2">{project.description}</p>
                    </div>
                    <button
                        onClick={() => setShowTaskForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Task
                    </button>
                </div>
            </div>

            {/* Task Creation Modal/Inline Form */}
            {showTaskForm && (
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-semibold mb-4">New Task</h3>
                    <form onSubmit={handleCreateTask} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                value={newTaskTitle}
                                onChange={e => setNewTaskTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={newTaskDesc}
                                onChange={e => setNewTaskDesc(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                rows={2}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <select
                                    value={newTaskPriority}
                                    onChange={e => setNewTaskPriority(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg outline-none"
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                <input
                                    type="date"
                                    value={newTaskDue}
                                    onChange={e => setNewTaskDue(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg outline-none"
                                />
                            </div>
                        </div>

                        {/* Assignment */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>

                            <div className="flex flex-wrap gap-2 mb-2">
                                {selectedUsers.map(u => (
                                    <span key={u.id} className="inline-flex items-center gap-1.5 px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full">
                                        {u.email}
                                        <button type="button" onClick={() => removeUser(u.id)} className="hover:text-indigo-900 font-bold">&times;</button>
                                    </span>
                                ))}
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search user by email..."
                                    value={searchUser}
                                    onChange={e => setSearchUser(e.target.value)}
                                    className="w-full pl-8 pr-3 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white transition-colors outline-none"
                                />
                                <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />

                                {foundUsers.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden z-20 max-h-48 overflow-y-auto">
                                        {foundUsers.map(user => (
                                            <button
                                                key={user.id}
                                                type="button"
                                                onClick={() => addUser(user)}
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex flex-col"
                                            >
                                                <span className="font-medium text-gray-900">{user.profile?.fullName || 'No Name'}</span>
                                                <span className="text-gray-500 text-xs">{user.email}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowTaskForm(false)}
                                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                            >
                                Create Task
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Task List */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
                <div className="bg-white border md:rounded-xl overflow-hidden border-gray-200">
                    {tasks.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No tasks created yet.</div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {tasks.map(task => (
                                <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-4 justify-between">
                                    <div className="flex gap-3">
                                        <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.status === 'COMPLETED' ? 'bg-green-100 border-green-500' : 'border-gray-300'}`}>
                                            {task.status === 'COMPLETED' && <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />}
                                        </div>
                                        <div>
                                            <h4 className={`font-medium text-gray-900 ${task.status === 'COMPLETED' ? 'line-through text-gray-500' : ''}`}>{task.title}</h4>
                                            {task.description && <p className="text-sm text-gray-500 mt-1">{task.description}</p>}
                                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                                <span className={`px-2 py-0.5 rounded font-medium ${task.priority === 'HIGH' ? 'bg-red-50 text-red-600' :
                                                        task.priority === 'MEDIUM' ? 'bg-yellow-50 text-yellow-600' :
                                                            'bg-blue-50 text-blue-600'
                                                    }`}>
                                                    {task.priority}
                                                </span>
                                                {task.dueAt && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        Due {format(new Date(task.dueAt), 'MMM d')}
                                                    </span>
                                                )}
                                                {task.assignments?.length > 0 && (
                                                    <span className="flex items-center gap-1">
                                                        Assigned to: {task.assignments.map((a: any) => a.user.profile?.fullName || a.user.email).join(', ')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions would go here e.g. Delete Task */}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
