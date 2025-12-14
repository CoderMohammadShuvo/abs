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

export default function PersonCard({
  id,
  image,
  name,
  title,
  description,
  buttonText,
  onButtonClick,
}: ReviewProps) {
  return (
    <div key={id} className="flex-shrink-0 w-full h-full flex gap-6 items-center border p-4">
      <div className=" overflow-hidden ">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          height={240}
          width={240}
          className="object-cover hover:scale-105 transition-transform duration-300 rounded-xl"
        />
      </div>
      <div className=" space-y-4 w-1/2">
        <div>
          <h3 className="text-lg font-semibold mt-4 text-foreground mb-2 text-[#393F50]">{name}</h3>
          <h3 className="text-base font-normal mt-4 text-foreground mb-2 text-[#393F50]">{title}</h3>
          <p className="text-muted-foreground line-clamp-3 text-base mt-4 text-[#393F50] px-4 py-2 border rounded-full">{description}</p>
        </div>

        <Button onClick={onButtonClick} className="px-6 py-3 mt-2 cursor-pointer text-[#393F50] border bg-white rounded-none hover:bg-white">
          View Profile
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.86732 17.3333L14.6673 4.53333V16H17.334V0H1.33398V2.66667H12.8007L0.000650406 15.4667L1.86732 17.3333Z" fill="#393F50" />
          </svg>

        </Button>
      </div>
    </div>
  )
}
