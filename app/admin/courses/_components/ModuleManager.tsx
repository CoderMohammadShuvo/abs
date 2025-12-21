'use client'

import { useState, useEffect } from 'react'
import {
    Plus,
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
import { authenticatedFetch } from '@/lib/auth-client'
import { UnifiedModuleCreator } from './UnifiedModuleCreator'

// Types
interface Content {
    id: string
    title: string
    type: 'VIDEO' | 'PDF' | 'QUIZ' | 'LIVE_CLASS' | 'NOTE'
    videoUrl?: string
    pdfUrl?: string
    duration?: number
    isFree: boolean
    description?: string
    quizType?: string
    isLive?: boolean
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
                setModules(data.data || [])
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

            {/* Unified Create Module Wizard */}
            {isCreating && (
                <UnifiedModuleCreator
                    courseId={courseId}
                    onSuccess={() => {
                        setIsCreating(false)
                        fetchModules()
                    }}
                    onCancel={() => setIsCreating(false)}
                />
            )}

            {/* Modules List */}
            <div className="space-y-4">
                {modules.length > 0 ? (
                    modules.map((module) => (
                        <ModuleItem
                            key={module.id}
                            module={module}
                            onUpdate={fetchModules}
                        />
                    ))
                ) : (
                    !isCreating && (
                        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                            <p className="text-gray-500">No modules yet. Start by adding one.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

function ModuleItem({ module, onUpdate }: { module: Module, onUpdate: () => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isAddingContent, setIsAddingContent] = useState(false)
    const [editingContent, setEditingContent] = useState<Content | null>(null)

    const handleDelete = async () => {
        if (!confirm("Delete this module and all its contents?")) return;

        try {
            const res = await authenticatedFetch(`/api/modules/${module.id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                onUpdate()
            }
        } catch (e) {
            console.error(e)
            alert("Failed to delete module")
        }
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
                                        {content.isLive && <span className="text-red-600 font-bold">• Live</span>}
                                    </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingContent({ ...content })
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

function CreateContentForm({ moduleId, onSuccess, onCancel, initialData }: { moduleId: string, onSuccess: () => void, onCancel: () => void, initialData?: any }) {
    const isEdit = !!initialData
    const [contentType, setContentType] = useState<'CLASS' | 'TEST' | null>(null)
    const [testType, setTestType] = useState<'MCQ' | 'CQ' | null>(null)
    const [videoSource, setVideoSource] = useState<'youtube' | 'vimeo' | 'url'>('youtube')
    const [htmlContent, setHtmlContent] = useState(initialData?.description || '')

    const { register, handleSubmit, formState: { isSubmitting } } = useForm({
        defaultValues: initialData || {
            title: '',
            type: 'VIDEO',
            url: '',
            duration: 0,
            isFree: false
        }
    })

    const onSubmit = async (data: any) => {
        try {
            // Prepare data based on content type
            let submitData = {
                ...data,
                // If editing, preserve type, else set based on selection
                type: initialData?.type || (contentType === 'CLASS' ? 'VIDEO' : 'QUIZ'),
            }

            if (contentType === 'CLASS' || submitData.type === 'VIDEO') {
                submitData.description = htmlContent
            } else if (contentType === 'TEST' || submitData.type === 'QUIZ') {
                if (testType) submitData.quizType = testType
                // Also save description if CQ
                if (testType === 'CQ') submitData.description = htmlContent
            }

            const endpoint = isEdit
                ? `/api/modules/${moduleId}/contents/${initialData.id}`
                : `/api/modules/${moduleId}/contents`
            const method = isEdit ? 'PUT' : 'POST'

            const res = await authenticatedFetch(endpoint, {
                method,
                body: JSON.stringify(submitData)
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

    if (isEdit && !contentType) {
        // This block handles initialization logic for edit mode if needed
        // For now, form default values handle most.
    }

    // Step 1: Choose content type (Only for new content)
    if (!isEdit && !contentType) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">Add New Content</h3>
                        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <p className="text-gray-600 mb-8">Choose the type of content you want to add to this module</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Class Option */}
                        <button
                            onClick={() => setContentType('CLASS')}
                            className="group p-8 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-200 text-left"
                        >
                            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                                <Video className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Class</h4>
                            <p className="text-sm text-gray-600">Add video lessons, notes, or recorded classes</p>
                        </button>

                        {/* Test Option */}
                        <button
                            onClick={() => setContentType('TEST')}
                            className="group p-8 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50/50 transition-all duration-200 text-left"
                        >
                            <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                                <HelpCircle className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Test</h4>
                            <p className="text-sm text-gray-600">Create MCQ or CQ quizzes for assessment</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Step 2: If TEST, choose test type
    if (!isEdit && contentType === 'TEST' && !testType) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <button onClick={() => setContentType(null)} className="text-sm text-gray-500 hover:text-gray-700 mb-2 flex items-center gap-1">
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>
                            <h3 className="text-2xl font-bold text-gray-900">Choose Test Type</h3>
                        </div>
                        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* MCQ Option */}
                        <button
                            onClick={() => setTestType('MCQ')}
                            className="group p-8 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200 text-left"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                                <HelpCircle className="w-8 h-8 text-blue-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">MCQ Test</h4>
                            <p className="text-sm text-gray-600">Multiple Choice Questions with options</p>
                        </button>

                        {/* CQ Option */}
                        <button
                            onClick={() => setTestType('CQ')}
                            className="group p-8 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50/50 transition-all duration-200 text-left"
                        >
                            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                                <FileText className="w-8 h-8 text-purple-600" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">CQ Test</h4>
                            <p className="text-sm text-gray-600">Creative Questions requiring detailed answers</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const showHtmlEditor = contentType === 'CLASS' || (initialData?.type === 'VIDEO') || (contentType === 'TEST' && testType === 'CQ')

    // Step 3: Show form based on content type
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 my-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        {!isEdit && (
                            <button
                                onClick={() => {
                                    if (contentType === 'TEST') {
                                        setTestType(null)
                                    } else {
                                        setContentType(null)
                                    }
                                }}
                                className="text-sm text-gray-500 hover:text-gray-700 mb-2 flex items-center gap-1"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>
                        )}
                        <h3 className="text-2xl font-bold text-gray-900">
                            {isEdit ? 'Edit Content' : (contentType === 'CLASS' ? 'Add Class Content' : `Add ${testType} Test`)}
                        </h3>
                    </div>
                    <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                        <input
                            {...register('title', { required: true })}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            placeholder={contentType === 'CLASS' ? 'e.g., Introduction to React Hooks' : 'e.g., Chapter 1 Quiz'}
                        />
                    </div>

                    {(contentType === 'CLASS' || initialData?.type === 'VIDEO') && (
                        <>
                            {/* Video Source Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Video Source</label>
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {['youtube', 'vimeo', 'url'].map((src) => (
                                        <button
                                            key={src}
                                            type="button"
                                            onClick={() => setVideoSource(src as any)}
                                            className={`px-4 py-3 rounded-lg border-2 transition-all capitalize ${videoSource === src
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="font-medium">{src}</div>
                                        </button>
                                    ))}
                                </div>
                                <input
                                    {...register('url')}
                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                    placeholder="Enter video URL..."
                                />
                            </div>

                            {/* Duration */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                                    <input
                                        type="number"
                                        {...register('duration', { valueAsNumber: true })}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                        placeholder="30"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" {...register('isFree')} className="w-5 h-5 text-indigo-600 rounded" />
                                        <span className="text-sm font-medium text-gray-700">Free Preview</span>
                                    </label>
                                </div>
                            </div>
                        </>
                    )}

                    {/* HTML Content Editor - Shown for CLASS and CQ */}
                    {showHtmlEditor && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {testType === 'CQ' ? 'Question / Scenario (HTML)' : 'Notes / Description (HTML)'}
                            </label>
                            <textarea
                                value={htmlContent}
                                onChange={(e) => setHtmlContent(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                                rows={8}
                                placeholder="<p>Enter HTML content here...</p>"
                            />
                            <p className="text-xs text-gray-500 mt-1">You can use HTML tags for formatting</p>
                        </div>
                    )}

                    {!isEdit && contentType === 'TEST' && testType !== 'CQ' && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <p className="text-sm text-amber-800">
                                <strong>{testType}</strong> quiz builder will open after saving.
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 text-sm font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm transition-colors"
                        >
                            {isSubmitting ? 'Saving...' : (isEdit ? 'Update Content' : (contentType === 'CLASS' ? 'Add Class' : 'Create Test'))}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function ArrowLeft({ className }: { className?: string }) {
    return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
}

function X({ className }: { className?: string }) {
    return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
}
