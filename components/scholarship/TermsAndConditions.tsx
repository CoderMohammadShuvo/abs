const TERMS = [
    {
        id: 1,
        title: 'Eligibility',
        description: 'Applicants must meet the stated eligibility criteria (country of residence, academic background, financial need, English proficiency).',
    },
    {
        id: 2,
        title: 'Application Authenticity',
        description: 'All information and documents submitted must be accurate and truthful. Any falsification may result in disqualification.',
    },
    {
        id: 3,
        title: 'Selection Process',
        description: 'Applications will be reviewed by the ABS Research Academy selection committee. Decisions are final and cannot be appealed.',
    },
    {
        id: 4,
        title: 'Scholarship Coverage',
        description: 'The scholarship covers full course fees only. It does not include additional expenses (e.g., internet, hardware, or personal costs).',
    },
    {
        id: 5,
        title: 'Commitment',
        description: 'Awarded scholars must commit to completing the course and actively participating in assignments and peer discussions.',
    },
    {
        id: 6,
        title: 'Certification',
        description: 'Certificates will only be issued upon successful completion of the course.',
    },
    {
        id: 7,
        title: 'Withdrawal Policy',
        description: 'If a scholar withdraws or fails to participate, the scholarship may be revoked and reallocated.',
    },
    {
        id: 8,
        title: 'Data Privacy',
        description: 'All application data will be treated confidentially and used only for scholarship processing.',
    },
]

export default function TermsAndConditions() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
                    Terms and Conditions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {TERMS.map((term) => (
                        <div
                            key={term.id}
                            className="bg-white rounded-lg border border-gray-200 p-6"
                        >
                            <h3 className="text-lg font-bold text-[#393F50] mb-3">
                                {term.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed flex gap-2">
                                <span className="text-[#393F50] font-bold">•</span>
                                <span>{term.description}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
