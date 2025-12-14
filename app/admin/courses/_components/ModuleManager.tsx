'use client'

import { useState, useEffect } from 'react'
import {
    Plus,
    MoreVertical,
    GripVertical,
    Video,
    FileText,
    HelpCircle,
    Trash2,
    Edit,
    ChevronDown,
    ChevronUp,
    Tv
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button' // If exist, else I'll use raw buttons

// Types
interface Content {
    id: string
    title: string
    type: 'VIDEO' | 'PDF' | 'QUIZ' | 'LIVE_CLASS' | 'NOTE'
    videoUrl?: string
    pdfUrl?: string
    duration?: number
    isFree: boolean
}

interface Module {
    id: string
    title: string
    description?: string
    order: number
    courseContents: Content[]
}

interface ModuleManagerProps {
    courseId: string
}

// Module Form Schema
const moduleSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional()
})

import { authenticatedFetch } from '@/lib/auth-client'

export function ModuleManager({ courseId }: ModuleManagerProps) {
    const [modules, setModules] = useState<Module[]>([])
    const [loading, setLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)

    // Fetch Modules
    const fetchModules = async () => {
        try {
            const res = await authenticatedFetch(`/api/courses/${courseId}/modules`)
            const data = await res.json()
            if (data.success) {
                setModules(data.data)
            }
        } catch (error) {
            console.error('Failed to fetch modules:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (courseId) fetchModules()
    }, [courseId])

    if (loading) return <div>Loading curriculum...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Curriculum</h3>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Module
                </button>
            </div>

            {/* Create Module Form */}
            {isCreating && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-top-2">
                    <CreateModuleForm
                        courseId={courseId}
                        onSuccess={() => {
                            setIsCreating(false)
                            fetchModules()
                        }}
                        onCancel={() => setIsCreating(false)}
                    />
                </div>
            )}

            {/* Modules List */}
            <div className="space-y-4">
                {modules.map((module) => (
                    <ModuleItem
                        key={module.id}
                        module={module}
                        onUpdate={fetchModules}
                    />
                ))}
            </div>

            {modules.length === 0 && !isCreating && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                    <p className="text-gray-500">No modules yet. Start by adding one.</p>
                </div>
            )}
        </div>
    )
}

function ModuleItem({ module, onUpdate }: { module: Module, onUpdate: () => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isAddingContent, setIsAddingContent] = useState(false)
    const [editingContent, setEditingContent] = useState<Content | null>(null)

    const handleDelete = async () => {
        // Module delete is tricky as it has contents. 
        // Assuming backend handles cascade or we warn user.
        alert("Module deletion not yet implemented via UI for safety.")
    }

    const handleDeleteContent = async (contentId: string) => {
        if (!confirm('Are you sure?')) return
        try {
            const res = await authenticatedFetch(`/api/modules/${module.id}/contents/${contentId}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                onUpdate()
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <div className="flex items-center gap-3 p-4 bg-gray-50/50 border-b border-gray-100">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-500"
                >
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{module.title}</h4>
                    {module.description && <p className="text-xs text-gray-500 mt-0.5">{module.description}</p>}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                        {module.courseContents?.length || 0} items
                    </span>
                    <button onClick={handleDelete} className="p-2 hover:bg-gray-200 rounded text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="p-4 space-y-4">
                    {/* Contents List */}
                    <div className="space-y-2">
                        {module.courseContents?.map((content) => (
                            <div key={content.id} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg hover:border-gray-200 transition-colors group">
                                <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    {content.type === 'VIDEO' && <Video className="w-4 h-4" />}
                                    {content.type === 'PDF' && <FileText className="w-4 h-4" />}
                                    {content.type === 'QUIZ' && <HelpCircle className="w-4 h-4" />}
                                    {content.type === 'LIVE_CLASS' && <Tv className="w-4 h-4" />}
                                    {content.type === 'NOTE' && <FileText className="w-4 h-4" />}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{content.title}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>{content.isFree ? 'Free Preview' : 'Locked'}</span>
                                        <span>•</span>
                                        <span>{content.duration || 0} min</span>
                                        {/* @ts-ignore */}
                                        {content.isLive && <span className="text-red-600 font-bold">• Live</span>}
                                    </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingContent({ ...content, moduleId: module.id }) // Inject moduleId for edit form
                                            setIsAddingContent(true)
                                        }}
                                        className="p-1.5 hover:bg-gray-100 rounded text-gray-500"
                                    >
                                        <Edit className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteContent(content.id)}
                                        className="p-1.5 hover:bg-red-50 rounded text-red-500"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Content Button */}
                    {!isAddingContent ? (
                        <button
                            onClick={() => {
                                setEditingContent(null)
                                setIsAddingContent(true)
                            }}
                            className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Content
                        </button>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <CreateContentForm
                                moduleId={module.id}
                                initialData={editingContent || undefined}
                                onSuccess={() => {
                                    setIsAddingContent(false)
                                    setEditingContent(null)
                                    onUpdate()
                                }}
                                onCancel={() => {
                                    setIsAddingContent(false)
                                    setEditingContent(null)
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function CreateModuleForm({ courseId, onSuccess, onCancel }: { courseId: string, onSuccess: () => void, onCancel: () => void }) {
    const { register, handleSubmit, formState: { errors, isLoading } } = useForm<z.infer<typeof moduleSchema>>({
        resolver: zodResolver(moduleSchema)
    })

    const onSubmit = async (data: any) => {
        try {
            const res = await authenticatedFetch(`/api/courses/${courseId}/modules`, {
                method: 'POST',
                body: JSON.stringify(data)
            })
            if (res.ok) {
                onSuccess()
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">New Module</h4>
            <div>
                <input
                    {...register('title')}
                    placeholder="Module Title"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    autoFocus
                />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            </div>
            <div>
                <input
                    {...register('description')}
                    placeholder="Description (optional)"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                />
            </div>
            <div className="flex justify-end gap-2">
                <button type="button" onClick={onCancel} className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-900">Cancel</button>
                <button type="submit" className="px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Create Module</button>
            </div>
        </form>
    )
}

interface Content {
    id: string
    title: string
    type: 'VIDEO' | 'PDF' | 'QUIZ' | 'LIVE_CLASS' | 'NOTE'
    url?: string
    duration?: number
    isFree: boolean
    isLive?: boolean
    liveUrl?: string
    moduleId?: string
}

function CreateContentForm({ moduleId, onSuccess, onCancel, initialData }: { moduleId?: string, onSuccess: () => void, onCancel: () => void, initialData?: Content }) {
    const isEdit = !!initialData
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: initialData || {
            title: '',
            type: 'VIDEO',
            url: '',
            duration: 0,
            isFree: false,
            isLive: false,
            liveUrl: ''
        }
    })

    const type = watch('type')
    const isLive = watch('isLive')

    const onSubmit = async (data: any) => {
        try {
            // Fix: Pass moduleId correctly or use what's available. 
            // If isEdit, we need to know the endpoint. contentId is unique, but path is /modules/:id/contents/:contentId usually? 
            // Route is /api/modules/[id]/contents/[contentId] -> so we need module ID.
            // If editing, I might not have module ID passed easily unless valid.
            // Let's rely on parent passing valid moduleId even for edit.

            const endpoint = isEdit
                ? `/api/modules/${initialData?.moduleId || moduleId}/contents/${initialData?.id}`
                : `/api/modules/${moduleId}/contents`
            const method = isEdit ? 'PUT' : 'POST'

            const res = await authenticatedFetch(endpoint, {
                method,
                body: JSON.stringify(data)
            })
            if (res.ok) {
                onSuccess()
            } else {
                const err = await res.json()
                alert(err.error || 'Failed')
            }
        } catch (e) {
            console.error(e)
            alert('Error saving content')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-gray-900">{isEdit ? 'Edit Content' : 'Add Content'}</h4>
                {isEdit && <button type="button" onClick={onCancel} className="text-xs text-gray-500 hover:text-gray-700">Cancel Edit</button>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="text-xs font-medium text-gray-500 block mb-1">Title</label>
                    <input
                        {...register('title', { required: true })}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                        placeholder="Lesson title"
                    />
                </div>

                <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">Type</label>
                    <select
                        {...register('type')}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                        <option value="VIDEO">Video</option>
                        <option value="PDF">PDF Document</option>
                        <option value="QUIZ">Quiz</option>
                        <option value="LIVE_CLASS">Live Class</option>
                        <option value="NOTE">Note</option>
                    </select>
                </div>

                <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">Duration (min)</label>
                    <input
                        type="number"
                        {...register('duration', { valueAsNumber: true })}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>
            </div>

            {/* Dynamic Fields */}
            {type === 'VIDEO' && (
                <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">Video URL</label>
                    <input
                        {...register('url')}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                        placeholder="https://vimeo.com/..."
                    />
                </div>
            )}

            {type === 'PDF' && (
                <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">PDF URL</label>
                    <input
                        {...register('url')}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                        placeholder="https://..."
                    />
                </div>
            )}

            {type === 'LIVE_CLASS' && (
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 block mb-1">Live Meeting URL</label>
                        <input
                            {...register('liveUrl')}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                            placeholder="https://zoom.us/..."
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" {...register('isLive')} id="isLive" />
                        <label htmlFor="isLive" className="text-sm text-gray-600">Is Currently Live?</label>
                    </div>
                </div>
            )}

            {type === 'QUIZ' && (
                <div>
                    <p className="text-sm text-gray-500">Quiz content will be managed in a dedicated quiz builder.</p>
                    {/* Potentially add a button here to "Go to Quiz Builder" */}
                </div>
            )}

            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <input type="checkbox" {...register('isFree')} id="isFree" className="w-4 h-4 text-indigo-600 rounded" />
                <label htmlFor="isFree" className="text-sm text-gray-700 font-medium">Free Preview (Publicly accessible)</label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={onCancel} className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-900">Cancel</button>
                <button type="submit" className="px-4 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm">
                    {isEdit ? 'Save Changes' : 'Add Content'}
                </button>
            </div>
        </form>
    )
}
