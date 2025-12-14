'use client'

import { CourseForm } from '../_components/CourseForm'

export default function CreateCoursePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
                <p className="text-sm text-gray-500 mt-1">Add a new course to your catalog</p>
            </div>

            <CourseForm />
        </div>
    )
}
