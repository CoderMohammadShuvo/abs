import Image from 'next/image'

export default function CourseCertification() {
    return (
        <div className="mt-24 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-6">
                Certification
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Participants who complete the course and submit their assignments will receive
                a Certificate of Completion in <span className="font-bold text-[#393F50]">Scientific Writing for Research and Publication</span>.
            </p>

            <div className="relative w-full max-w-4xl mx-auto aspect-[1.4/1] rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <Image
                    src="/certificate-sample.png"
                    alt="Sample Certificate of Completion"
                    fill
                    className="object-contain bg-gray-50"
                />
            </div>
        </div>
    )
}
