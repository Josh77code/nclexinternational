"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, BookOpen, Users, Award, TrendingUp, Clock, Sparkles, Zap, Target, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function HomePage() {
  const [currentTestimony, setCurrentTestimony] = useState(0)
  
  const testimonySlides = [
    { type: "image", src: "/testimony1.jpg", alt: "NCLEX Keys student success highlight 1" },
    { type: "image", src: "/testimony2.jpg", alt: "NCLEX Keys student success highlight 2" },
    { type: "image", src: "/testimony3.jpg", alt: "NCLEX Keys student success highlight 3" },
    { type: "image", src: "/testimony4.jpg", alt: "NCLEX Keys student success highlight 4" },
    { type: "image", src: "/testimony5.jpg", alt: "NCLEX Keys student success highlight 5" },
    { type: "image", src: "/testimony6.jpg", alt: "NCLEX Keys student success highlight 6" },
    { type: "image", src: "/testimony7.jpeg", alt: "NCLEX Keys student success highlight 7" },
    { type: "image", src: "/testimony8.jpeg", alt: "NCLEX Keys student success highlight 8" },
    { type: "image", src: "/testimony9.jpeg", alt: "NCLEX Keys student success highlight 9" },
    { type: "image", src: "/testimony10.jpeg", alt: "NCLEX Keys student success highlight 10" },
    { type: "image", src: "/testimony11.jpeg", alt: "NCLEX Keys student success highlight 11" },
    { type: "image", src: "/testimony12.jpeg", alt: "NCLEX Keys student success highlight 12" },
    { type: "image", src: "/testimony13.jpeg", alt: "NCLEX Keys student success highlight 13" },
    { type: "image", src: "/testimony14.jpeg", alt: "NCLEX Keys student success highlight 14" },
    { type: "image", src: "/testimony15.jpeg", alt: "NCLEX Keys student success highlight 15" },
    { type: "image", src: "/testimony16.jpeg", alt: "NCLEX Keys student success highlight 16" },
    { type: "image", src: "/testimony17.jpeg", alt: "NCLEX Keys student success highlight 17" },
    { type: "image", src: "/testimony18.jpeg", alt: "NCLEX Keys student success highlight 18" },
    {
      type: "quote",
      headline: "Boss B the NCLEX Teacher",
      person: "Odun UK",
      body: [
        "Boss B the NCLEX TEACHER (try to work with her pressure and everything; it is all geared toward success).",
        "Boss Favour sends voice notes to keep you updated with the content—just keep listening.",
        "The Living Water: the questions are enough as a content.",
        "Lucy Nneoma is the content herself.",
        "Thank you to all the bosses for their sacrificial support towards making this a success.",
      ],
    },
    {
      type: "quote",
      headline: "Informative, Motivational, Person-Centred",
      person: "Dubem U.K",
      body: [
        "NCLEX KEYS, spearheaded by Boss B, has been one of my most informative courses in recent years.",
        "Very educative, motivational, and truly person-centred.",
        "I will be recommending the academy to more people preparing for the NCLEX.",
      ],
    },
    {
      type: "quote",
      headline: "NCLEX Is Doable",
      person: "Ella",
      body: [
        "Like our tutors and predecessors have always said, NCLEX is doable.",
        "Put in the hard work, stay persistent, follow everything the NCLEX KEYS tutors teach, and keep praying—your pass is assured.",
        "Read as if your exam is tomorrow. Do not wait for your ATT before you start preparing.",
        "Follow instructions, implement the strategies shared by our intelligent tutors, and collect your key early—they hold the keys used to unlock the USRN licence.",
        "Special thanks to Boss B whose strategies 30 minutes before my test became my questions 1, 2, and 4. God bless Boss Abigail for the two months of one-on-one tutoring that reset my brain, Boss J for the prayers, and every tutor for their impact.",
      ],
    },
    {
      type: "quote",
      headline: "Success After Multiple Attempts",
      person: "NCLEX Keys Student",
      body: [
        "Many thanks, Boss B. Thank you for allowing God to use you as a vessel of inspiration. You truly carry an oil of success that will never run dry, in Jesus' name. I'm deeply grateful to you and your team.",
        "I decided to take the bold step. I remember telling you I wanted to take a break because of my tight schedule, but you said 'No.' Although I'm not the talking type, I held on to your words.",
        "When you reviewed my UWorld scores and they were mostly in the 60s, I expected disappointment—but instead, you said I had started well. That encouragement meant so much. Every time you spoke in class, it felt like you were speaking directly to me, even when I was quietly in the background.",
        "A day before my exam on 10/11, you brought in 2 people to encourage us. I hadn't told you I'd already booked my exam, yet their words felt like they were meant just for me. I connected deeply with everything from the general classes to my one-on-one sessions with Coach Ramhat.",
        "I often listened to the class recordings instead of music while driving. They became a source of strength and motivation. My confidence grew, and I went for it.",
        "I sincerely apologize for not informing you or even Coach Ramhat before taking the test. I also connected with the May prayer recording on the general group, it may have been old, but it was powerful and still relevant. I connected with it deeply, prayed along, and asked for grace.",
        "And here I am—with a PASS! 🎉",
        "NCLEX Key is truly the best. This wasn't my first attempt, nor my second, but through God's grace, and with your guidance and support, success finally came.",
        "Once again, thank you so much. Much love to you and your amazing team. ❤️",
      ],
    },
  ] as const

  // Auto-rotate testimonies every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimony((prev) => (prev + 1) % testimonySlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonySlides.length])

  const nextTestimony = () => {
    setCurrentTestimony((prev) => (prev + 1) % testimonySlides.length)
  }

  const prevTestimony = () => {
    setCurrentTestimony((prev) => (prev - 1 + testimonySlides.length) % testimonySlides.length)
  }

  const features = [
    {
      icon: Target,
      title: "Strategic Coaching",
      description: "Intensive, results-driven coaching that meticulously decodes NCLEX exam logic.",
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Learn from Boss B and experienced educators with 25+ years of clinical practice.",
    },
    {
      icon: Award,
      title: "Proven Success",
      description: "Over 100 aspiring nurses successfully guided to NCLEX licensure with confidence.",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Content",
      description: "High-quality learning materials designed for immediate professional success.",
    },
    {
      icon: CheckCircle,
      title: "Confidence Building",
      description: "Transform from anxious test-taker to confident, competent clinician.",
    },
    {
      icon: Sparkles,
      title: "Global Engagement",
      description: "Strategic collaborations and support for nursing professionals worldwide.",
    },
  ]


  const currentSlide = testimonySlides[currentTestimony]
  const isImageSlide = currentSlide.type === "image"

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        {/* Wave-like abstract shapes - Purple theme */}
        <div className="absolute top-0 right-0 w-[600px] h-[700px] opacity-80 pointer-events-none">
          <svg viewBox="0 0 600 700" className="w-full h-full absolute top-0 right-0">
            <path
              d="M0,300 Q150,200 300,280 T600,260 L600,700 L0,700 Z"
              fill="#9333EA"
              className="animate-pulse-slow"
            />
          </svg>
        </div>
        <div className="absolute top-20 right-0 w-[500px] h-[600px] opacity-60 pointer-events-none">
          <svg viewBox="0 0 500 600" className="absolute top-0 right-0">
            <path
              d="M0,250 Q120,180 250,240 T500,220 L500,600 L0,600 Z"
              fill="#A855F7"
              className="animate-pulse-slow"
              style={{ animationDelay: "1s" }}
            />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[500px] opacity-40 pointer-events-none">
          <svg viewBox="0 0 400 500" className="absolute bottom-0 right-0">
            <path
              d="M0,200 Q100,150 200,200 T400,180 L400,500 L0,500 Z"
              fill="#C084FC"
              className="animate-pulse-slow"
              style={{ animationDelay: "2s" }}
            />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center space-y-8">
            <div className="space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 backdrop-blur-sm border-2 border-purple-200 shadow-lg">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Premier Strategic NCLEX Coaching</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance text-gray-900 leading-tight">
                Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">NCLEX Excellence</span>
              </h1>
            </div>

            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto text-pretty animate-fade-in-up stagger-1 leading-relaxed">
              Join over 100 successful nursing professionals who have unlocked their NCLEX with intensive, results-driven coaching from Boss B and the NCLEX KEYS team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fade-in-up stagger-2">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-lg px-8 py-6 shadow-xl shadow-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 rounded-lg"
              >
                <Link href="/programs">
                  <span className="flex items-center gap-2">
                    Explore Programs
                    <Zap className="h-5 w-5" />
                  </span>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-purple-200 hover:border-purple-400 bg-white hover:bg-purple-50 text-purple-700 hover:text-purple-800 text-lg px-8 py-6 transition-all hover:scale-105 hover:shadow-lg rounded-lg"
              >
                <Link href="/about">
                  <span className="flex items-center gap-2">
                    Meet Our Team
                    <Target className="h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
            {[
              { value: "100+", label: "Nurses Coached to Success", bgColor: "bg-white", textColor: "text-gray-900", shadow: "hover:shadow-purple-300/30" },
              { value: "1 Year", label: "Academy Excellence", bgColor: "bg-white", textColor: "text-gray-900", shadow: "hover:shadow-purple-300/30" },
              { value: "25 Years", label: "Clinical Experience", bgColor: "bg-white", textColor: "text-gray-900", shadow: "hover:shadow-purple-300/30" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 text-center ${stat.bgColor} border-2 border-purple-100 shadow-lg ${stat.shadow} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-300`}
              >
                <div className={`text-5xl font-bold ${stat.textColor} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Why Choose NCLEX KEYS?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Strategic, intensive coaching that transforms NCLEX preparation into confident success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:shadow-purple-300/30 transition-all duration-300 hover:-translate-y-2 border-2 border-purple-100 hover:border-purple-400 bg-white"
              >
                <CardHeader>
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-purple-600 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 group-hover:text-purple-700 transition-colors">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Our Mission & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-2xl hover:shadow-purple-300/30 transition-all duration-300 border-2 border-purple-100 hover:border-purple-400 bg-white">
              <CardHeader className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-purple-600 mb-2 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  <Target className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Mission</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-600">
                  NCLEX KEYS is dedicated to empowering future nurses by providing intensive, results-driven coaching and strategic mentorship. We decode the NCLEX exam through expert guidance, ensuring our students achieve licensure with confidence, efficiency, and the knowledge required for immediate professional success.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-purple-300/30 transition-all duration-300 border-2 border-purple-100 hover:border-purple-400 bg-white">
              <CardHeader className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-purple-600 mb-2 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:shadow-purple-500/50">
                  <Sparkles className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Vision</CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-600">
                  To be the globally recognized, premier standard for strategic NCLEX preparation, transforming aspiring nurses into confident, licensed clinicians ready to excel and lead in patient care.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="testimonials" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Student Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our students who have passed their NCLEX exams.
            </p>
          </div>

          {/* Testimony Carousel */}
          <div className="relative max-w-xl mx-auto">
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
              {isImageSlide ? (
                <div className="relative w-full h-[24rem] bg-white flex items-center justify-center">
                  <Image
                    src={currentSlide.src}
                    alt={currentSlide.alt}
                    fill
                    className="object-contain transition-all duration-500 ease-in-out"
                    priority
                  />
                </div>
              ) : (
                <div className="p-8 bg-white min-h-[22rem] flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold uppercase tracking-wide border border-purple-200">
                      <Sparkles className="h-3 w-3" />
                      Testimonial Spotlight
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {currentSlide.headline}
                    </h3>
                    <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                      {currentSlide.body.map((paragraph: string) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 text-right text-sm font-semibold text-purple-700">
                    — {currentSlide.person}
                  </div>
                </div>
              )}

              <button
                onClick={prevTestimony}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 hover:scale-110"
                aria-label="Previous testimony"
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </button>

              <button
                onClick={nextTestimony}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 hover:scale-110"
                aria-label="Next testimony"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonySlides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimony(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimony
                      ? "bg-primary scale-125"
                      : slide.type === "quote"
                      ? "bg-muted hover:bg-muted-foreground border border-primary/40"
                      : "bg-muted hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to testimony ${index + 1}`}
                />
              ))}
            </div>

            {/* Testimony counter */}
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">
                {currentTestimony + 1} of {testimonySlides.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="relative mx-auto max-w-4xl text-center space-y-8 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600">Join our community of successful nursing professionals today.</p>
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-lg px-10 py-7 shadow-xl shadow-purple-500/40 rounded-lg"
          >
            <Link href="/register">
              <span className="flex items-center gap-2">
                Get Started Now
                <Sparkles className="h-5 w-5" />
              </span>
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
