'use client'

import { type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface ServiceCardProps {
  id: string
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
  buttonText: string
  onButtonClick?: () => void
}

export default function ServiceCard({
  id,
  icon: Icon,
  title,
  subtitle,
  description,
  buttonText,
  onButtonClick,
}: ServiceCardProps) {
  return (
    <div key={id} className="bg-card rounded-xl p-8 hover:shadow-lg transition-shadow border border-border flex flex-col items-center min-w-[400px] max-w-[500px]">
      <div className="mb-4 bg-[#393F50] p-6 rounded-full ">
        <Icon className="w-12 h-12 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 text-center">{description}</p>
      <Button onClick={onButtonClick} className="px-6 py-3 mt-2  text-[#393F50] border bg-white rounded-none hover:bg-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.33333 18.6667H14.6667V16H5.33333V18.6667ZM5.33333 13.3333H18.6667V10.6667H5.33333V13.3333ZM5.33333 8H18.6667V5.33333H5.33333V8ZM2.66667 24C1.93333 24 1.30556 23.7389 0.783333 23.2167C0.261111 22.6944 0 22.0667 0 21.3333V2.66667C0 1.93333 0.261111 1.30556 0.783333 0.783333C1.30556 0.261111 1.93333 0 2.66667 0H21.3333C22.0667 0 22.6944 0.261111 23.2167 0.783333C23.7389 1.30556 24 1.93333 24 2.66667V21.3333C24 22.0667 23.7389 22.6944 23.2167 23.2167C22.6944 23.7389 22.0667 24 21.3333 24H2.66667ZM2.66667 21.3333H21.3333V2.66667H2.66667V21.3333Z" fill="#393F50" />
          </svg>

          {buttonText}
        </Button>
    </div>
  )
}
