"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, GraduationCap, Phone, Shield } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      <div className="absolute top-20 -right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" />
      <div className="absolute bottom-20 -left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{ animationDelay: "2s" }} />

      <Card className="w-full max-w-xl relative z-10 shadow-2xl border-2 border-[#c6d3e3] bg-white/95 backdrop-blur">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 text-white shadow-lg shadow-purple-500/50">
              <GraduationCap className="h-9 w-9" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-[#304674]">
              Accounts Are Provisioned by Admin
            </CardTitle>
            <CardDescription className="text-base text-[#304674]">
              NCLEX Keys creates every student profile internally to keep grades and access in sync. Please reach out when you are ready to begin and we will send your login details.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-start gap-3 rounded-lg border border-[#c6d3e3] bg-[#d8e1e8] p-4">
            <AlertCircle className="mt-1 h-5 w-5 text-[#304674]" />
            <div className="space-y-2 text-sm text-gray-700">
              <p className="font-semibold text-[#304674]">How onboarding works now:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Admin creates your NCLEX Keys account for you.</li>
                <li>Your starting grade (Starter / Mid / Higher) is assigned immediately.</li>
                <li>You will receive your login email and password from the admin team.</li>
                <li>Your grade can be upgraded any time as you progress.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-900 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Need an account? Contact us directly:
            </p>
            <div className="flex flex-col gap-2 text-sm text-blue-800">
              <p>Email: <Link href="mailto:nclexkeysintl.academy@gmail.com" className="font-semibold underline">nclexkeysintl.academy@gmail.com</Link></p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                WhatsApp: <Link href="https://wa.me/2347037367480" target="_blank" className="font-semibold underline">+234 703 736 7480</Link>
              </p>
              <p>We will set up your login and assign the correct grade instantly.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/50">
              <Link href="https://wa.me/2347037367480" target="_blank">
                Message Admin on WhatsApp
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 border-2 border-[#c6d3e3] text-purple-700 hover:bg-purple-50">
              <Link href="/contact">
                Contact Page
              </Link>
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500">
            Already have credentials? <Link href="/login" className="font-semibold text-purple-600 hover:text-pink-600 underline">Login here</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
