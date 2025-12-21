'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Video, HelpCircle, FileText, ArrowLeft, X } from 'lucide-react'
import { authenticatedFetch } from '@/lib/auth-client'

interface UnifiedModuleCreatorProps {
    courseId: string
    onSuccess: () => void
    onCancel: () => void
}

type CreatorStep = 'TYPE_SELECTION' | 'DETAILS'
type ModuleType = 'CLASS' | 'QUIZ'
type QuizType = 'MCQ' | 'CQ' | null

export function UnifiedModuleCreator({ courseId, onSuccess, onCancel }: UnifiedModuleCreatorProps) {
    const [step, setStep] = useState<CreatorStep>('TYPE_SELECTION')
    const [moduleType, setModuleType] = useState<ModuleType | null>(null)
    const [quizType, setQuizType] = useState<QuizType>(null)

    // Form States
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const [htmlContent, setHtmlContent] = useState('')
    const [videoSource, setVideoSource] = useState<'youtube' | 'vimeo' | 'url'>('youtube')

    // Handle Type Selection
    const handleTypeSelect = (type: ModuleType) => {
        setModuleType(type)
        if (type === 'CLASS') {
            setStep('DETAILS')
        }
    }

    const handleQuizTypeSelect = (type: 'MCQ' | 'CQ') => {
        setModuleType('QUIZ')
        setQuizType(type)
        setStep('DETAILS')
    }

    const onSubmit = async (data: any) => {
        try {
            // 1. Create Module
            const moduleRes = await authenticatedFetch(`/api/courses/${courseId}/modules`, {
                method: 'POST',
                body: JSON.stringify({
                    title: data.moduleTitle,
                    description: data.moduleDescription
                })
            })

            if (!moduleRes.ok) throw new Error('Failed to create module')

            const moduleData = await moduleRes.json()
            const newModuleId = moduleData.data.id

            // 2. Create Content
            let contentPayload: any = {
                title: data.contentTitle,
                isFree: data.isFree || false,
                moduleId: newModuleId
            }

            if (moduleType === 'CLASS') {
                contentPayload = {
                    ...contentPayload,
                    type: 'VIDEO',
                    url: data.videoUrl,
                    duration: Number(data.duration),
                    description: htmlContent // HTML Description for Class
                }
            } else if (moduleType === 'QUIZ') {
                contentPayload = {
                    ...contentPayload,
                    type: 'QUIZ',
                    quizType: quizType,
                    // If CQ, use HTML content as description
                    description: quizType === 'CQ' ? htmlContent : data.description
                }
            }

            const contentRes = await authenticatedFetch(`/api/modules/${newModuleId}/contents`, {
                method: 'POST',
                body: JSON.stringify(contentPayload)
            })

            if (!contentRes.ok) throw new Error('Failed to create content')

            // Small delay to ensure DB consistency before refresh
            setTimeout(() => {
                onSuccess()
            }, 500)

        } catch (error) {
            console.error(error)
            alert('Failed to create module and content. Please try again.')
        }
    }

    if (step === 'TYPE_SELECTION') {
        if (moduleType === 'QUIZ' && !quizType) {
            // Quiz Sub-selection
            return (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 animate-in fade-in zoom-in-95">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <button onClick={() => setModuleType(null)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <h3 className="text-xl font-bold text-gray-900">Select Quiz Type</h3>
                            </div>
                            <button onClick={onCancel}><X className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SelectionCard
                                icon={<HelpCircle className="w-8 h-8 text-blue-600" />}
                                title="MCQ Test"
                                description="Multiple Choice Questions"
                                onClick={() => handleQuizTypeSelect('MCQ')}
                                color="blue"
                            />
                            <SelectionCard
                                icon={<FileText className="w-8 h-8 text-purple-600" />}
                                title="CQ Test"
                                description="Creative/Theory Questions"
                                onClick={() => handleQuizTypeSelect('CQ')}
                                color="purple"
                            />
                        </div>
                    </div>
                </div>
            )
        }

        // Initial Selection
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 animate-in fade-in zoom-in-95">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Add New Module</h3>
                        <button onClick={onCancel}><X className="w-5 h-5 text-gray-500" /></button>
                    </div>
                    <p className="text-gray-500 mb-6">Select the type of content to start this module with:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectionCard
                            icon={<Video className="w-8 h-8 text-indigo-600" />}
                            title="Recorded Class"
                            description="Video lessons with notes"
                            onClick={() => handleTypeSelect('CLASS')}
                            color="indigo"
                        />
                        <SelectionCard
                            icon={<HelpCircle className="w-8 h-8 text-emerald-600" />}
                            title="Quiz / Test"
                            description="Assessments and Assignments"
                            onClick={() => setModuleType('QUIZ')}
                            color="emerald"
                        />
                    </div>
                </div>
            </div>
        )
    }

    // DETAILS FORM
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 my-8 animate-in fade-in zoom-in-95">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <div className="flex items-center gap-2">
                        <button onClick={() => {
                            setStep('TYPE_SELECTION')
                            if (moduleType === 'QUIZ') setQuizType(null)
                            setModuleType(null)
                        }} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h3 className="text-xl font-bold text-gray-900">
                            Create {moduleType === 'CLASS' ? 'Class' : `${quizType} Quiz`} Module
                        </h3>
                    </div>
                    <button onClick={onCancel}><X className="w-5 h-5 text-gray-500" /></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Module Section */}
                    <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">1</span>
                            Module Details
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Module Title *</label>
                                <input {...register('moduleTitle', { required: true })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="e.g., Chapter 1: Basics" />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">2</span>
                            Content Details
                        </h4>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content Title *</label>
                            <input {...register('contentTitle', { required: true })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="e.g., Introduction Video" />
                        </div>

                        {moduleType === 'CLASS' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Video Source</label>
                                    <div className="flex gap-2 mb-2">
                                        {['youtube', 'vimeo', 'url'].map((src) => (
                                            <button
                                                key={src}
                                                type="button"
                                                onClick={() => setVideoSource(src as any)}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize border ${videoSource === src ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-gray-200 text-gray-600'}`}
                                            >
                                                {src}
                                            </button>
                                        ))}
                                    </div>
                                    <input {...register('videoUrl')} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="Video URL" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (mins)</label>
                                        <input type="number" {...register('duration')} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                                    </div>
                                    <div className="flex items-center pt-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" {...register('isFree')} className="w-4 h-4 text-indigo-600 rounded" />
                                            <span className="text-sm text-gray-700">Free Preview</span>
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* HTML Description - Shown for CLASS and CQ */}
                        {(moduleType === 'CLASS' || (moduleType === 'QUIZ' && quizType === 'CQ')) && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {moduleType === 'CLASS' ? 'Class Notes / Description' : 'Question / Scenario (HTML)'}
                                </label>
                                <textarea
                                    value={htmlContent}
                                    onChange={(e) => setHtmlContent(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none font-mono text-sm"
                                    rows={6}
                                    placeholder="<p>Enter content here...</p>"
                                />
                                <p className="text-xs text-gray-500 mt-1">Supports HTML tags</p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Module & Content'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function SelectionCard({ icon, title, description, onClick, color }: any) {
    const colorClasses: any = {
        indigo: 'hover:border-indigo-500 hover:bg-indigo-50/50',
        emerald: 'hover:border-emerald-500 hover:bg-emerald-50/50',
        blue: 'hover:border-blue-500 hover:bg-blue-50/50',
        purple: 'hover:border-purple-500 hover:bg-purple-50/50',
    }

    return (
        <button
            onClick={onClick}
            className={`group p-6 border-2 border-gray-200 rounded-xl transition-all duration-200 text-left w-full ${colorClasses[color]}`}
        >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-colors ${color === 'indigo' ? 'bg-indigo-100' : color === 'emerald' ? 'bg-emerald-100' : color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                {icon}
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
        </button>
    )
}
