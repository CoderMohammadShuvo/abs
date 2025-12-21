'use client'

import { useState, useEffect } from 'react'
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

interface Conference {
  id: string
  image: string
  title: string
  subtitle: string
  description: string
  buttonText: string
  date: string
  location: string
}

export default function UpcomingConference() {
  const [conferences, setConferences] = useState<Conference[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await fetch('/api/conferences?limit=4')
        const data = await response.json()

        if (data.success && data.data) {
          const transformedConferences: Conference[] = data.data.map((conf: any) => ({
            id: conf.id,
            image: conf.image || '/course1.png',
            title: conf.title || `Event Title: ${conf.name}`,
            subtitle: conf.subtitle || 'Professional Learning',
            description: conf.description || 'Join us for this exciting event.',
            buttonText: 'Register Now',
            date: new Date(conf.startDate || conf.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            location: conf.location || 'TBA',
          }))
          setConferences(transformedConferences)
        }
      } catch (error) {
        console.error('Error fetching conferences:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchConferences()
  }, [])

  return (
    <section id="services" className="py-16 bg-background container mx-auto">
      <div className="w-full mx-auto px-4">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">Upcoming Conferences & Events</h2>
          <p className="text-muted-foreground">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <div className="flex h-full w-full flex-col md:flex-row flex-wrap justify-center gap-6">
          {loading ? (
            <div className="flex items-center justify-center w-full py-12">
              <p className="text-muted-foreground">Loading conferences...</p>
            </div>
          ) : conferences.length > 0 ? (
            conferences.map((conference: Conference) => (
              <Eventcard
                key={conference.id}
                {...conference}
                onButtonClick={() => console.log(`Clicked: ${conference.title}`)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center w-full py-12">
              <p className="text-muted-foreground">No upcoming conferences at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
