const ANALYSIS_METHODS = [
    {
        id: 1,
        title: 'Econometric & Statistical Models',
        description: 'Regression, Panel Data, SEM, GMM, MMQR',
    },
    {
        id: 2,
        title: 'Machine Learning & AI Methods',
        description: 'ANN, SHAP, Big Data analytics',
    },
    {
        id: 3,
        title: 'Qualitative Analysis',
        description: 'Thematic/content analysis, NVivo coding',
    },
    {
        id: 4,
        title: 'Visualization & Dashboards',
        description: 'Clear presentation of results for decision-making',
    },
]

export default function AdvancedAnalysis() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-4">
                        Advanced Analysis
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        For clients needing deeper insights, we also offer
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {ANALYSIS_METHODS.slice(0, 3).map((method) => (
                        <div
                            key={method.id}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-lg font-bold text-[#393F50] mb-3">
                                {method.title}
                            </h3>
                            <p className="text-sm text-gray-600">• {method.description}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-lg font-bold text-[#393F50] mb-3">
                            {ANALYSIS_METHODS[3].title}
                        </h3>
                        <p className="text-sm text-gray-600">• {ANALYSIS_METHODS[3].description}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
