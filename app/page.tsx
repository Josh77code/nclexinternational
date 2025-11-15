"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
// import dynamic from "next/dynamic"
import { CheckCircle, BookOpen, Users, Award, TrendingUp, Clock, Sparkles, Zap, Target, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

// Temporarily disabled Three.js component to fix build
// TODO: Re-enable once build is stable
// const NCLEX3DScene = dynamic(
//   () => import("@/components/nclex-3d-scene").then((mod) => ({ default: mod.NCLEX3DScene })).catch(() => ({ default: () => null })),
//   {
//     ssr: false,
//     loading: () => <div className="w-full h-full bg-transparent" />
//   }
// )

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
    <div className="min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)] dark:from-background dark:to-background">
      <Header />

      {/* MEGA HERO SECTION - MAD DESIGN */}
      <section className="relative min-h-[90vh] pt-24 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[var(--bg-gradient-start)] via-[var(--bg-gradient-end)] to-[var(--bg-gradient-start)] dark:from-background dark:via-background dark:to-background">
        {/* Animated Gradient Mesh Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(10,97,201,0.15),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(116,157,200,0.15),transparent_50%)] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(6,64,137,0.1),transparent_50%)] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(10,97,201,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,97,201,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'gridMove 20s linear infinite'
        }}></div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-[#0A61C9]/20 to-[#749DC8]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-[#064089]/20 to-[#0A61C9]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-bl from-[#749DC8]/15 to-transparent rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>

        {/* 3D Floating Orbs */}
        <div className="absolute top-32 right-32 w-32 h-32 rounded-full bg-gradient-to-br from-[#0A61C9] to-[#749DC8] opacity-30 blur-xl animate-bounce" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-32 left-32 w-24 h-24 rounded-full bg-gradient-to-tr from-[#064089] to-[#0A61C9] opacity-25 blur-lg animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>

        {/* Animated SVG Waves with Glassmorphism */}
        <div className="absolute top-0 right-0 w-full md:w-2/3 h-full opacity-40 dark:opacity-20 pointer-events-none z-0">
          <svg viewBox="0 0 1200 800" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A61C9" stopOpacity="0.8">
                  <animate attributeName="stop-opacity" values="0.6;0.9;0.6" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#749DC8" stopOpacity="0.6">
                  <animate attributeName="stop-opacity" values="0.4;0.7;0.4" dur="4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d="M0,400 Q300,300 600,350 T1200,320 L1200,800 L0,800 Z"
              fill="url(#waveGradient1)"
              filter="url(#glow)"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 50,20; 0,0"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M0,450 Q400,350 800,400 T1600,370 L1600,800 L0,800 Z"
              fill="#749DC8"
              opacity="0.4"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; -30,15; 0,0"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>

        {/* Glassmorphism Card Background */}
        <div className="absolute inset-x-0 top-1/4 h-96 bg-gradient-to-r from-white/5 via-white/10 to-white/5 dark:from-white/5 dark:via-white/10 dark:to-white/5 backdrop-blur-3xl border-y border-white/20 dark:border-white/10"></div>

        {/* Main Content */}
        <div className="relative mx-auto max-w-7xl z-10 pt-20">
          <div className="max-w-3xl space-y-10">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#0A61C9]/20 to-[#749DC8]/20 dark:from-[#0A61C9]/30 dark:to-[#749DC8]/30 backdrop-blur-md border border-[#0A61C9]/30 dark:border-[#749DC8]/30 text-[#064089] dark:text-[#749DC8] text-sm font-semibold animate-fade-in-up">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>100+ Success Stories</span>
              <Award className="w-4 h-4 ml-1" />
            </div>

            {/* Headline with Gradient Text */}
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="block bg-gradient-to-r from-[#0A61C9] via-[#064089] to-[#0A61C9] dark:from-[#749DC8] dark:via-[#0A61C9] dark:to-[#749DC8] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                NCLEX
              </span>
              <span className="block bg-gradient-to-r from-[#064089] via-[#0A61C9] to-[#749DC8] dark:from-[#0A61C9] dark:via-[#749DC8] dark:to-[#0A61C9] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] mt-2">
                KEYS
              </span>
            </h1>

            {/* Subheading with Glow Effect */}
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#064089] dark:text-[#749DC8] leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Unlock Your NCLEX Success
            </p>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Join over 100 successful nursing professionals who have transformed their NCLEX preparation into confident success through intensive, results-driven coaching from Boss B and the NCLEX KEYS team.
            </p>

            {/* CTA Buttons with Hover Effects */}
            <div className="flex flex-wrap gap-4 pt-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                asChild
                variant="default"
                className="text-lg px-8 py-7 rounded-full bg-gradient-to-r from-[#0A61C9] to-[#064089] hover:from-[#064089] hover:to-[#0A61C9] dark:from-[#749DC8] dark:to-[#0A61C9] dark:hover:from-[#0A61C9] dark:hover:to-[#749DC8] shadow-2xl shadow-[#0A61C9]/30 dark:shadow-[#749DC8]/30 hover:shadow-[#0A61C9]/50 dark:hover:shadow-[#749DC8]/50 hover:scale-105 transition-all duration-300 border-0"
              >
                <Link href="/programs" className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Start Your Journey
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="text-lg px-8 py-7 rounded-full border-2 border-[#0A61C9] dark:border-[#749DC8] text-[#0A61C9] dark:text-[#749DC8] hover:bg-[#0A61C9]/10 dark:hover:bg-[#749DC8]/10 backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              {[
                { number: '100+', label: 'Success Stories', icon: Award },
                { number: '95%', label: 'Pass Rate', icon: TrendingUp },
                { number: '24/7', label: 'Support', icon: Clock },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="group relative p-6 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 hover:border-[#0A61C9]/50 dark:hover:border-[#749DC8]/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#0A61C9]/20 dark:hover:shadow-[#749DC8]/20"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0A61C9]/10 to-transparent dark:from-[#749DC8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <stat.icon className="w-8 h-8 text-[#0A61C9] dark:text-[#749DC8] mb-3 relative z-10" />
                  <div className="text-3xl font-bold text-[#064089] dark:text-[#749DC8] mb-1 relative z-10">{stat.number}</div>
                  <div className="text-sm text-[var(--text-secondary)] relative z-10">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <ChevronRight className="w-6 h-6 text-[#0A61C9] dark:text-[#749DC8] rotate-90" />
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)] dark:from-background dark:to-background">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
              Why Choose NCLEX KEYS?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Strategic, intensive coaching that transforms NCLEX preparation into confident success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:shadow-[var(--primary)]/30 transition-all duration-300 hover:-translate-y-2 border-2 border-[var(--border)] hover:border-[var(--primary-light)] bg-card dark:bg-card"
              >
                <CardHeader>
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-[var(--primary)] mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-[var(--primary)]/50">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-xl text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-[var(--text-secondary)]">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)] dark:from-background dark:to-background">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
              Our Mission & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-2xl hover:shadow-[var(--primary)]/30 transition-all duration-300 border-2 border-[var(--border)] hover:border-[var(--primary-light)] bg-card dark:bg-card">
              <CardHeader className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-[var(--primary)] mb-2 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:shadow-[var(--primary)]/50">
                  <Target className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl text-[var(--text-primary)]">Mission</CardTitle>
                <CardDescription className="text-base leading-relaxed text-[var(--text-secondary)]">
                  NCLEX KEYS is dedicated to empowering future nurses by providing intensive, results-driven coaching and strategic mentorship. We decode the NCLEX exam through expert guidance, ensuring our students achieve licensure with confidence, efficiency, and the knowledge required for immediate professional success.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl hover:shadow-[var(--primary)]/30 transition-all duration-300 border-2 border-[var(--border)] hover:border-[var(--primary-light)] bg-card dark:bg-card">
              <CardHeader className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-[var(--primary)] mb-2 group-hover:scale-110 transition-transform group-hover:shadow-lg group-hover:shadow-[var(--primary)]/50">
                  <Sparkles className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl text-[var(--text-primary)]">Vision</CardTitle>
                <CardDescription className="text-base leading-relaxed text-[var(--text-secondary)]">
                  To be the globally recognized, premier standard for strategic NCLEX preparation, transforming aspiring nurses into confident, licensed clinicians ready to excel and lead in patient care.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="testimonials" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)] dark:from-background dark:to-background">
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
              Student Success Stories
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Hear from our students who have passed their NCLEX exams.
            </p>
          </div>

          {/* Testimony Carousel */}
          <div className="relative max-w-xl mx-auto">
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-card dark:bg-card">
              {isImageSlide ? (
                <div className="relative w-full h-[24rem] bg-card dark:bg-card flex items-center justify-center">
                  <Image
                    src={currentSlide.src}
                    alt={currentSlide.alt}
                    fill
                    className="object-contain transition-all duration-500 ease-in-out"
                    priority
                  />
                </div>
              ) : (
                <div className="p-8 bg-card dark:bg-card min-h-[22rem] flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[var(--primary)] text-xs font-semibold uppercase tracking-wide border border-[var(--border)]">
                      <Sparkles className="h-3 w-3" />
                      Testimonial Spotlight
                    </span>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                      {currentSlide.headline}
                    </h3>
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {currentSlide.body.map((paragraph: string) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 text-right text-sm font-semibold text-[var(--primary)]">
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
              <span className="text-sm text-[var(--text-secondary)]">
                {currentTestimony + 1} of {testimonySlides.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)] dark:from-background dark:to-background">
        <div className="relative mx-auto max-w-4xl text-center space-y-8 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
            Ready to Start Your Journey?
          </h2>
            <p className="text-xl text-[var(--text-secondary)]">Join our community of successful nursing professionals today.</p>
          <Button
            size="lg"
            asChild
            variant="default"
            className="text-lg px-10 py-7 shadow-xl shadow-[var(--primary)]/40"
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
