import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clock, Users, FileText } from 'lucide-react'

interface CourseCardProps {
    image: string
    category: string
    title: string
    instructor: string
    studentCount: number
    duration: string
    price: number
    originalPrice?: number
    id: string
    onBuyNow?: () => void
}

export default function CourseCard({
    image,
    category,
    title,
    instructor,
    studentCount,
    duration,
    price,
    originalPrice,
    id,
    onBuyNow,
}: CourseCardProps) {
    return (
        <div className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            {/* Image Container */}
            <Link href={`/services/training-courses/${id}`} className="relative h-48 w-full overflow-hidden block">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-medium text-gray-700 rounded-sm">
                    {category}
                </div>
            </Link>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <Link href={`/services/training-courses/${id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-[#393F50] transition-colors">
                        {title}
                    </h3>
                </Link>

                <p className="text-xs text-gray-500 mb-4">
                    Instructor: <span className="text-gray-700">{instructor}</span>
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{studentCount} Students</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{duration}</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-500">Course fee:</span>
                            <span className="text-lg font-bold text-gray-900">${price}</span>
                            {originalPrice && (
                                <span className="text-xs text-gray-400 line-through decoration-gray-400">
                                    ${originalPrice}
                                </span>
                            )}
                        </div>
                        <Link href={`/services/training-courses/${id}`}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-9 gap-2 text-gray-600 hover:text-gray-900"
                            >
                                <FileText className="w-4 h-4" />
                                View Details
                            </Button>
                        </Link>
                    </div>

                    <Button
                        className="w-full bg-[#393F50] hover:bg-[#2d3240] text-white h-10 rounded-md"
                        onClick={onBuyNow}
                    >
                        Buy Now
                    </Button>
                </div>
            </div>
        </div>
    )
}
