'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const links = [
  { label: 'Features',     href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing',      href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-16 flex items-center transition-all duration-500 ${
        scrolled
          ? 'bg-[#EDEEE8]/92 backdrop-blur-md border-b border-[#D4D4CC]'
          : ''
      }`}
    >
      <div className="site-container flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect width="22" height="22" rx="5" fill="#1A1A1A" />
            <path d="M6 11h10M11 6l5 5-5 5" stroke="#EDEEE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display font-bold text-lg text-[#1A1A1A]">RecastAI</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/auth/sign-in"
            className="hidden md:block text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200"
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up"
            className="px-5 py-2 rounded-full border border-[#1A1A1A] text-sm font-medium text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#EDEEE8] transition-all duration-300 whitespace-nowrap"
          >
            Get Started
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-[#1A1A1A] origin-center transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`block w-5 h-px bg-[#1A1A1A] transition-all duration-300 ${menuOpen ? 'opacity-0 -translate-x-1' : ''}`} />
            <span className={`block w-5 h-px bg-[#1A1A1A] origin-center transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 inset-x-0 bg-[#EDEEE8] border-b border-[#D4D4CC] md:hidden">
          <div className="site-container py-6 flex flex-col gap-5">
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#1A1A1A]"
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#D4D4CC] flex flex-col gap-3">
              <Link
                href="/auth/sign-in"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#6B6B6B]"
              >
                Sign in
              </Link>
              <Link
                href="/auth/sign-up"
                onClick={() => setMenuOpen(false)}
                className="w-fit px-5 py-2 rounded-full border border-[#1A1A1A] text-sm font-medium text-[#1A1A1A]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
