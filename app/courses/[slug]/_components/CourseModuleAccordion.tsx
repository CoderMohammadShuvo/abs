'use client'

import { useState } from 'react'
import { ChevronDown, PlayCircle, FileText, HelpCircle, Lock } from 'lucide-react'

export function CourseModuleAccordion({ module, index }: { module: any, index: number }) {
    const [isOpen, setIsOpen] = useState(index === 0)

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors text-left"
            >
                <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-500 shadow-sm">
                        {index + 1}
                    </span>
                    <div>
                        <h4 className="font-bold text-gray-900">{module.title}</h4>
                        <div className="text-xs text-gray-500 mt-0.5 flex gap-2">
                            <span>{module.courseContents?.length || 0} Lessons</span>
                            <span>•</span>
                            <span>{module.duration || '45 min'}</span>
                        </div>
                    </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-2 space-y-1 bg-white border-t border-gray-100">
                    {module.courseContents?.map((content: any) => (
                        <div key={content.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="text-gray-400 group-hover:text-indigo-600 transition-colors">
                                    {content.type === 'VIDEO' ? <PlayCircle className="w-4 h-4" /> :
                                        content.type === 'QUIZ' ? <HelpCircle className="w-4 h-4" /> :
                                            <FileText className="w-4 h-4" />}
                                </div>
                                <span className="text-sm text-gray-700 font-medium group-hover:text-indigo-900 transition-colors">
                                    {content.title}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                {content.isFree ? (
                                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Preview</span>
                                ) : (
                                    <Lock className="w-3.5 h-3.5 text-gray-300" />
                                )}
                                <span className="text-xs text-gray-400 tabular-nums">{content.duration || '10:00'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
