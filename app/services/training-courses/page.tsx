import AboutSection from '@/components/about/AboutTab'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import CourseCard from '@/components/services/CourseCard'

const COURSES = [
  {
    id: '1',
    image: '/course1.png',
    category: 'Course',
    title: 'Introduction to Fintech',
    instructor: 'Tempus leo',
    studentCount: 1357,
    duration: '4 Weeks',
    price: 140,
    originalPrice: 200,
  },
  {
    id: '2',
    image: '/course2.png',
    category: 'Course',
    title: 'Data Analysis using PLS-SEM',
    instructor: 'Tempus leo',
    studentCount: 1357,
    duration: '4 Weeks',
    price: 140,
    originalPrice: 200,
  },
  {
    id: '3',
    image: '/course3.png',
    category: 'Course',
    title: 'Green Finance and Sustainable Banking',
    instructor: 'Tempus leo',
    studentCount: 1357,
    duration: '4 Weeks',
    price: 140,
    originalPrice: 200,
  },
  {
    id: '4',
    image: '/course1.png',
    category: 'Course',
    title: 'Introduction to Fintech',
    instructor: 'Tempus leo',
    studentCount: 1357,
    duration: '4 Weeks',
    price: 140,
    originalPrice: 200,
  },
  {
    id: '5',
    image: '/course2.png',
    category: 'Course',
    title: 'Data Analysis using PLS-SEM',
    instructor: 'Tempus leo',
    studentCount: 1357,
    duration: '4 Weeks',
    price: 140,
    originalPrice: 200,
  },
  {
    id: '6',
    image: '/course3.png',
    category: 'Course',
    title: 'Green Finance and Sustainable Banking',
    instructor: 'Tempus leo',
    studentCount: 1357,
    duration: '4 Weeks',
    price: 140,
    originalPrice: 200,
  },
  {
    id: '7',
    image: '/course2.png',
    category: 'Course',
    title: 'Data Analysis using PLS-SEM',
    instructor: 'Tempus leo',
    studentCount: 1357,
    duration: '4 Weeks',
    price: 140,
    originalPrice: 200,
  },
]

import OfferedCourseCard from '@/components/services/OfferedCourseCard'
import WhyChooseCard from '@/components/services/WhyChooseCard'
import EmailCopyButton from '@/components/services/EmailCopyButton'
import { LineChart, PenTool, BookOpen, Shield, Book, MonitorPlay, Globe, GraduationCap, Users, FileText } from 'lucide-react'

const OFFERED_COURSES = [
  {
    title: 'Data Analysis using PLS-SEM',
    description: 'Partial Least Squares Structural Equation Modeling (PLS-SEM) is a powerful tool for analyzing complex relationships in research data. This course covers the fundamentals of PLS-SEM, including model construction, estimation, evaluation, and interpretation. Participants will gain practical experience using PLS-SEM software and learn how to apply this technique in their research projects.',
    icon: LineChart,
    keyTopics: [
      'Introduction to Structural Equation Modeling (SEM)',
      'Data Preparation for PLS-SEM',
      'Constructing and Estimating Models in PLS-SEM',
      'Evaluating Model Fit and Validity',
      'Advanced Analysis: Mediation, Moderation, and Multi-group Analysis',
      'Hands-on Training with SmartPLS',
    ],
    targetAudience: ['Researchers', 'Graduate students', 'Professionals', 'Academics'],
  },
  {
    title: 'Scientific Writing for Research and Publication',
    description: 'This course is designed to help researchers, graduate students, and academics master the art of scientific writing. Learn how to structure and write compelling research papers that can be published in high-impact journals. Gain insights into the entire publishing process, from manuscript submission to revision, and improve your writing style and communication skills.',
    icon: PenTool,
    keyTopics: [
      'Introduction to Scientific Writing',
      'Structuring Research Papers',
      'Academic Language and Citation Styles',
      'Writing the Introduction, Methods, Results, and Discussion',
      'Peer Review and Responding to Reviewer Feedback',
      'Manuscript Submission Process',
    ],
    targetAudience: ['Early-career Researchers', 'Professionals', 'Academics', 'Graduate students'],
  },
  {
    title: 'Financial Analysis and Reporting',
    description: 'This course provides a comprehensive overview of financial analysis and reporting practices. Learn how to interpret financial statements, assess company performance, and make informed investment decisions. Ideal for finance professionals and students looking to enhance their analytical skills.',
    icon: BookOpen,
    keyTopics: [
      'Principles of Financial Reporting',
      'Analyzing Balance Sheets and Income Statements',
      'Cash Flow Analysis',
      'Financial Ratio Analysis',
      'Forecasting and Valuation Techniques',
      'Regulatory Framework and Standards',
    ],
    targetAudience: ['Financial Analysts', 'Accountants', 'Business Students', 'Managers'],
  },
]

const WHY_CHOOSE_FEATURES = [
  {
    title: 'Expert Instructors',
    description: 'Our courses are taught by experienced academics and industry professionals with extensive expertise in their fields.',
    icon: Shield,
  },
  {
    title: 'Practical, Hands-On Learning',
    description: 'We emphasize real-world applications through case studies, exercises, and software training.',
    icon: Book,
  },
  {
    title: 'Flexible Online Learning',
    description: 'Learn at your own pace with our easy-to-follow, interactive course materials.',
    icon: MonitorPlay,
  },
  {
    title: 'Globally Recognized',
    description: 'Our training is designed to meet international standards and is recognized by professionals around the world.',
    icon: Globe,
  },
]


export default function Trainings() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#393F50] mb-8">Explore Our Courses</h1>

          {/* Filter Controls */}
          <div className="flex gap-4 justify-start mb-8">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded px-4 py-2 pr-8 text-sm text-gray-600 focus:outline-none focus:border-gray-400 cursor-pointer">
                <option>Category</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>

            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded px-4 py-2 pr-8 text-sm text-gray-600 focus:outline-none focus:border-gray-400 cursor-pointer">
                <option>Courses</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Offered Courses Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
            What Training Courses We Offer
          </h2>

          <div className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 scrollbar-hide snap-x">
            {OFFERED_COURSES.map((course, index) => (
              <div key={index} className="snap-center">
                <OfferedCourseCard {...course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] text-center mb-12">
          Why Choose Our Training Courses?
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {WHY_CHOOSE_FEATURES.map((feature, index) => (
            <WhyChooseCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Trusted Platform Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-4">
            A Platform Trusted by Students Worldwide
          </h2>
          <p className="text-gray-500 mb-12">Don't just take our word for it</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#393F50] flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-gray-600 font-medium mb-1">Students</div>
              <div className="text-3xl font-bold text-[#393F50]">4000+</div>
            </div>
            <div className="flex flex-col items-center p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#393F50] flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="text-gray-600 font-medium mb-1">Teachers</div>
              <div className="text-3xl font-bold text-[#393F50]">100+</div>
            </div>
            <div className="flex flex-col items-center p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#393F50] flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-gray-600 font-medium mb-1">Courses</div>
              <div className="text-3xl font-bold text-[#393F50]">70+</div>
            </div>
            <div className="flex flex-col items-center p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#393F50] flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="text-gray-600 font-medium mb-1">Publications</div>
              <div className="text-3xl font-bold text-[#393F50]">100+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enroll Today Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif text-[#393F50] mb-8">
            Enroll Today!
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Our courses are designed to empower you with the knowledge and skills necessary to succeed in your career and research. Whether you're looking to enhance your academic writing, advance your statistical analysis skills, or learn the latest in AI and digital transformation, we have the course for you.
          </p>
          <p className="text-gray-600 mb-8">
            Get in touch to learn more about the course schedule, fees, and enrollment process.
          </p>

          <EmailCopyButton />
        </div>
      </section>

      <Footer />
    </main>
  )
}
