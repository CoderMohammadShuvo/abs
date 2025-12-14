import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
    Clock,
    Users,
    BookOpen,
    Star,
    CheckCircle2,
    PlayCircle,
    FileText,
    Award,
    Globe,
    MessageCircle,
    Share2,
    Heart,
    ChevronDown,
    ChevronUp,
    Lock
} from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

// Mock data for UI elements not yet in DB
const whatYouWillLearn = [
    "Understand the structure of scientific manuscripts",
    "Write clear, concise, and compelling abstracts",
    "Master the art of literature review and citation",
    "Create effective figures and tables for data presentation",
    "Navigate the peer review process with confidence",
    "Respond effectively to reviewer comments"
]

const targetAudience = [
    { icon: "🎓", label: "PhD Students", description: "Looking to publish their first paper" },
    { icon: "🔬", label: "Researchers", description: "Wanting to improve acceptance rates" },
    { icon: "📝", label: "Medical Writers", description: "Seeking professional development" }
]

export default async function CourseDetailsPage({ params }: PageProps) {
    const { slug } = await params

    // Fetch course by slug or ID
    // Note: The API handles both, but here we can use Prisma directly for Server Component
    let course = await prisma.course.findUnique({
        where: { slug: slug },
        include: {
            teacher: {
                include: {
                    profile: true
                }
            },
            categories: {
                include: {
                    category: true
                }
            },
            modules: {
                include: {
                    courseContents: {
                        orderBy: { order: 'asc' }
                    }
                },
                orderBy: { order: 'asc' }
            },
            _count: {
                select: {
                    enrollments: true,
                    modules: true
                }
            }
        }
    })

    // Fallback to ID if slug lookup failed (in case the url is /courses/ID)
    if (!course) {
        try {
            course = await prisma.course.findUnique({
                where: { id: slug },
                include: {
                    teacher: {
                        include: {
                            profile: true
                        }
                    },
                    categories: {
                        include: {
                            category: true
                        }
                    },
                    modules: {
                        include: {
                            courseContents: {
                                orderBy: { order: 'asc' }
                            }
                        },
                        orderBy: { order: 'asc' }
                    },
                    _count: {
                        select: {
                            enrollments: true,
                            modules: true
                        }
                    }
                }
            })
        } catch (e) {
            // Invalid ID format
        }
    }

    if (!course) {
        notFound()
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative bg-[#1a1b2e] text-white">
                {/* Background Pattern/Image Overlay */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1a1b2e] to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10 text-center">
                    {/* Breadcrumb */}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
                        <span>/</span>
                        <span className="text-white">{course.title}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 max-w-4xl mx-auto leading-tight">
                        {course.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-gray-300 mb-8">
                        <div className="flex items-center gap-2">
                            <span className="bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">
                                Best Seller
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <span className="font-bold text-white">4.8</span>
                            <span>(1,245 reviews)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            <span>{course._count.enrollments} Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            <span>English</span>
                        </div>
                    </div>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto line-clamp-2">
                        {course.description || "Master the skills you need with our comprehensive curriculum designed by industry experts."}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column (Content) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Course Overview Cards */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Course Overview</h3>
                            <div className="prose prose-blue max-w-none text-gray-600">
                                {/* We can render the description Markdown here later */}
                                <p>{course.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                        <VideoIcon />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">100% Online</h4>
                                        <p className="text-sm text-gray-500 relative">Start instantly and learn at your own schedule.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Certificate</h4>
                                        <p className="text-sm text-gray-500">Get a recognized certificate upon completion.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Expert Support</h4>
                                        <p className="text-sm text-gray-500">Get your questions answered by instructors.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course Curriculum */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900 font-serif">Course Curriculum</h3>
                                <div className="text-sm text-gray-500">
                                    {course._count.modules} Modules • {course.durationHours || 12}h 45m Total Length
                                </div>
                            </div>

                            <div className="space-y-4">
                                {course.modules.length > 0 ? (
                                    course.modules.map((module, idx) => (
                                        <CourseModuleAccordion key={module.id} module={module} index={idx} />
                                    ))
                                ) : (
                                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                        <p className="text-gray-500">Curriculum is being updated.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* What You'll Learn */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">What You'll Learn</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {whatYouWillLearn.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Who Should Join */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Who Should Join?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {targetAudience.map((item, i) => (
                                    <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-blue-100 transition-colors">
                                        <div className="text-3xl mb-3">{item.icon}</div>
                                        <h4 className="font-bold text-gray-900 mb-2">{item.label}</h4>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instructors */}
                        {course.teacher && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Course Instructor</h3>
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border-4 border-white shadow-md">
                                        {course.teacher.profile?.avatarUrl ? (
                                            <Image
                                                src={course.teacher.profile.avatarUrl}
                                                alt={course.teacher.profile.fullName || "Instructor"}
                                                width={96}
                                                height={96}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-2xl">
                                                {course.teacher.profile?.fullName?.[0] || 'I'}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-gray-900">{course.teacher.profile?.fullName}</h4>
                                        <p className="text-indigo-600 font-medium text-sm mb-3">Senior Research Scientist</p>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            {course.teacher.profile?.bio || "Experienced researcher and educator with over 10 years of experience in academic publishing and scientific writing."}
                                        </p>
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                <span className="font-semibold text-gray-900">4.9</span> Rating
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                <PlayCircle className="w-4 h-4 text-gray-400" />
                                                <span className="font-semibold text-gray-900">12</span> Courses
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Enrollment Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                                {/* Thumbnail Video Placeholder or Image */}
                                <div className="relative aspect-video bg-gray-900 group cursor-pointer">
                                    {course.thumbnail ? (
                                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900"></div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <PlayCircle className="w-8 h-8 text-white fill-current" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-white text-sm font-medium">Watch Preview</p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-end gap-3 mb-6">
                                        <h2 className="text-4xl font-bold text-gray-900">
                                            {course.isPaid ? `$${course.price}` : 'Free'}
                                        </h2>
                                        {course.isPaid && (
                                            <span className="text-lg text-gray-400 line-through mb-1.5">$199</span>
                                        )}
                                    </div>

                                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold text-lg mb-3 transition-colors shadow-lg shadow-indigo-200">
                                        {course.isPaid ? 'Enroll Now' : 'Start Learning'}
                                    </button>
                                    <p className="text-center text-xs text-gray-500 mb-6">30-Day Money-Back Guarantee</p>

                                    <div className="space-y-4 mb-6">
                                        <h5 className="font-bold text-gray-900 border-b border-gray-100 pb-2">This course includes:</h5>
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                                <Clock className="w-5 h-5 text-gray-400" />
                                                <span>Lifetime access</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                                <FileText className="w-5 h-5 text-gray-400" />
                                                <span>Assignments & Quizzes</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                                <Award className="w-5 h-5 text-gray-400" />
                                                <span>Certificate of Completion</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="flex items-center justify-between text-sm font-medium text-gray-500 pt-4 border-t border-gray-100">
                                        <button className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                                            <Share2 className="w-4 h-4" /> Share
                                        </button>
                                        <button className="flex items-center gap-2 hover:text-pink-600 transition-colors">
                                            <Heart className="w-4 h-4" /> Save
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Related / Upsell (Optional) */}
                            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white text-center">
                                <h4 className="font-bold text-lg mb-2">Need Custom Training?</h4>
                                <p className="text-indigo-100 text-sm mb-4">We offer tailored training programs for universities and organizations.</p>
                                <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function VideoIcon() {
    return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
    )
}

// Client Component for Accordion to avoid "useState" in Server Component
// We can actually make this a separate client component file, but for speed I'll put a simple server-rendered details/summary or a client wrapper.
// Let's use details/summary for zero-js (mostly) or a tiny client component. 
// Ideally should be a client component. I'll make a quick embedded client component wrapper if needed, but Next.js encourages separate files.
// I'll make `CourseModuleAccordion` a separate client component file or just use `details` tag.

import { CourseModuleAccordion } from './_components/CourseModuleAccordion'
