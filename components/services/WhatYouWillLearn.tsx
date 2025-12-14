import { Bookmark } from 'lucide-react'

const LEARNING_POINTS = [
    'How to select and refine a high-impact research topic',
    'Developing research questions and theoretical frameworks',
    'Structuring a research proposal for PhD applications',
    'Understanding methodology (qualitative, quantitative, or mixed)',
    'Navigating the academic publishing process',
    'Building a research portfolio and academic profile',
    'Tips for applying to PhD programs and securing scholarships',
    'Time management, supervisor communication, and PhD survival strategies',
]

export default function WhatYouWillLearn() {
    return (
        <div className="mt-16">
            <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                What You'll Learn
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LEARNING_POINTS.map((point, index) => (
                    <div
                        key={index}
                        className={`bg-white border border-gray-200 rounded-xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow ${
                            // Center the last two items if they are the only ones in the last row (for 3-column layout)
                            // This is a bit tricky with pure CSS grid, so we'll stick to a standard grid for now
                            // and maybe use flex for the last row if needed, but grid is safer for alignment.
                            // Let's just use standard grid.
                            ''
                            }`}
                    >
                        <div className="flex-shrink-0 mt-1">
                            <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center">
                                <Bookmark className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            {point}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
