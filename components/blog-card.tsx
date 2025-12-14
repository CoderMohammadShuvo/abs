'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

export interface BlogCardProps {
  id: string
  image: string
  title: string
  description: string
}

export default function BlogCard({
  id,
  image,
  title,
  description,
}: BlogCardProps) {
  return (
    <div key={id} className="flex-shrink-0 border p-6 mt-20 w-full rounded-lg flex flex-col space-y-4 cursor-pointer">
      <div className="relative h-64  overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300 rounded-xl"
        />
      </div>
      <div className=" space-y-4">
        <div>
          <h3 className="text-2xl font-normal mt-4 text-foreground mb-2 text-[#393F50]">{title}</h3>
          <p className="text-muted-foreground line-clamp-3 text-base mt-4 text-[#393F50]">{description}</p>
        </div>
      
      </div>
    </div>
  )
}
