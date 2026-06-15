import Link from 'next/link'

const productLinks = [
  { label: 'Features',     href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Changelog',    href: '#' },
]

const companyLinks = [
  { label: 'About',   href: '#' },
  { label: 'Blog',    href: '#' },
  { label: 'Careers', href: '#' },
]

const legalLinks = [
  { label: 'Privacy Policy',   href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy',    href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#D4D4CC] pt-16 pb-10">
      <div className="site-container">

        {/* Main grid */}
        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">

          {/* Brand + newsletter */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect width="22" height="22" rx="5" fill="#1A1A1A" />
                <path d="M6 11h10M11 6l5 5-5 5" stroke="#EDEEE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-display font-bold text-lg text-[#1A1A1A]">RecastAI</span>
            </div>
            <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-xs mb-7">
              The fastest way to turn any long-form content into every format your audience lives on.
            </p>
            {/* Newsletter */}
            <p className="text-xs font-medium text-[#1A1A1A] uppercase tracking-widest mb-3">Stay updated</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-full border border-[#D4D4CC] bg-[#E5E6DF] text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B]/60 focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
              <button className="shrink-0 px-5 py-2.5 rounded-full bg-[#1A1A1A] text-[#EDEEE8] text-sm font-medium hover:bg-[#333] transition-colors">
                →
              </button>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-[10px] font-semibold text-[#1A1A1A] uppercase tracking-widest mb-5">Product</p>
            <ul className="space-y-3.5">
              {productLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] font-semibold text-[#1A1A1A] uppercase tracking-widest mb-5">Company</p>
            <ul className="space-y-3.5">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] font-semibold text-[#1A1A1A] uppercase tracking-widest mb-5">Legal</p>
            <ul className="space-y-3.5">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#D4D4CC] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6B6B6B] text-sm">© 2026 RecastAI. All rights reserved.</p>
          <p className="text-[#6B6B6B]/50 text-xs">Built with Next.js · Powered by Claude AI</p>
        </div>

      </div>
    </footer>
  )
}
