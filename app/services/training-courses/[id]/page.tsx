import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CourseHero from '@/components/services/CourseHero'
import CourseSidebar from '@/components/services/CourseSidebar'
import CourseOverview from '@/components/services/CourseOverview'
import ModuleBreakdown from '@/components/services/ModuleBreakdown'
import WhatYouWillLearn from '@/components/services/WhatYouWillLearn'
import WhoShouldJoin from '@/components/services/WhoShouldJoin'
import CourseInstructors from '@/components/services/CourseInstructors'
import CourseOutcomes from '@/components/services/CourseOutcomes'
import CoursePricing from '@/components/services/CoursePricing'
import CourseCertification from '@/components/services/CourseCertification'
import CourseTestimonials from '@/components/services/CourseTestimonials'
import CoursePublications from '@/components/services/CoursePublications'
import EmailCopyButton from '@/components/services/EmailCopyButton'

// Mock data - in a real app this would come from an API or database based on the slug
const COURSE_DATA = {
    title: 'Scientific Writing',
    heroImage: '/course-hero.jpg', // Placeholder, need to ensure this exists or use a generic one
    sidebarImage: '/course2.png', // Using existing image
    duration: '6 Month',
    totalClasses: '40+',
    totalExams: '30+',
    liveClasses: '30+',
    recordedClasses: '40+',
    lectureSheets: '20 pcs',
    price: 150,
    originalPrice: 200,
    offerEnds: '24:59:59',
}

export default function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <CourseHero
                title={COURSE_DATA.title}
                backgroundImage="/herobg1.jpg"
            />

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content - Left Column */}
                    <div className="lg:col-span-2">
                        <CourseOverview />
                        <ModuleBreakdown />
                    </div>

                    {/* Sidebar - Right Column */}
                    <div className="lg:col-span-1">
                        <CourseSidebar course={{
                            ...COURSE_DATA,
                            image: COURSE_DATA.sidebarImage,
                        }} />
                    </div>
                </div>
                <WhatYouWillLearn />
                <WhoShouldJoin />
                <CourseInstructors />
                <CourseOutcomes />
                <CoursePricing />
                <CourseCertification />
                <CourseTestimonials />
                <CoursePublications />
            </div>
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-8">
                        Enroll Today!
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Our courses are designed to empower you with the knowledge and skills necessary to succeed in your career and research. Whether you're looking to enhance your academic writing, advance your statistical analysis skills, or learn the latest in AI and digital transformation, we have the course for you.
                    </p>
                    <p className="text-gray-600 mb-8">
                        Get in touch to learn more about the course schedule, fees, and enrollment process.
                    </p>

                    <EmailCopyButton />
                </div>
            </section>
            <Footer />
        </main>
    )
}
