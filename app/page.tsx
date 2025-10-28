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
  
  const testimonyImages = [
    "/testimony1.jpg",
    "/testimony2.jpg", 
    "/testimony3.jpg",
    "/testimony4.jpg",
    "/testimony5.jpg",
    "/testimony6.jpg"
  ]

  // Auto-rotate testimonies every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimony((prev) => (prev + 1) % testimonyImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonyImages.length])

  const nextTestimony = () => {
    setCurrentTestimony((prev) => (prev + 1) % testimonyImages.length)
  }

  const prevTestimony = () => {
    setCurrentTestimony((prev) => (prev - 1 + testimonyImages.length) % testimonyImages.length)
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

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
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
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              {/* Main testimony image */}
              <div className="relative aspect-[4/3] w-full max-h-80">
                <Image
                  src={testimonyImages[currentTestimony]}
                  alt={`Student testimony ${currentTestimony + 1}`}
                  fill
                  className="object-cover transition-all duration-500 ease-in-out"
                  priority
                />
                
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Navigation arrows */}
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
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonyImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimony(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimony
                      ? "bg-primary scale-125"
                      : "bg-muted hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to testimony ${index + 1}`}
                />
              ))}
            </div>

            {/* Testimony counter */}
            <div className="text-center mt-4">
              <span className="text-sm text-muted-foreground">
                {currentTestimony + 1} of {testimonyImages.length}
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
