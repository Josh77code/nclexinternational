import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Layers, Users, MessageCircle, Target } from "lucide-react"

const operationPillars = [
  {
    title: "Admissions & Onboarding",
    icon: Users,
    description:
      "Our admin team walks every nurse from inquiry to full enrollment. We assess readiness, assign schedules, and unlock resources that match your NCLEX timeline.",
    highlights: [
      "Personal consultation to determine the ideal package",
      "Access to testimony hub for instant motivation",
      "Admission welcome kit with study schedules and checklists",
    ],
  },
  {
    title: "Coaching Architecture",
    icon: Layers,
    description:
      "NCLEX KEYS operates a multi-layered coaching model: General sessions, sub-classes, and personalised push segments. This guarantees no learner is left behind.",
    highlights: [
      "General classes hosted live with on-demand replays",
      "Three sub-classes that decentralise learning for busy nurses",
      "Optional one-on-one push for deeper accountability",
    ],
  },
  {
    title: "Accountability & Monitoring",
    icon: Target,
    description:
      "We deploy structured assessments, monthly feedback loops, and progress audits to keep every student on track for test-day success.",
    highlights: [
      "100 NCLEX-style pre-coaching diagnostic questions",
      "Monthly readiness reviews with assigned tutors",
      "Mandatory check-ins with customer care for service improvements",
    ],
  },
  {
    title: "Schedule Management",
    icon: Clock,
    description:
      "With fixed days, rotating sub-classes, and private tutoring slots, our calendar accommodates every shift pattern without diluting excellence.",
    highlights: [
      "Five structured study schedules: 30, 45, 60, 90, and 180 days",
      "Class replays and make-up paths for missed sessions",
      "Sunday downtime to prevent burnout and encourage reflection",
    ],
  },
  {
    title: "Student Support & Communication",
    icon: MessageCircle,
    description:
      "Communication is deliberate. Tutors respond promptly, admins manage logistics, and feedback channels stay open for improvements.",
    highlights: [
      "WhatsApp helpline: +234 703 736 7480",
      "Email support via nclexkeysintl.academy@gmail.com",
      "Tutor-student communication protocol for seamless learning",
    ],
  },
  {
    title: "Excellence & Test-Day Preparedness",
    icon: CheckCircle2,
    description:
      "We ensure only confident, well-prepared nurses test. From question banks to prayer support, every pillar aims at a single outcome: a pass.",
    highlights: [
      "Recommended question banks: Archer, Bootcamp, Nurse Achieve, UWorld",
      "Academy drills with a 200-question monthly target",
      "Celebration of every success story to inspire the next cohort",
    ],
  },
]

export default function OperationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-[#3895D3]/10">
          <div className="mx-auto max-w-5xl text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-balance">How NCLEX KEYS Operates</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our operations system combines compassionate mentorship, structured schedules, and data-driven accountability.
              Explore the engine room that keeps every learner moving toward the NCLEX pass.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-lg border border-[#072F5F]/10">
            <div className="relative h-80 w-full">
              <Image
                src="/Operation.jpeg"
                alt="NCLEX Keys operations overview"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <p className="text-sm uppercase tracking-[0.3em]">Operations Spotlight</p>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  Structured systems that translate passion into predictable NCLEX success.
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
            {operationPillars.map((pillar) => (
              <Card
                key={pillar.title}
                className="border-2 border-[#3895D3] hover:border-[#1261A0] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-2xl font-bold text-[#072F5F]">{pillar.title}</CardTitle>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#072F5F]/15 to-[#3895D3]/20 text-[#072F5F]">
                      <pillar.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {pillar.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#3895D3]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

