'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Save, Loader2, ArrowLeft, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

const courseSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    level: z.string().optional(),
    isPaid: z.boolean().default(false),
    price: z.number().min(0).default(0),
    duration: z.number().optional(),
    thumbnailUrl: z.string().url().optional().or(z.literal('')),
    categoryIds: z.array(z.string()).optional()
})

type CourseSchema = z.infer<typeof courseSchema>

interface CourseFormProps {
    initialData?: any
    isEdit?: boolean
}

import { authenticatedFetch } from '@/lib/auth-client'

export function CourseForm({ initialData, isEdit = false }: CourseFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([])

    const form = useForm<CourseSchema>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            description: initialData?.description || '',
            level: initialData?.level || 'BEGINNER',
            isPaid: initialData?.isPaid || false,
            price: initialData?.price || 0,
            duration: initialData?.duration || 0,
            thumbnailUrl: initialData?.thumbnailUrl || '',
            categoryIds: initialData?.categories?.map((c: any) => c.categoryId) || []
        }
    })

    useEffect(() => {
        // Fetch categories
        const fetchCategories = async () => {
            try {
                const res = await authenticatedFetch('/api/categories')
                if (res.ok) {
                    const data = await res.json()
                    if (data.success) {
                        setCategories(data.data || [])
                    }
                }
            } catch (error) {
                console.error('Failed to fetch categories', error)
            }
        }
        fetchCategories()
    }, [])

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        form.setValue('title', title)
        if (!isEdit) {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            form.setValue('slug', slug)
        }
    }

    const onSubmit = async (data: CourseSchema) => {
        setLoading(true)
        try {
            const url = isEdit ? `/api/courses/${initialData.id}` : '/api/courses'
            const method = isEdit ? 'PUT' : 'POST'

            const res = await authenticatedFetch(url, {
                method,
                body: JSON.stringify(data)
            })

            if (res.ok) {
                router.push('/admin/courses')
                router.refresh()
            } else {
                const error = await res.json()
                alert(error.error || 'Something went wrong')
            }
        } catch (error) {
            console.error('Submit error:', error)
            alert('Failed to save course')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Actions Bar */}
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/courses"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Courses
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isEdit ? 'Save Changes' : 'Create Course'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Course Information</h3>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                <input
                                    {...form.register('title')}
                                    onChange={handleTitleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="e.g. Advanced React Patterns"
                                />
                                {form.formState.errors.title && (
                                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.title.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                                <input
                                    {...form.register('slug')}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono text-sm"
                                    placeholder="e.g. advanced-react-patterns"
                                />
                                {form.formState.errors.slug && (
                                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.slug.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    {...form.register('description')}
                                    rows={6}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-y"
                                    placeholder="Describe what students will learn..."
                                />
                                {form.formState.errors.description && (
                                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.description.message}</p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Settings</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                            <div className="space-y-2 max-h-48 overflow-y-auto p-3 bg-gray-50 rounded-lg border border-gray-100">
                                {categories.length === 0 && (
                                    <p className="text-sm text-gray-400 text-center py-2">No categories found</p>
                                )}
                                {categories.map((category) => (
                                    <label key={category.id} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            value={category.id}
                                            {...form.register('categoryIds')}
                                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 transition-all"
                                        />
                                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                                            {category.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {form.formState.errors.categoryIds && (
                                <p className="text-sm text-red-500 mt-1">{form.formState.errors.categoryIds.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                            <select
                                {...form.register('level')}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            >
                                <option value="BEGINNER">Beginner</option>
                                <option value="INTERMEDIATE">Intermediate</option>
                                <option value="ADVANCED">Advanced</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <input
                                type="checkbox"
                                {...form.register('isPaid')}
                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                            />
                            <span className="text-sm font-medium text-gray-700">This is a paid course</span>
                        </div>

                        {form.watch('isPaid') && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                <input
                                    type="number"
                                    {...form.register('price', { valueAsNumber: true })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                />
                                {form.formState.errors.price && (
                                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.price.message}</p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                            <div className="flex gap-2">
                                <input
                                    {...form.register('thumbnailUrl')}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                    placeholder="https://..."
                                />
                            </div>
                            {form.watch('thumbnailUrl') && (
                                <div className="mt-3 relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                                    <img
                                        src={form.watch('thumbnailUrl')}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </form>
    )
}
