import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import AvailableScholarships from '@/components/scholarship/AvailableScholarships'
import ScholarshipBenefits from '@/components/scholarship/ScholarshipBenefits'
import EligibilityCriteria from '@/components/scholarship/EligibilityCriteria'
import HowToApplyScholarship from '@/components/scholarship/HowToApplyScholarship'
import Image from 'next/image'

export default function ScholarshipPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Banner */}
            <div className="relative h-[400px] flex items-center justify-center mt-[80px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80 z-10"></div>
                <div className="absolute inset-0">
                    <Image
                        src="/herobg1.jpg"
                        alt="Graduation ceremony"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <h1 className="relative z-20 text-4xl md:text-5xl lg:text-6xl font-serif text-white">
                    Our Scholarships
                </h1>
            </div>

            {/* Introduction Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* Left Side - Image */}
                    <div className="relative h-[400px] rounded-2xl overflow-hidden">
                        <Image
                            src="/herobg1.jpg"
                            alt="Graduation students celebrating"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Right Side - Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-6">
                            Scholarships at ABS Research Academy
                        </h2>

                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                At ABS Research Academy, we are committed to promoting academic excellence and
                                supporting the growth of young scholars, particularly from developing countries. We
                                believe that access to quality education and training should not be limited by
                                geographical or financial constraints. Therefore, we are proud to offer full scholarships
                                for training courses to deserving individuals from developing nations who demonstrate a
                                strong commitment to academic and professional growth.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <AvailableScholarships />
            <ScholarshipBenefits />
            <EligibilityCriteria />
            <HowToApplyScholarship />

            <Footer />
        </main>
    )
}
