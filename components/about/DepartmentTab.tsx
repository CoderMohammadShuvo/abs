"use client"

import Image from "next/image"
import PersonCard from "../person-card";
import ServiceCard from "../service-card";
import ServiceCardSecondary from "../service-card-secondary";
import AchivementCard from "../achivement-card";
import { useRef, useState } from "react";
import BlogCard from "../blog-card";


export const data = [
    {
        id: '1',
        image: '/reviewperson.png',
        name: 'Dr. Ayesha Rahman',
        title: 'Head of R&D',
        description: 'AI & Big Data',

    },
    {
        id: '2',
        image: '/reviewperson2.png',
        name: 'Prof. Karim Hossain',
        title: 'Lead Sustainability Research',
        description: 'Green Finance',
    },
    {
        id: '3',
        image: '/reviewperson3.jpg',
        name: 'Dr. Tanvir Alam',
        title: 'Director, Emerging Tech',
        description: 'Blockchain & Fintech',

    },
    {
        id: '4',
        image: '/reviewperson.png',
        name: 'Dr. Sara Islam',
        title: 'Methodology Lead',
        description: 'Quant & SEM',
    },
    {
        id: '5',
        image: '/reviewperson.png',
        name: 'Dr. Emon Islam',
        title: 'Head of R&D',
        description: 'AI & Big Data',
    },
]



export default function DepartmentTabContent() {
    const responsibilities = [
        {
            id: '1',
            icon: '/icons/brifcase.svg',
            title: 'Courses',
            subtitle: 'Professional Learning',
            description: 'Learn anytime with structured online classes.',
            buttonText: 'Read More',
        },
        {
            id: '2',
            icon: '/icons/sheldsearch.svg',
            title: 'Journals',
            subtitle: 'Recognized Credentials',
            description: 'Access and download research publications.',
            buttonText: 'Read More',
        },
        {
            id: '3',
            icon: '/icons/building.svg',
            title: 'Consultancy',
            subtitle: 'Network & Collaborate',
            description: 'Get expert academic and research guidance.',
            buttonText: 'Read More',
        },
    ]

    const achivements = [
        {
            id: '1',
            date: '17 November 2025',
            title: 'Global Research Excellence Award 2023',
            description: 'Awarded for outstanding contributions to sustainable development research, recognizing our innovative approaches and impactful findings that have influenced global policies and practices.',
            buttonText: 'Read More',
        },
        {
            id: '2',
            date: '17 November 2025',
            title: 'Global Research Excellence Award 2023',
            description: 'Awarded for outstanding contributions to sustainable development research, recognizing our innovative approaches and impactful findings that have influenced global policies and practices.',
            buttonText: 'Read More',
        },
        {
            id: '3',
            date: '17 November 2025',
            title: 'Global Research Excellence Award 2023',
            description: 'Awarded for outstanding contributions to sustainable development research, recognizing our innovative approaches and impactful findings that have influenced global policies and practices.',
            buttonText: 'Read More',
        },
        {
            id: '4',
            date: '17 November 2025',
            title: 'Global Research Excellence Award 2023',
            description: 'Awarded for outstanding contributions to sustainable development research, recognizing our innovative approaches and impactful findings that have influenced global policies and practices.',
            buttonText: 'Read More',
        },
    ]

    const blogdata = [
        {
            id: '1',
            image: '/blog-cover-1.png',
            title: 'R&D Department',
            description: 'Drives cutting-edge research and innovations across sustainability and technology.',
        },
        {
            id: '2',
            image: '/blog-cover-2.png',
            title: 'Strategic Consulting and Policy Development',
            description: 'Provides expert guidance to organizations and governments to shape impactful strategies and policies.',
        },
        {
            id: '3',
            image: '/blog-cover-3.png',
            title: 'Applied Research and Industry Solutions',
            description: 'Bridges research and real-world applications, ensuring that insights and solutions have a direct impact on industries and communities.',
        },
    ]


    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScroll = () => {
        const container = scrollContainerRef.current
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0)
            setCanScrollRight(
                container.scrollLeft < container.scrollWidth - container.clientWidth - 20
            )
        }
    }

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current
        if (container) {
            const scrollAmount = container.clientWidth * 0.8
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            })
            setTimeout(checkScroll, 100)
        }
    }

    return (
        <main className=" w-full mx-auto ">
            <div className="w-full flex gap-10">
                <img src="/departmentbanner1.png" alt="" className="w-1/3" />
                <div className="">
                    <h2 className="text-[68px] font-base mb-4">
                        Department Overview
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-[24px]">
                        At <span className="font-semibold">ABS Research Academy</span>,
                        we focus on providing comprehensive research, consulting, and training services that cater to various industries, helping organizations achieve sustainable growth and innovation. Our organizational structure consists of three core departments, each focusing on specialized research areas to offer targeted solutions to our clients and stakeholders.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-20 text-center">
                <div className="mb-4 bg-[#393F50] rounded-full w-[90px] h-[90px] flex items-center justify-center mx-auto mt-10">
                    <svg width="51" height="56" viewBox="0 0 51 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M46.9333 56L39.7333 48.8C38.7556 49.3778 37.7333 49.8333 36.6667 50.1667C35.6 50.5 34.4889 50.6667 33.3333 50.6667C30 50.6667 27.1667 49.5 24.8333 47.1667C22.5 44.8333 21.3333 42 21.3333 38.6667C21.3333 35.3333 22.5 32.5 24.8333 30.1667C27.1667 27.8333 30 26.6667 33.3333 26.6667C36.6667 26.6667 39.5 27.8333 41.8333 30.1667C44.1667 32.5 45.3333 35.3333 45.3333 38.6667C45.3333 39.8222 45.1667 40.9333 44.8333 42C44.5 43.0667 44.0444 44.0889 43.4667 45.0667L50.6667 52.2667L46.9333 56ZM33.3333 45.3333C35.2 45.3333 36.7778 44.6889 38.0667 43.4C39.3556 42.1111 40 40.5333 40 38.6667C40 36.8 39.3556 35.2222 38.0667 33.9333C36.7778 32.6444 35.2 32 33.3333 32C31.4667 32 29.8889 32.6444 28.6 33.9333C27.3111 35.2222 26.6667 36.8 26.6667 38.6667C26.6667 40.5333 27.3111 42.1111 28.6 43.4C29.8889 44.6889 31.4667 45.3333 33.3333 45.3333ZM48 24H42.6667V10.6667H37.3333V18.6667H10.6667V10.6667H5.33333V48H18.6667V53.3333H5.33333C3.86667 53.3333 2.61111 52.8111 1.56667 51.7667C0.522222 50.7222 0 49.4667 0 48V10.6667C0 9.2 0.522222 7.94444 1.56667 6.9C2.61111 5.85556 3.86667 5.33333 5.33333 5.33333H16.4667C16.9556 3.77778 17.9111 2.5 19.3333 1.5C20.7556 0.5 22.3111 0 24 0C25.7778 0 27.3667 0.5 28.7667 1.5C30.1667 2.5 31.1111 3.77778 31.6 5.33333H42.6667C44.1333 5.33333 45.3889 5.85556 46.4333 6.9C47.4778 7.94444 48 9.2 48 10.6667V24ZM24 10.6667C24.7556 10.6667 25.3889 10.4111 25.9 9.9C26.4111 9.38889 26.6667 8.75556 26.6667 8C26.6667 7.24444 26.4111 6.61111 25.9 6.1C25.3889 5.58889 24.7556 5.33333 24 5.33333C23.2444 5.33333 22.6111 5.58889 22.1 6.1C21.5889 6.61111 21.3333 7.24444 21.3333 8C21.3333 8.75556 21.5889 9.38889 22.1 9.9C22.6111 10.4111 23.2444 10.6667 24 10.6667Z" fill="white" />
                    </svg>

                </div>
                <h3 className="text-[52px] font-base font-mono mb-2">Department of Research and Development (R&D)</h3>
                <p className="text-muted-foreground mb-6 text-center text-[24px]">The R&D Department is at the heart of innovation and research at ABS Research Academy. This department focuses on advancing knowledge, developing new research methodologies, and integrating emerging technologies into research practices. Our team is dedicated to exploring novel solutions to current global challenges, such as sustainability, technological advancements, and social impact.</p>
            </div>

            <div>
                <h1 className="text-[40px] text-normal pt-10 font-mono pb-5">Key People</h1>
                <div className="flex flex-wrap justify-between gap-4 grid grid-cols-1 md:grid-cols-3">
                    {data.map((highlight) => (
                        //@ts-ignore
                        <PersonCard
                            key={highlight.id}
                            {...highlight}
                            onButtonClick={() => console.log(`Clicked: ${highlight.title}`)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h1 className="text-[40px] text-normal pt-10 font-mono pb-5">Key Responsibilities</h1>
                <div className="flex h-full w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    {responsibilities.map((service) => (
                        //@ts-ignore
                        <ServiceCardSecondary
                            key={service.id}
                            {...service}
                            onButtonClick={() => console.log(`Clicked: ${service.title}`)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h1 className="text-[40px] text-normal pt-10 font-mono pb-5">Key Sub-Departments</h1>
                <div className="flex h-full w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                    {responsibilities.map((service) => (
                        //@ts-ignore
                        <ServiceCardSecondary
                            key={service.id}
                            {...service}
                            onButtonClick={() => console.log(`Clicked: ${service.title}`)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h1 className="text-[40px] text-normal pt-10 font-mono pb-5">Key Sub-Departments</h1>
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="flex gap-6 overflow-x-auto scroll-smooth-horizontal pb-4 pt-8"
                >
                    {achivements.map((service) => (
                        //@ts-ignore
                        <AchivementCard
                            key={service.id}
                            {...service}
                            onButtonClick={() => console.log(`Clicked: ${service.title}`)}
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-4xl mx-auto mt-20 text-center">
                
                <h3 className="text-[52px] font-base font-mono mb-2">Why These Departments?</h3>
                <p className="text-muted-foreground mb-6 text-center text-[24px]">Each of these three departments plays a vital role in ensuring that ABS Research Academy continues to lead in research, strategy development, and practical application of research solutions. The structure allows for deep specialization in each area while maintaining a focus on collaboration between departments, enabling us to address complex global challenges holistically.</p>

               
            </div>

             <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-10">
                    {blogdata.map((service) => (
                        //@ts-ignore
                        <BlogCard
                            key={service.id}
                            {...service}
                        />
                    ))}
                </div>  

                 <div className="max-w-3xl mx-auto flex flex-col items-right">
                <h2 className="text-[68px] font-base font-mono text-center mt-16 text-[#2c2f3a]">
                    Newsletter
                </h2>
                <p className="text-center text-base w-2/3 mx-auto">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                {/* <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="border px-4 py-2 w-2/3 mt-6" 
                /> */}
                <input type="text" placeholder="enter your email" className="border px-4 py-2 w-2/3 mx-auto my-10" />
                <button
                    type="submit"
                    className="w-[180px] mx-auto bg-[#393F50] text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-[#23252f] transition"
                >

                    Contact Us

                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.86732 17.3333L14.6673 4.53333V16H17.334V0H1.33398V2.66667H12.8007L0.000650406 15.4667L1.86732 17.3333Z" fill="white" />
                    </svg>

                </button>
            </div>
        </main>
    )
}
