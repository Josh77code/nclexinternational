"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Shield, AlertCircle, CheckCircle } from "lucide-react"

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    email: "admin@nclexkeys.com",
    password: "Admin2025"
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const supabase = getSupabaseBrowserClient()

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (authError) {
        setError(`Login failed: ${authError.message}`)
        setLoading(false)
        return
      }

      if (!data.user) {
        setError("Login failed: No user data returned")
        setLoading(false)
        return
      }

      // Get user role
      const { data: userData } = await supabase.from("users").select("role").eq("id", data.user.id).single()

      if (userData?.role === "instructor") {
        setSuccess("✅ Admin login successful! Redirecting to instructor dashboard...")
        setTimeout(() => {
          router.push("/dashboard/instructor")
        }, 2000)
      } else {
        setError("❌ This account does not have admin privileges")
        setLoading(false)
      }
    } catch (err) {
      setError(`Login error: ${err instanceof Error ? err.message : "Unknown error"}`)
      setLoading(false)
    }
  }

  const handleTestCredentials = () => {
    setCredentials({
      email: "admin@nclexkeys.com",
      password: "Admin2025"
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0A61C9] to-[#064089] dark:from-[#60A5FA] dark:to-[#3B82F6] text-white shadow-lg">
              <Shield className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Test the admin credentials from the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 dark:text-green-200">{success}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="admin@nclexkeys.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Admin2025"
              />
            </div>

            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Testing Login..." : "Test Admin Login"}
              </Button>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={handleTestCredentials}
              >
                Fill Test Credentials
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p><strong>Default Admin Credentials:</strong></p>
              <p>Email: admin@nclexkeys.com</p>
              <p>Password: Admin2025</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
