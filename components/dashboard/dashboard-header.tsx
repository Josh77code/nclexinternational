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
    <header className="border-b-2 border-[#3895D3]/30 bg-gradient-to-r from-slate-50/80 via-blue-50/80 to-slate-100/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-solid text-white transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-[#3895D3]/50 group-hover:bg-secondary-solid">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-primary-solid">NCLEX Keys</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="hover:bg-[#3895D3]/10 hover:text-[#3895D3]">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-[#3895D3]/10 hover:text-[#3895D3]">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-2 border-[#3895D3]/30">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-[#072F5F]">{user?.full_name}</p>
                    <p className="text-xs text-[#1261A0]">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#3895D3]/30" />
                <DropdownMenuItem onClick={handleLogout} disabled={loading} className="text-[#072F5F] hover:bg-[#3895D3]/10 hover:text-[#3895D3]">
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
