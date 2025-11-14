"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GraduationCap, User, LogOut, Home } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

interface DashboardHeaderProps {
  user: any
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="border-b-2 border-[#304674]/30 bg-gradient-to-r from-[#d8e1e8] via-[#c6d3e3] to-[#b2cbde] backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#304674] text-white transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-[#304674]/50 group-hover:bg-[#98bad5]">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-[#304674]">NCLEX Keys</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="hover:bg-[#304674]/10 hover:text-[#304674]">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#304674]/10 hover:text-[#304674]">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-2 border-[#304674]/30">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-[#304674]">{user?.full_name}</p>
                    <p className="text-xs text-[#98bad5]">{user?.email}</p>
                    {user?.role === 'student' && user?.student_grade && (
                      <p className="text-xs font-semibold text-[#304674] mt-1">
                        Grade: {user.student_grade === 'starter'
                          ? 'Starter (Beginner)'
                          : user.student_grade === 'mid'
                          ? 'Mid (Intermediate)'
                          : user.student_grade === 'higher'
                          ? 'Higher (Advanced)'
                          : user.student_grade}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#304674]/30" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={loading}
                  className="text-[#304674] hover:bg-[#304674]/10 hover:text-[#304674]"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{loading ? "Logging out..." : "Logout"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
