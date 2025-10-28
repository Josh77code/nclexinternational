"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageCircle, UserPlus, X, Flag } from "lucide-react"
import Link from "next/link"

export default function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectProgram = (program: any) => {
    setSelectedProgram(program)
    setIsModalOpen(true)
  }

  const handleEnrollNow = () => {
    setIsModalOpen(false)
    // Redirect to registration page
    window.location.href = "/register"
  }

  const handleMessageAdmin = () => {
    setIsModalOpen(false)
    // Open WhatsApp chat with admin
    const whatsappMessage = `Hi! I'm interested in the ${selectedProgram?.region} program (${selectedProgram?.price} ${selectedProgram?.period}). Can you help me with enrollment?`
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/2347037367480?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const programs = [
    {
      region: "NIGERIA",
      price: "30,000 NGN",
      period: "PER MONTH",
      exclusive: true,
      oneOnOne: false,
      flag: "🇳🇬",
    },
    {
      region: "AFRICAN",
      price: "35,000 NGN",
      period: "PER MONTH",
      exclusive: true,
      oneOnOne: false,
      flag: "🌍",
    },
    {
      region: "USA/CANADA",
      price: "60 US DOLLARS",
      period: "PER MONTH",
      exclusive: true,
      oneOnOne: false,
      flag: "🇺🇸",
    },
    {
      region: "EUROPE",
      price: "35 POUNDS",
      period: "PER MONTH",
      exclusive: true,
      oneOnOne: false,
      flag: "🇪🇺",
    },
    {
      region: "NIGERIA",
      price: "60,000 NGN",
      period: "PER MONTH",
      exclusive: true,
      oneOnOne: true,
      flag: "🇳🇬",
    },
    {
      region: "AFRICAN",
      price: "65,000 NGN",
      period: "PER MONTH",
      exclusive: true,
      oneOnOne: true,
      flag: "🌍",
    },
    {
      region: "USA/CANADA",
      price: "100 US DOLLARS",
      period: "PER MONTH",
      exclusive: true,
      oneOnOne: true,
      flag: "🇺🇸",
    },
    {
      region: "EUROPE",
      price: "50 POUNDS",
      period: "PER MONTH",
      exclusive: true,
      oneOnOne: true,
      flag: "🇪🇺",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-[#3895D3]/5">
          <div className="mx-auto max-w-6xl text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-balance">Our Tutoring Fees Are Location Based</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-4xl mx-auto">
              You may choose to learn with us on your own without 1 in 1 follow up (EXCLUSIVE) and you may as well opt in for a private time with a 1 in 1 NCLEX coach EXCLUSIVE with 1 in 1 push.
            </p>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map((program, index) => (
                <Card
                  key={index}
                  className="flex flex-col bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-[#3895D3] hover:border-[#1261A0]"
                >
                  <CardHeader className="text-center space-y-4 pb-6">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-3xl">{program.flag}</span>
                      <CardTitle className="text-2xl font-bold">{program.region}</CardTitle>
                    </div>
                    <Badge className="mx-auto bg-[#072F5F] hover:bg-[#1261A0] text-white">
                      {program.exclusive ? "EXCLUSIVE" : "STANDARD"}
                    </Badge>
                    {program.oneOnOne && (
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <span>ONE ON ONE PUSH</span>
                        <span>→</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 text-center space-y-2">
                    <div className="text-3xl sm:text-4xl font-bold text-[#3895D3]">{program.price}</div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wide">{program.period}</div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-[#072F5F] hover:bg-[#1261A0] text-white font-semibold" 
                      onClick={() => handleSelectProgram(program)}
                    >
                      Select Program
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#3895D3]/5">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">What's Included in All Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-[#3895D3] hover:border-[#1261A0] transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2">Video Lectures</h3>
                <p className="text-muted-foreground text-sm">Comprehensive video tutorials covering all NCLEX topics</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-[#3895D3] hover:border-[#1261A0] transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2">Practice Questions</h3>
                <p className="text-muted-foreground text-sm">
                  Thousands of practice questions with detailed explanations
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-[#3895D3] hover:border-[#1261A0] transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2">Study Materials</h3>
                <p className="text-muted-foreground text-sm">Downloadable study guides and reference materials</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-[#3895D3] hover:border-[#1261A0] transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground text-sm">Monitor your learning progress with detailed analytics</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-[#3895D3] hover:border-[#1261A0] transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2">Community Access</h3>
                <p className="text-muted-foreground text-sm">Join WhatsApp and Telegram study groups</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-[#3895D3] hover:border-[#1261A0] transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2">Mobile Access</h3>
                <p className="text-muted-foreground text-sm">Study anywhere, anytime on any device</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">How Enrollment Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#072F5F] text-white font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Choose Your Program</h3>
                  <p className="text-muted-foreground">
                    Select the program that matches your region and learning preference.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1261A0] text-white font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Register & Pay</h3>
                  <p className="text-muted-foreground">
                    Create your account and make payment via WhatsApp. Send your payment screenshot for verification.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3895D3] text-white font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Get Your Token</h3>
                  <p className="text-muted-foreground">
                    After payment verification, you'll receive an enrollment token to activate your account.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#072F5F] text-white font-bold shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Start Learning</h3>
                  <p className="text-muted-foreground">
                    Access your dashboard and begin your NCLEX preparation journey immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Program Selection Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-background border-soft shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-primary-solid">
              Choose Your Next Step
            </DialogTitle>
            <DialogDescription className="text-center text-enhanced">
              {selectedProgram && (
                <>
                  You've selected the <span className="font-semibold text-[#072F5F]">{selectedProgram.region}</span> program
                  <br />
                  <span className="text-lg font-bold text-[#3895D3]">{selectedProgram.price} {selectedProgram.period}</span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-6">
            {/* Enroll Now Button */}
            <Button 
              onClick={handleEnrollNow}
              className="w-full h-14 text-lg bg-primary-solid hover:bg-secondary-solid text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Enroll Now
            </Button>

            {/* Message Admin Button */}
            <Button 
              onClick={handleMessageAdmin}
              variant="outline"
              className="w-full h-14 text-lg border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 hover:text-green-700 transition-all duration-300 hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Message Admin on WhatsApp
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-enhanced">
              Need help choosing? Our admin can guide you through the enrollment process.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
