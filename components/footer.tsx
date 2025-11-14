import Link from "next/link"
import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="relative bg-white border-t-2 border-purple-200 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-20 w-64 h-64 bg-[#98bad5]/40 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-[#b2cbde]/40 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4 group">
            <div className="flex items-center gap-3">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-200 bg-white shadow-lg shadow-purple-200/40 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                <Logo className="h-12 w-12 text-purple-700 drop-shadow-md" aria-hidden />
                <span className="sr-only">NCLEX Keys International</span>
              </div>
              <span className="text-xl font-bold text-purple-700 tracking-wide">
                NCLEX Keys International
              </span>
            </div>
            <p className="text-sm text-purple-700 leading-relaxed group-hover:text-purple-600 transition-colors duration-300 font-semibold">
              Empowering nursing professionals with strategic coaching, relentless support, and transformative NCLEX outcomes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="group">
            <h3 className="font-bold text-lg mb-5 text-purple-700">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="text-sm text-purple-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-300 inline-block font-bold"
                >
                  → About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/#testimonials" 
                  className="text-sm text-purple-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-300 inline-block font-bold"
                >
                  → Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-sm text-purple-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-300 inline-block font-bold"
                >
                  → Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-purple-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-300 inline-block font-bold"
                >
                  → Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm text-purple-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-300 inline-block font-bold"
                >
                  → Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/advertisement"
                  className="text-sm text-purple-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-300 inline-block font-bold"
                >
                  → Advertisement
                </Link>
              </li>
              <li>
                <Link 
                  href="/operations"
                  className="text-sm text-purple-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-300 inline-block font-bold"
                >
                  → Our Operations
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms-policy"
                  className="text-sm text-purple-700 hover:text-purple-600 hover:translate-x-2 transition-all duration-300 inline-block font-bold"
                >
                  → Terms & Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="group">
            <h3 className="font-bold text-lg mb-5 text-purple-700">
              Programs
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-purple-700 hover:text-purple-600 transition-colors duration-300 cursor-pointer font-bold">
                ✓ NCLEX-RN Review
              </li>
              <li className="text-sm text-purple-700 hover:text-purple-600 transition-colors duration-300 cursor-pointer font-bold">
                ✓ NCLEX-PN Essentials
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="group">
            <h3 className="font-bold text-lg mb-5 text-purple-700">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-purple-700 hover:text-purple-600 transition-all duration-300 hover:translate-x-1 cursor-pointer font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:nclexkeysintl.academy@gmail.com" className="hover:text-purple-600 transition-colors duration-300">
                  nclexkeysintl.academy@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-purple-700 hover:text-purple-600 transition-all duration-300 hover:translate-x-1 cursor-pointer font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                  <Phone className="h-4 w-4" />
                </div>
                <a href="tel:+2347037367480" className="hover:text-purple-600 transition-colors duration-300">
                  +234 703 736 7480
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-purple-700 hover:text-purple-600 transition-all duration-300 hover:translate-x-1 cursor-pointer font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Ikorodu, Lagos, Nigeria</span>
              </li>
            </ul>
            
            {/* Social Media Icons */}
            <div className="mt-6">
            <h4 className="font-black text-base mb-4 text-purple-700">
              Follow Us
            </h4>
              <div className="flex gap-3">
                <a 
                  href="mailto:nclexkeysintl.academy@gmail.com"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300 hover:shadow-xl"
                  title="Email Us"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a 
                  href="https://x.com/nclexkeys?t=4GfZzurcLrtZ0fzY4oL3AA&s=08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-black to-gray-800 text-white shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300 hover:shadow-xl"
                  title="Follow us on X (Twitter)"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/groups/14597271"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300 hover:shadow-xl"
                  title="Join our LinkedIn Group"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.facebook.com/share/1FJJwajxh7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300 hover:shadow-xl"
                  title="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-purple-200 text-center">
          <p className="text-sm text-purple-700 hover:text-purple-600 transition-colors duration-300 font-bold">
            &copy; {new Date().getFullYear()} <span className="font-black">NCLEX Keys International</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
