"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { GraduationCap, AlertCircle, Shield } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const supabase = getSupabaseBrowserClient()

      console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log("Attempting login with:", formData.email)

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      console.log("Login response:", { data, authError })

      if (authError) {
        console.error("Login error:", authError)
        setError(`Login failed: ${authError.message}`)
        setLoading(false)
        return
      }

      if (!data.user) {
        setError("Failed to login")
        setLoading(false)
        return
      }

      // Get user role
      const { data: userData } = await supabase.from("users").select("role").eq("id", data.user.id).single()

      // Redirect based on role
      if (userData?.role === "instructor") {
        router.push("/dashboard/instructor")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-white overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{ animationDelay: "2s" }} />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-2 border-[#749DC8] bg-white">
        <CardHeader className="space-y-6 pb-8">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0A61C9] text-white shadow-lg shadow-[#749DC8]/50">
              <GraduationCap className="h-9 w-9" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-[#0A61C9]">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base text-[#0A61C9]">Login to access your NCLEX preparation dashboard</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="animate-fade-in border-red-500/50 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2 group">
              <Label htmlFor="email" className="text-sm font-semibold text-[#0A61C9]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-11 border-2 border-[#749DC8] bg-white focus:border-[#0A61C9] text-[#0A61C9] placeholder:text-[#0A61C9] focus:bg-white focus:text-[#0A61C9]"
                required
              />
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="password" className="text-sm font-semibold text-[#0A61C9]">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-11 border-2 border-[#749DC8] bg-white focus:border-[#0A61C9] text-[#0A61C9] placeholder:text-[#0A61C9] focus:bg-white focus:text-[#0A61C9]"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base bg-[#0A61C9] hover:bg-[#0A61C9]/90 text-white shadow-lg shadow-[#749DC8]/40 hover:shadow-xl hover:shadow-[#749DC8]/50 transition-all" 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>

            <div className="text-center text-sm pt-2">
              <span className="text-[#0A61C9]">Need an account? </span>
              <Link href="/contact" className="text-purple-600 hover:text-pink-600 font-semibold hover:underline">
                Contact the Admin Team
              </Link>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}
