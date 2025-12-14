'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

export interface HighlightCardProps {
  id: string
  date: string
  title: string
  description: string
  buttonText: string
  onButtonClick?: () => void
}

export default function AchivementCard({
  id,
  date,
  title,
  description,
  buttonText,
  onButtonClick,
}: HighlightCardProps) {
  return (
    <div key={id} className="flex-shrink-0 w-full md:w-[544px] border p-4">
      
      <div className=" space-y-4">
        <div>
          <p>{date}</p>
          <h3 className="text-2xl font-normal mt-4 text-foreground mb-2 text-[#393F50]">{title}</h3>
          <p className="text-muted-foreground line-clamp-3 text-base mt-4 text-[#393F50]">{description}</p>
        </div>
        <Button onClick={onButtonClick} className="px-6 py-3 mt-2  text-[#393F50] border bg-white rounded-none hover:bg-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.33333 18.6667H14.6667V16H5.33333V18.6667ZM5.33333 13.3333H18.6667V10.6667H5.33333V13.3333ZM5.33333 8H18.6667V5.33333H5.33333V8ZM2.66667 24C1.93333 24 1.30556 23.7389 0.783333 23.2167C0.261111 22.6944 0 22.0667 0 21.3333V2.66667C0 1.93333 0.261111 1.30556 0.783333 0.783333C1.30556 0.261111 1.93333 0 2.66667 0H21.3333C22.0667 0 22.6944 0.261111 23.2167 0.783333C23.7389 1.30556 24 1.93333 24 2.66667V21.3333C24 22.0667 23.7389 22.6944 23.2167 23.2167C22.6944 23.7389 22.0667 24 21.3333 24H2.66667ZM2.66667 21.3333H21.3333V2.66667H2.66667V21.3333Z" fill="#393F50" />
          </svg>

          {buttonText}
        </Button>
      </div>
    </div>
  )
}
