"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, GraduationCap, Phone, Shield } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-white overflow-hidden">
      <div className="absolute top-20 -right-20 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" />
      <div className="absolute bottom-20 -left-20 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{ animationDelay: "2s" }} />

      <Card className="w-full max-w-xl relative z-10 shadow-2xl border-2 border-[#749DC8] bg-white/95 backdrop-blur">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0A61C9] text-white shadow-lg shadow-[#749DC8]/50">
              <GraduationCap className="h-9 w-9" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-[#0A61C9]">
              Accounts Are Provisioned by Admin
            </CardTitle>
            <CardDescription className="text-base text-[#0A61C9]">
              NCLEX Keys creates every student profile internally to keep grades and access in sync. Please reach out when you are ready to begin and we will send your login details.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-start gap-3 rounded-lg border border-[#749DC8] bg-[#F1F7F9] p-4">
            <AlertCircle className="mt-1 h-5 w-5 text-[#0A61C9]" />
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-semibold text-[#0A61C9]">How onboarding works now:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Admin creates your NCLEX Keys account for you.</li>
                <li>Your starting grade (Starter / Mid / Higher) is assigned immediately.</li>
                <li>You will receive your login email and password from the admin team.</li>
                <li>Your grade can be upgraded any time as you progress.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3 rounded-lg border border-[#749DC8] bg-[#F1F7F9] p-4">
            <p className="text-sm font-semibold text-[#0A61C9] flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Need an account? Contact us directly:
            </p>
            <div className="flex flex-col gap-2 text-sm text-[#0A61C9]">
              <p>Email: <Link href="mailto:nclexkeysintl.academy@gmail.com" className="font-semibold underline">nclexkeysintl.academy@gmail.com</Link></p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                WhatsApp: <Link href="https://wa.me/2347037367480" target="_blank" className="font-semibold underline">+234 703 736 7480</Link>
              </p>
              <p>We will set up your login and assign the correct grade instantly.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1 bg-[#0A61C9] hover:bg-[#0A61C9]/90 text-white shadow-lg shadow-[#749DC8]/40 hover:shadow-xl hover:shadow-[#749DC8]/50">
              <Link href="https://wa.me/2347037367480" target="_blank">
                Message Admin on WhatsApp
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 border-2 border-[#749DC8] text-[#0A61C9] hover:bg-[#F1F7F9]">
              <Link href="/contact">
                Contact Page
              </Link>
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500">
            Already have credentials? <Link href="/login" className="font-semibold text-[#0A61C9] hover:text-[#0A61C9] underline">Login here</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
