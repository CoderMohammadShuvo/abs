const JOINING_STEPS = [
    {
        id: 1,
        step: 'step 1',
        icon: '📝',
        title: 'Fill Out Application Form',
        description: 'Provide your personal details, academic background, and upload your CV. This helps us understand your skills and interests.',
    },
    {
        id: 2,
        step: 'step 2',
        icon: '💻',
        title: 'Online Test / Assessment',
        description: 'Showcase your knowledge and problem-solving skills through a short online test tailored to your chosen role or field.',
    },
    {
        id: 3,
        step: 'step 3',
        icon: '👥',
        title: 'Interview with Our Team',
        description: 'Meet our faculty and research leads for a virtual interview where we discuss your goals, expectations, and alignment with our mission.',
    },
    {
        id: 4,
        step: 'step 4',
        icon: '🎯',
        title: 'Start Your Journey with Us',
        description: 'Once accepted, you\'ll receive your welcome pack, access to resources, and an invitation to begin contributing to projects and training.',
    },
]

export default function JoiningProcess() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                    Joining Process
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {JOINING_STEPS.map((step) => (
                        <div
                            key={step.id}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow relative"
                        >
                            <div className="absolute top-4 right-4 text-xs text-gray-400 uppercase">
                                {step.step}
                            </div>

                            <div className="text-5xl mb-4">
                                {step.icon}
                            </div>

                            <h3 className="text-lg font-bold text-[#393F50] mb-3">
                                {step.title}
                            </h3>

                            <p className="text-sm text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
