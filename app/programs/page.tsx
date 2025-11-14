 "use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Users, CalendarCheck, Clock, Mail, Sparkles } from "lucide-react"
import Link from "next/link"

const packages = [
  {
    name: "General Plan",
    icon: Users,
    summary:
      "Immersive general coaching that keeps you accountable with structured group mentorship, recorded replays, and the vibrant NCLEX KEYS community.",
    highlights: [
      "Daily strategic group classes anchored by Boss B and specialist tutors",
      "Community accountability, curated resources, and testimony vault access",
      "Assessments that map your readiness and guide your weekly priorities",
    ],
  },
  {
    name: "1 in 1 Push with General Plan",
    icon: MessageCircle,
    summary:
      "The best of both worlds: full general membership plus private coaching hours that sharpen weak areas and accelerate readiness.",
    highlights: [
      "Everything in the General Plan included",
      "Dedicated tutor assigned to you from day one till you pass",
      "Weekly personalised checkpoints and rapid remediation support",
    ],
  },
  {
    name: "1 in 1 Push Alone",
    icon: CalendarCheck,
    summary:
      "Designed for nurses who need a fully tailored experience. Every minute is personalised around your goals, pace, and availability.",
    highlights: [
      "Flexible coaching blocks aligned with your shifts and time zones",
      "Focused case reviews, live drills, and confidence boosting simulations",
      "Direct, timely feedback on assignments, question banks, and strategy",
    ],
  },
  {
    name: "Fixed Days & Hours Schedule",
    icon: Clock,
    summary:
      "Stay consistent with a preset timetable that guarantees coverage of the entire syllabus while respecting your work-life rhythm.",
    highlights: [
      "Pre-arranged calendar with clearly defined milestones",
      "Rotating sub-classes so you never miss high-impact sessions",
      "Ideal for nurses balancing shifts, family time, and exam prep",
    ],
  },
]

const contactAdmin = (packageName?: string) => {
  const baseMessage =
    "Hello NCLEX KEYS Admin! I would love to get the pricing details and next steps."
  const message = packageName ? `${baseMessage} I'm interested in the ${packageName}.` : baseMessage
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/2347037367480?text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}

export default function ProgramsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-5xl text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-[#304674]/20">
              <Sparkles className="h-4 w-4 text-[#304674]" />
              <span className="text-sm font-semibold text-[#304674] tracking-wide">OUR PACKAGES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-balance">Tailored NCLEX Pathways for Every Nurse</h1>
            <p className="text-xl text-[#304674] text-pretty max-w-3xl mx-auto">
              Pricing is shared directly by our admin team so we can recommend the perfect plan for your goals, location,
              and timeline. Review the options below and reach out for your personalised quote.
            </p>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <Card
                  key={pkg.name}
                  className="flex flex-col bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-[#c6d3e3] hover:border-[#98bad5]"
                >
                  <CardHeader className="space-y-4 pb-0">
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle className="text-2xl font-bold text-[#304674]">{pkg.name}</CardTitle>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#304674]/15 to-[#304674]/20 text-[#304674]">
                        <pkg.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <p className="text-[#304674] text-sm leading-relaxed">{pkg.summary}</p>
                  </CardHeader>
                  <CardContent className="flex-1 pt-6">
                    <ul className="space-y-3 text-sm text-[#304674]">
                      {pkg.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#304674]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      className="w-full bg-[#304674] hover:bg-[#98bad5] text-white font-semibold"
                      onClick={() => contactAdmin(pkg.name)}
                    >
                      Contact Admin for Pricing
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">What You Enjoy in Every Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-[#c6d3e3] hover:border-[#98bad5] transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2">Strategic Video Lectures</h3>
                <p className="text-[#304674] text-sm">
                  Six hours weekly with Boss B and specialist tutors, replayable on-demand so you never miss a lesson.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-[#c6d3e3] hover:border-[#98bad5] transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2">Practice Questions</h3>
                <p className="text-[#304674] text-sm">
                  Curated drills, NCLEX-style assessments, and academy question banks to sharpen your exam instincts.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-[#c6d3e3] hover:border-[#98bad5] transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2">Study Materials</h3>
                <p className="text-[#304674] text-sm">
                  Downloadable curriculum, schedules, and revision checklists tailored to your target test date.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-[#c6d3e3] hover:border-[#98bad5] transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2">Progress Tracking</h3>
                <p className="text-[#304674] text-sm">
                  Monthly reviews and readiness checks backed by tutor insight and assessment data.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-[#c6d3e3] hover:border-[#98bad5] transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2">Community Access</h3>
                <p className="text-[#304674] text-sm">
                  Immediate entry into our Telegram and WhatsApp hubs for support, testimonies, and accountability.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-[#c6d3e3] hover:border-[#98bad5] transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2">Mobile Access</h3>
                <p className="text-[#304674] text-sm">
                  Learn anywhere, anytime with resources optimised for mobile, so shifts never slow your growth.
                </p>
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#304674] text-white font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Choose Your Package</h3>
                  <p className="text-[#304674]">
                    Pick the structure and support that align with your preferred learning style.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#98bad5] text-white font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Reach Out for Pricing</h3>
                  <p className="text-[#304674]">
                    Chat with our admin on WhatsApp via <span className="font-semibold">+234 703 736 7480</span> or email{" "}
                    <a className="text-primary hover:underline" href="mailto:nclexkeysintl.academy@gmail.com">
                      nclexkeysintl.academy@gmail.com
                    </a>{" "}
                    to get the exact quote and onboarding steps.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#304674] text-white font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Confirm & Enrol</h3>
                  <p className="text-[#304674]">
                    Finalise your plan, complete payment, and receive your access token for the academy.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#304674] text-white font-bold shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Start Learning</h3>
                  <p className="text-[#304674]">
                    Dive into classes, communities, and personalised guidance immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Direct Contact CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl font-bold text-[#304674]">Ready for Your Personalised Quote?</h2>
            <p className="text-[#304674] text-lg">
              Send us a message and our administrative team will guide you to the plan that guarantees your NCLEX success.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                className="w-full sm:w-auto bg-[#304674] hover:bg-[#98bad5] text-white"
                onClick={() => contactAdmin()}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp +234 703 736 7480
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-[#304674] text-[#304674] hover:bg-[#304674]/10"
                asChild
              >
                <Link href="mailto:nclexkeysintl.academy@gmail.com">
                  <Mail className="h-5 w-5 mr-2" />
                  Email nclexkeysintl.academy@gmail.com
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
