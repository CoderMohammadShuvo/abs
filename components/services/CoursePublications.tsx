import { FileText } from 'lucide-react'
import Link from 'next/link'

const PUBLICATIONS = [
    {
        id: 1,
        title: 'Technological innovation and agricultural performance in the ASEAN region: The role of digitalization',
        journal: 'Food Policy (Scopus Q1, SCIE/SSCI-Q1, IF: 6.0, ABDC: B)',
        authors: 'Ode Htwee Thann, Zhao Yuhuan, Myne Uddin, and Sumin Zuo',
        date: 'August 14, 2025',
        keywords: 'Technological innovation, Agricultural performance, Digitalization, ASEAN.',
        citation: 'Thann, O. H., Yuhuan, Z., Uddin, M., & Zuo, S. (2025). Technological innovation and agricultural performance in the ASEAN region: The role of digitalization. Food Policy, 135, 102939.',
        link: '#',
    },
    {
        id: 2,
        title: 'Technological innovation and agricultural performance in the ASEAN region: The role of digitalization',
        journal: 'Food Policy (Scopus Q1, SCIE/SSCI-Q1, IF: 6.0, ABDC: B)',
        authors: 'Ode Htwee Thann, Zhao Yuhuan, Myne Uddin, and Sumin Zuo',
        date: 'August 14, 2025',
        keywords: 'Technological innovation, Agricultural performance, Digitalization, ASEAN.',
        citation: 'Thann, O. H., Yuhuan, Z., Uddin, M., & Zuo, S. (2025). Technological innovation and agricultural performance in the ASEAN region: The role of digitalization. Food Policy, 135, 102939.',
        link: '#',
    },
]

export default function CoursePublications() {
    return (
        <div className="mt-24">
            <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                Our Latest Publications
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {PUBLICATIONS.map((pub) => (
                    <div
                        key={pub.id}
                        className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-[#393F50] mb-6 leading-tight">
                            {pub.title}
                        </h3>

                        <div className="space-y-4 text-sm text-gray-600 mb-8">
                            <p>
                                <span className="font-bold text-gray-700">Journal Name:</span> {pub.journal}
                            </p>
                            <p>
                                <span className="font-bold text-gray-700">Authors:</span> {pub.authors}
                            </p>
                            <p>
                                <span className="font-bold text-gray-700">Publication Date:</span> {pub.date}
                            </p>
                            <p>
                                <span className="font-bold text-gray-700">Keywords:</span> {pub.keywords}
                            </p>
                            <p className="leading-relaxed">
                                <span className="font-bold text-gray-700">Cite as:</span> {pub.citation}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Link
                                href={pub.link}
                                className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                <FileText className="w-4 h-4" />
                                Read full article
                            </Link>

                            <div className="text-sm text-gray-500">
                                Click here for more citations style: <Link href="#" className="underline hover:text-gray-700">Link</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
