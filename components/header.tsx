 "use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg shadow-primary/5" : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-white dark:bg-card shadow-lg shadow-[var(--primary)]/40 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-2">
              <Logo className="h-10 w-10 text-[var(--primary)] drop-shadow-md" aria-hidden />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-[var(--primary-light)] animate-pulse" />
            </div>
            <span className="text-xl font-bold text-[var(--text-primary)] tracking-wide">
              NCLEX Keys International
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all duration-300 group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:gap-3">
            <ThemeToggle />
            <Button variant="ghost" asChild className="hover:scale-105 transition-transform">
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              variant="default"
              className="rounded-lg"
            >
              <Link href="/contact">Call Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden hover:scale-110 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[var(--text-secondary)]">Theme</span>
                <ThemeToggle />
              </div>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="default" className="w-full rounded-lg">
                <Link href="/contact">Call Now</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
