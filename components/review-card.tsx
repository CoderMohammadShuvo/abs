'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

export interface ReviewProps {
  id: string
  image: string
  name: string
  title: string
  description: string
  buttonText: string
  onButtonClick?: () => void
}

export default function ReviewCard({
  id,
  image,
  name,
  title,
  description,
  buttonText,
  onButtonClick,
}: ReviewProps) {
  return (
    <div key={id} className="flex-shrink-0 w-full md:w-[644px] h-full flex gap-6 items-center">
      <div className=" overflow-hidden ">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          height={350}
          width={350}
          className="object-cover hover:scale-105 transition-transform duration-300 rounded-xl"
        />
      </div>
      <div className=" space-y-4 w-1/2">
        <div>
          <h3 className="text-2xl font-normal mt-4 text-foreground mb-2 text-[#393F50]">{name}</h3>
          <h3 className="text-base font-normal mt-4 text-foreground mb-2 text-[#393F50]">{title}</h3>
          <p className="text-muted-foreground line-clamp-3 text-base mt-4 text-[#393F50]">{description}</p>
        </div>
        
      </div>
    </div>
  )
}
