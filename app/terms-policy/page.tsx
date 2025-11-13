import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const introductionParagraphs = [
  "Welcome to NCLEX KEYS! We are thrilled that you've chosen us to guide you on your NCLEX journey to success. Our academy delivers comprehensive content mastery, question-handling skill, and strategic mentorship that guarantee you are ready for the exam.",
  "We operate as an online academy staffed by well-equipped, dedicated, and success-driven tutors. Boss B teaches live on Telegram for six hours every week, and every class is recorded so you can replay sessions at any time.",
  "The academy runs three sub-classes in addition to the general class. This decentralised structure allows you to participate regardless of your schedule, and—with a single subscription—you can learn across every class when time permits.",
  "Students are encouraged to move progressively across the sub-classes. By the third month, we expect you to have completed the heavy tasks in all classes so we can assess readiness to test. Everyone is encouraged to learn at a healthy pace, and our admin director remains available on WhatsApp (+234 703 736 7480) for clarifications.",
]

const generalPolicies = [
  "Approach this policy with an open heart—digest every detail for maximum benefit.",
  "Listen to at least ten of our testimonials on the testimony page (Telegram). We provide both written and audio testimonies from first-time and multiple-attempt test takers to boost your confidence.",
  "You will complete an assessment of 100 NCLEX-style questions. Results help us recommend how long you should prepare before testing.",
  "We maintain five study schedules: 30, 45, 60, 90, and 180 days. Your diagnostic outcome determines the advised plan.",
  "The academy runs continuously. The day you start becomes Day 1 of the schedule assigned to you.",
  "Classes are delivered via Telegram (general and sectional recordings). Attendance is mandatory for all scheduled classes, including one-on-one lectures.",
  "If you must miss a class, provide at least six hours' notice and catch up on the recordings promptly. We expect 100% attendance but understand work schedules.",
  "If you do not have an exam date yet, allow the academy to guide you. We only release nurses to test when confidence and competence meet our standard.",
  "Customer care checks in monthly to gather feedback. Please engage and share areas we can improve.",
  "Payments operate on a 30-day cycle. Renewal reminders arrive two days before expiry. Failure to renew after the grace window (without prior notice) leads to removal from learning pages.",
  "We endorse Archer, Bootcamp, Nurse Achieve, and UWorld question banks, but will work with whichever you prefer.",
  "Our academy question bank targets 200 questions per month. If two weeks pass without an attempt, request a fresh link from admin. (Currently under review—we will notify you once the platform resumes.)",
  "Sundays are intentionally free. Use the day to rest, reflect, and review your notes to avoid burnout.",
]

const generalClassPolicies = [
  "Missing a scheduled lecture without prior notice counts as a missed class. Notify us at least eight hours in advance to reschedule.",
  "Report inaccuracies or inconsistencies to the admin director through WhatsApp (+234 703 736 7480). Your feedback is treated confidentially.",
  "We celebrate testimonies in style! Share your story when you pass—it fuels hope for others.",
  "Avoid calling tutors directly unless pre-arranged. Send a message or voice note instead and allow up to 12 hours for a response.",
]

const oneOnOnePolicies = [
  "All tutors are kind-hearted, committed, and stay assigned to you until you pass. Boss B receives periodic reports and may give personalised assignments.",
  "Build a transparent relationship with your tutor. Share every obstacle so we can adjust your preparation plan.",
  "Ensure you receive your 16-hour monthly contact time. If the time has not been fulfilled before renewal, coordinate with your tutor to complete the hours.",
  "Remind your tutor ahead of each scheduled session and send at least six hours' notice if you need to cancel, otherwise the session will not be rescheduled.",
  "Cluster teaching is available—students can opt to learn together and receive six hours of weekly tutoring instead of four. Ensure the arrangement supports your schedule.",
]

const paymentPolicies = [
  "Subscriptions must be renewed on or before the due date. A two-day grace period exists; afterwards, non-renewal triggers removal from all platforms.",
  "Share every payment receipt with the admin director via WhatsApp on +234 703 736 7480.",
]

const returnPolicyParagraphs = [
  "NCLEX KEYS promises a 100% pass rate; however, we plan for contingencies. Should an eventuality occur after the exam, the academy reviews the circumstances before determining the percentage of coaching credited toward your next attempt.",
  "We aim to prevent retakes through diligent preparation. Kindly reciprocate by investing the required effort.",
]

const returnPolicyTerms = [
  "You must be ready to resume study immediately.",
  "You must plan to retest within three months of the previous attempt.",
  "To access assessments and the refund policy, you must transition into the one-on-one push if your previous subscription was general. This may require a package upgrade.",
  "If the academy advised you to wait before testing and you proceeded regardless, resulting setbacks will not qualify for the payback policy.",
]

const conclusionParagraphs = [
  "We are committed to helping you achieve success on your NCLEX journey. Review these policies carefully so we can partner effectively and celebrate your win soon.",
  "Location: Ikorodu, Lagos, Nigeria. Telephone: +234 912 914 7988 / +234 703 736 7480. Email: nclexkeysintl.academy@gmail.com.",
  "Welcome once again to NCLEX KEYS. We love you dearly and cannot wait to celebrate your pass!",
]

export default function TermsPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-[#3895D3]/10">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-balance">NCLEX KEYS Terms & Policy</h1>
            <p className="text-muted-foreground text-lg">
              Ikorodu, Lagos, Nigeria • WhatsApp: +234 703 736 7480 • Phone: +234 912 914 7988 • Email:
              nclexkeysintl.academy@gmail.com
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 space-y-12 max-w-5xl mx-auto">
          <Card className="border-2 border-[#3895D3]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#072F5F]">1. Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              {introductionParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-[#3895D3]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#072F5F]">2. General Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <ul className="list-disc list-inside space-y-3">
                {generalPolicies.map((policy) => (
                  <li key={policy}>{policy}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#3895D3]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#072F5F]">2a. General Classes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <ul className="list-disc list-inside space-y-3">
                {generalClassPolicies.map((policy) => (
                  <li key={policy}>{policy}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#3895D3]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#072F5F]">2b. One-on-One Push</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <ul className="list-disc list-inside space-y-3">
                {oneOnOnePolicies.map((policy) => (
                  <li key={policy}>{policy}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#3895D3]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#072F5F]">2c. Payment Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <ul className="list-disc list-inside space-y-3">
                {paymentPolicies.map((policy) => (
                  <li key={policy}>{policy}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#3895D3]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#072F5F]">3. Return Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              {returnPolicyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div>
                <p className="font-semibold text-[#072F5F] mb-2">Terms & Conditions</p>
                <ul className="list-disc list-inside space-y-3">
                  {returnPolicyTerms.map((policy) => (
                    <li key={policy}>{policy}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#3895D3]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#072F5F]">4. Conclusion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              {conclusionParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}








