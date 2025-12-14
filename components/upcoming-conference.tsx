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
import Eventcard from './event-card'

const SERVICES = [
  {
    id: '1',
    image: '/course1.png',
    title: 'Event Title: Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    subtitle: 'Professional Learning',
    description: 'Learn anytime with structured online classes.',
    buttonText: 'Register Now',
    date: 'Dec 12, 2023',
    location: 'New York, USA',
  },
  {
    id: '2',
    image: '/course2.png',
    title: 'Event Title: Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    subtitle: 'Recognized Credentials',
    description: 'Access and download research publications.',
    buttonText: 'Register Now',
    date: 'Dec 12, 2023',
    location: 'New York, USA',
  },

]

export default function UpcomingConference() {
  return (
    <section id="services" className="py-16 bg-background container mx-auto">
      <div className="w-full mx-auto px-4">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">Upcoming Conferences & Events</h2>
          <p className="text-muted-foreground">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <div className="flex h-full w-full flex-col md:flex-row flex-wrap justify-center gap-6">
          {SERVICES.map((service) => (
            <Eventcard
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
