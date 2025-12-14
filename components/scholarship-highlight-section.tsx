'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import HighlightCard from './highlight-card'


export default function ScholarshipHighLight() {


  return (
    <section className="bg-white h-ful pt-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center font-mono mx-auto ">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-regular font-mono mb-2">Scholarship Highlights</h2>
        </div>

        <div className="relative ">
          {/* Scroll Container */}
          <div className="flex flex-col md:flex-row items-center gap-6 overflow-x-auto scroll-smooth-horizontal pb-4 pt-8 w-full"
          >
            <div className="flex overflow-hidden w-full md:w-1/2">
              <img
                src="/scholarshipleft.png"
                alt="Scholarship"
                className="object-cover w-full hover:scale-105 transition-transform duration-300 rounded-xl"
              />
            </div>
            <div className=" space-y-4 md:ml-4 w-full md:w-1/2">
              <div>
                <h3 className="text-xl md:text-2xl font-normal mt-4 text-foreground mb-2 text-[#393F50]">Lorem ipsum dolor sit amet consectetur adipiscing elit.</h3>
                <p className="text-muted-foreground line-clamp-3 text-sm md:text-base mt-4 text-[#393F50]">In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere.</p>
              </div>
              <Button className="px-6 py-3 mt-2  text-[#393F50] border bg-white rounded-none hover:bg-white">
                <svg width="29" height="22" viewBox="0 0 29 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.33333 13.3333H14.6667L17.3333 10.6667H5.33333V13.3333ZM5.33333 8H13.3333V5.33333H5.33333V8ZM2.66667 2.66667V16H12L9.33333 18.6667H0V0H26.6667V4H24V2.66667H2.66667ZM27.8667 9.73333C27.9778 9.84445 28.0333 9.96667 28.0333 10.1C28.0333 10.2333 27.9778 10.3556 27.8667 10.4667L26.6667 11.6667L24.3333 9.33333L25.5333 8.13333C25.6444 8.02222 25.7667 7.96667 25.9 7.96667C26.0333 7.96667 26.1556 8.02222 26.2667 8.13333L27.8667 9.73333ZM14.6667 21.3333V19L23.5333 10.1333L25.8667 12.4667L17 21.3333H14.6667Z" fill="#393F50" />
                </svg>


                Read More
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
