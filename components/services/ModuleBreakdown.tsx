import { Lock, PlayCircle } from 'lucide-react'

const MODULES = [
    {
        id: 1,
        week: 1,
        title: 'Introduction to Scientific Writing',
        isLocked: false,
        sessions: [
            { title: 'Session 1: Basics of Scientific Writing', hasPreview: true },
            { title: 'Session 2: Types of Scientific Papers', hasPreview: true },
        ],
    },
    {
        id: 2,
        week: 2,
        title: 'Structure and Components of a Scientific Manuscript',
        isLocked: true,
        sessions: [
            { title: 'Session 3: Writing the Introduction', hasPreview: false },
            { title: 'Session 4: Methods, Results, and Discussion Sections', hasPreview: false },
        ],
    },
    {
        id: 3,
        week: 3,
        title: 'Writing Style, Language, and Referencing',
        isLocked: true,
        sessions: [
            { title: 'Session 5: Writing Style and Academic Language', hasPreview: false },
            { title: 'Session 6: Referencing and Citation Styles', hasPreview: false },
        ],
    },
    {
        id: 4,
        week: 4,
        title: 'Submitting and Revising Scientific Manuscripts',
        isLocked: true,
        sessions: [
            { title: 'Session 7: Manuscript Submission Process', hasPreview: false },
            { title: 'Session 8: Revising and Responding to Reviewer Comments', hasPreview: false },
        ],
    },
]

export default function ModuleBreakdown() {
    return (
        <div className="mt-16">
            <h2 className="text-3xl font-serif text-[#393F50] mb-8">Module Breakdown</h2>

            <div className="space-y-4">
                {MODULES.map((module) => (
                    <div
                        key={module.id}
                        className="border border-gray-200 rounded-xl p-6 flex gap-6 relative overflow-hidden bg-white"
                    >
                        {/* Week Badge */}
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-[#393F50] rounded-lg flex flex-col items-center justify-center text-white">
                                <span className="text-xs font-medium opacity-80">Week</span>
                                <span className="text-xl font-bold">{module.week}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className={`flex-grow ${module.isLocked ? 'blur-[2px] select-none' : ''}`}>
                            <h3 className="text-lg font-bold text-[#393F50] mb-3">
                                Module {module.id}: {module.title}
                            </h3>

                            <div className="space-y-2">
                                {module.sessions.map((session, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-gray-600 text-sm">
                                        <div className="flex items-center gap-2">
                                            <PlayCircle className="w-4 h-4" />
                                            <span>{session.title}</span>
                                        </div>
                                        {session.hasPreview && (
                                            <button className="text-blue-500 hover:underline font-medium">
                                                Preview
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Lock Overlay */}
                        {module.isLocked && (
                            <div className="absolute inset-0 flex items-center justify-end pr-8">
                                <div className="w-10 h-10 rounded-full bg-[#393F50] flex items-center justify-center shadow-lg z-10">
                                    <Lock className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
