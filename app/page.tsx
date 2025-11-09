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

      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        {/* Floating shapes */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-[#3895D3]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" />
        <div className="absolute top-40 -right-32 w-96 h-96 bg-[#1261A0]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-[#072F5F]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{ animationDelay: "4s" }} />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center space-y-8">
            <div className="space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border-2 border-[#3895D3] shadow-lg">
                <Sparkles className="h-4 w-4 text-[#3895D3]" />
                <span className="text-sm font-medium text-[#072F5F]">Premier Strategic NCLEX Coaching</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                Your Path to <span className="text-primary-solid">NCLEX Excellence</span>
              </h1>
            </div>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty animate-fade-in-up stagger-1">
              Join over 100 successful nursing professionals who have unlocked their NCLEX with intensive, results-driven coaching from Boss B and the NCLEX KEYS team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fade-in-up stagger-2">
              <Button
                size="lg"
                asChild
                className="bg-primary-solid text-white text-lg px-8 py-6 shadow-xl shadow-[#3895D3]/40 hover:shadow-2xl hover:shadow-[#3895D3]/50 transition-all hover:scale-105 hover:bg-[#1261A0]"
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
                className="border-2 border-[#3895D3] hover:border-[#1261A0] bg-white hover:bg-[#3895D3]/10 text-[#072F5F] text-lg px-8 py-6 transition-all hover:scale-105 hover:shadow-lg"
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
              { value: "100+", label: "Nurses Coached to Success", color: "from-[#072F5F]/10 to-[#1261A0]/20", textColor: "text-[#072F5F]", shadow: "hover:shadow-[#072F5F]/30" },
              { value: "1 Year", label: "Academy Excellence", color: "from-[#1261A0]/10 to-[#3895D3]/20", textColor: "text-[#1261A0]", shadow: "hover:shadow-[#1261A0]/30" },
              { value: "25 Years", label: "Clinical Experience", color: "from-[#3895D3]/10 to-[#072F5F]/20", textColor: "text-[#3895D3]", shadow: "hover:shadow-[#3895D3]/30" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 text-center bg-gradient-to-br ${stat.color} border-2 border-[#3895D3] shadow-lg ${stat.shadow} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#1261A0]`}
              >
                <div className={`text-5xl font-bold ${stat.textColor} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-[#072F5F] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Why Choose NCLEX KEYS?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Strategic, intensive coaching that transforms NCLEX preparation into confident success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:shadow-[#3895D3]/30 transition-all duration-300 hover:-translate-y-2 border-2 border-[#3895D3] hover:border-[#1261A0] bg-white"
              >
                <CardHeader>
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 text-purple-600 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-colors">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Mission & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-2xl hover:shadow-[#3895D3]/30 transition-all duration-300 border-2 border-[#3895D3] hover:border-[#1261A0] bg-white">
              <CardHeader className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-600 mb-2 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:shadow-indigo-500/50">
                  <Target className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Mission</CardTitle>
                <CardDescription className="text-base leading-relaxed text-foreground">
                  NCLEX KEYS is dedicated to empowering future nurses by providing intensive, results-driven coaching and strategic mentorship. We decode the NCLEX exam through expert guidance, ensuring our students achieve licensure with confidence, efficiency, and the knowledge required for immediate professional success.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-[#3895D3]/30 transition-all duration-300 border-2 border-[#3895D3] hover:border-[#1261A0] bg-white">
              <CardHeader className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-pink-600 mb-2 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:shadow-pink-500/50">
                  <Sparkles className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Vision</CardTitle>
                <CardDescription className="text-base leading-relaxed text-foreground">
                  To be the globally recognized, premier standard for strategic NCLEX preparation, transforming aspiring nurses into confident, licensed clinicians ready to excel and lead in patient care.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="testimonials" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              Student Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                <div className="p-8 bg-gradient-to-br from-[#072F5F]/10 via-white to-[#3895D3]/10 min-h-[22rem] flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#072F5F]/10 text-[#072F5F] text-xs font-semibold uppercase tracking-wide">
                      <Sparkles className="h-3 w-3" />
                      Testimonial Spotlight
                    </span>
                    <h3 className="text-2xl font-bold text-[#072F5F]">
                      {currentSlide.headline}
                    </h3>
                    <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                      {currentSlide.body.map((paragraph: string) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 text-right text-sm font-semibold text-[#072F5F]">
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
              <span className="text-sm text-muted-foreground">
                {currentTestimony + 1} of {testimonySlides.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="relative mx-auto max-w-4xl text-center space-y-8 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground">Join our community of successful nursing professionals today.</p>
          <Button
            size="lg"
            asChild
            className="text-lg px-10 py-7"
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
