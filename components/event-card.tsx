'use client'

import { type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export interface ServiceCardProps {
  id: string
  image: string
  title: string
  subtitle: string
  description: string
  buttonText: string
  date: string
  location: string
  onButtonClick?: () => void
}

export default function Eventcard({
  id,
  image,
  title,
  subtitle,
  description,
  buttonText,
  date,
  location,
  onButtonClick,
}: ServiceCardProps) {
  return (
    <div key={id} className="flex gap-2 mt-8 max-w-1/2">
      <div className="flex overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          height={300}
          width={400}
          className="object-cover hover:scale-105 transition-transform duration-300 rounded-xl"
        />
      </div>
      <div className=" space-y-4 ml-4">
        <div>
          <h3 className="text-2xl font-normal mt-4 text-foreground mb-2 text-[#393F50]">{title}</h3>
          <p className="text-muted-foreground line-clamp-3 text-base mt-4 text-[#393F50]"><span className='font-bold'>Date: </span>{date}</p>
          <p className="text-muted-foreground line-clamp-3 text-base mt-4 text-[#393F50]"><span className='font-bold'>Location: </span>{location}</p>
        </div>
        <Button onClick={onButtonClick} className="px-6 py-3 mt-2  text-[#393F50] border bg-white rounded-none hover:bg-white">
          <svg width="29" height="22" viewBox="0 0 29 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.33333 13.3333H14.6667L17.3333 10.6667H5.33333V13.3333ZM5.33333 8H13.3333V5.33333H5.33333V8ZM2.66667 2.66667V16H12L9.33333 18.6667H0V0H26.6667V4H24V2.66667H2.66667ZM27.8667 9.73333C27.9778 9.84445 28.0333 9.96667 28.0333 10.1C28.0333 10.2333 27.9778 10.3556 27.8667 10.4667L26.6667 11.6667L24.3333 9.33333L25.5333 8.13333C25.6444 8.02222 25.7667 7.96667 25.9 7.96667C26.0333 7.96667 26.1556 8.02222 26.2667 8.13333L27.8667 9.73333ZM14.6667 21.3333V19L23.5333 10.1333L25.8667 12.4667L17 21.3333H14.6667Z" fill="#393F50" />
          </svg>


          {buttonText}
        </Button>
      </div>
    </div>
  )
}
