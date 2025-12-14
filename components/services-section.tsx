'use client'

import { BookOpen, Award, Users, Zap, Globe, TrendingUp } from 'lucide-react'
import ServiceCard from './service-card'
import BookIcon from './icons/bookicon'
import DocumentIcon from './icons/documenticon'
import ProfileBadgeIcon from './icons/profilebadgeIcon'
import PeopleNetworkIcon from './icons/peoplenetwork'
import ChartIcon from './icons/charticon'
import HouseIcon from './icons/houseicon'
import CalendarAddIcon from './icons/CalendearAddIcon'

const SERVICES = [
  {
    id: '1',
    icon: BookIcon,
    title: 'Courses',
    subtitle: 'Professional Learning',
    description: 'Learn anytime with structured online classes.',
    buttonText: 'Read More',
  },
  {
    id: '2',
    icon: DocumentIcon,
    title: 'Journals',
    subtitle: 'Recognized Credentials',
    description: 'Access and download research publications.',
    buttonText: 'Read More',
  },
  {
    id: '3',
    icon: ProfileBadgeIcon,
    title: 'Consultancy',
    subtitle: 'Network & Collaborate',
    description: 'Get expert academic and research guidance.',
     buttonText: 'Read More',
  },
  {
    id: '4',
    icon: PeopleNetworkIcon,
    title: 'Conferences',
    subtitle: 'Accelerated Learning',
    description: 'Join upcoming academic events & seminars.',
    buttonText: 'Read More',
  },
  {
    id: '5',
    icon: HouseIcon,
    title: 'Scholarships',
    subtitle: 'Learn Anywhere',
    description: 'Discover opportunities to support your study.',
     buttonText: 'Read More',
  },
  {
    id: '6',
    icon: ChartIcon,
    title: 'Book Shop',
    subtitle: 'Professional Development',
    description: 'Buy academic books & resources online.',
    buttonText: 'Read More',
  },
  {
    id: '7',
    icon: CalendarAddIcon,
    title: 'Project Tracking',
    subtitle: 'Professional Development',
    description: 'Manage tasks and track research progress.',
    buttonText: 'Read More',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-background container mx-auto">
      <div className="w-full mx-auto px-4">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">Key Services Overview</h2>
          <p className="text-muted-foreground">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <div className="flex h-full w-full flex-wrap justify-center gap-6 ">
          {SERVICES.map((service) => (
             //@ts-ignore
            <ServiceCard
              key={service.id}
              {...service}
              onButtonClick={() => console.log(`Clicked: ${service.title}`)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
