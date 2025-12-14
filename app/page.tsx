import Navbar from '@/components/navbar'
import HeroSlider from '@/components/hero-slider'
import HighlightSection from '@/components/highlight-section'
import ServicesSection from '@/components/services-section'
import FeaturedCoursesSection from '@/components/featured-courses-section'
import FeatureJournals from '@/components/feature-journal-sections'
import UpcomingConference from '@/components/upcoming-conference'
import LatestNews from '@/components/latest-news-section'
import ScholarshipHighLight from '@/components/scholarship-highlight-section'
import ReviewSection from '@/components/review-section'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSlider />
      <HighlightSection />
      <ServicesSection />
      <FeaturedCoursesSection />
      <FeatureJournals/>
      <UpcomingConference/>
      <LatestNews/>
      <ScholarshipHighLight/>
      <ReviewSection/>
      <ContactForm/>
      <Footer/>
    </main>
  )
}
