"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageCircle, Megaphone, Sparkles } from "lucide-react"

const adverts = [
  {
    title: "NCLEX Keys Prime Access",
    image: "/Advert1.jpeg",
    summary:
      "Unlock premium NCLEX mentorship with Boss B and our expert faculty. This advert spotlights our high-impact coaching blocks designed to deliver the pass in record time.",
    highlightPoints: [
      "Tailored curriculum for first-time and repeat test takers",
      "Accountability partners and live study audits",
      "Test-day readiness drills that remove guesswork",
    ],
  },
  {
    title: "Global Nursing Relocation Support",
    image: "/Advert2.jpeg",
    summary:
      "From transcript evaluation to post-pass relocation, NCLEX Keys walks every nurse through the process. This campaign highlights our relocation concierge service.",
    highlightPoints: [
      "Dedicated country-specific advisors",
      "Visa guidance, documentation templates, and interview prep",
      "Community of successful alumni working worldwide",
    ],
  },
]

const contactAdmin = (topic: string) => {
  const message = encodeURIComponent(
    `Hello NCLEX KEYS Admin! I'm interested in the "${topic}" campaign I just viewed. Please share more details and pricing.`
  )
  window.open(`https://wa.me/2347037367480?text=${message}`, "_blank")
}

export default function AdvertisementPage() {
  const [selectedAdvert, setSelectedAdvert] = useState<(typeof adverts)[number] | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-[#3895D3]/10">
          <div className="mx-auto max-w-5xl text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/80 backdrop-blur border border-[#072F5F]/20 shadow-sm">
              <Megaphone className="h-5 w-5 text-[#072F5F]" />
              <span className="text-sm font-semibold text-[#072F5F] tracking-wide">Strategic Advertisements</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-balance">
              Discover Our Latest NCLEX KEYS Campaigns
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Each advert highlights a unique advantage for our prospective students. Tap a spotlight and message our
              admin directly to engage the offer that fits your NCLEX or relocation goals.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
            {adverts.map((advert) => (
              <Card
                key={advert.title}
                className="overflow-hidden border-2 border-[#3895D3] hover:border-[#1261A0] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-white"
              >
                <div className="w-full bg-white flex flex-col">
                  <div className="w-full h-64 bg-white flex items-center justify-center">
                    <Image
                      src={advert.image}
                      alt={advert.title}
                      width={1200}
                      height={800}
                      priority
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="px-5 pt-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#072F5F]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#072F5F]">
                      <Sparkles className="h-4 w-4" />
                      Spotlight
                    </span>
                  </div>
                </div>
                <CardHeader className="space-y-3">
                  <CardTitle className="text-2xl font-bold text-[#072F5F]">{advert.title}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">{advert.summary}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {advert.highlightPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#3895D3]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    className="w-full bg-[#072F5F] hover:bg-[#1261A0] text-white font-semibold"
                    onClick={() => setSelectedAdvert(advert)}
                  >
                    View Offer & Message Admin
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <Dialog open={!!selectedAdvert} onOpenChange={() => setSelectedAdvert(null)}>
        <DialogContent className="sm:max-w-lg bg-background border-soft shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-[#072F5F]">
              {selectedAdvert?.title}
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Ready to activate this campaign? Send a WhatsApp message to our admin for immediate assistance.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Button
              className="w-full h-12 bg-[#072F5F] hover:bg-[#1261A0] text-white"
              onClick={() => selectedAdvert && contactAdmin(selectedAdvert.title)}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Message Admin on WhatsApp
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Prefer email? Write to{" "}
              <a className="text-primary font-semibold hover:underline" href="mailto:nclexkeysintl.academy@gmail.com">
                nclexkeysintl.academy@gmail.com
              </a>{" "}
              with the campaign title and our team will respond promptly.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

