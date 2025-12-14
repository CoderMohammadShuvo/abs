import Image from 'next/image'

interface CourseHeroProps {
    title: string
    backgroundImage: string
}

export default function CourseHero({ title, backgroundImage }: CourseHeroProps) {
    return (
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
            {/* Background Image */}
            <Image
                src={backgroundImage}
                alt={title}
                fill
                className="object-cover"
                priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#1e2130]/80 mix-blend-multiply" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-bold tracking-wide">
                        {title}
                    </h1>
                </div>
            </div>
        </div>
    )
}
