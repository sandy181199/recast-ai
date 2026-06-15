import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const navLinks = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5V17h5.5v-4h3v4H17V10.5L10 4 3 10.5z" />
      </svg>
    ),
  },
  {
    label: 'Repurpose',
    href: '/dashboard/repurpose',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15m-6.55-1.5h-6.5" />
      </svg>
    ),
  },
  {
    label: 'History',
    href: '/dashboard/history',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h.655c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l.328.566a1.125 1.125 0 01-.26 1.43l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-.328.566a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-.655c-.55 0-1.02-.397-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-.328-.566a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l.328-.566a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect('/auth/sign-in')

  return (
    <div className="min-h-screen bg-[#EDEEE8] flex">

      {/* Sidebar */}
      <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-[#D4D4CC] bg-[#EDEEE8] fixed h-full">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-[#D4D4CC]">
          <Link href="/" className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <rect width="22" height="22" rx="5" fill="#1A1A1A" />
              <path d="M6 11h10M11 6l5 5-5 5" stroke="#EDEEE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-display font-bold text-base text-[#1A1A1A]">RecastAI</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-0.5">
          {navLinks.map(({ label, href, icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#E5E6DF] transition-all duration-150 group"
            >
              <span className="text-[#6B6B6B] group-hover:text-[#1A1A1A] transition-colors">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom: user + plan badge */}
        <div className="px-4 py-4 border-t border-[#D4D4CC] flex items-center gap-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8',
              },
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-[#1A1A1A] truncate">My Account</p>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-[#D4D4CC] text-[#6B6B6B] uppercase tracking-wide">
              Free
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 h-14 bg-[#EDEEE8] border-b border-[#D4D4CC] flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
            <rect width="22" height="22" rx="5" fill="#1A1A1A" />
            <path d="M6 11h10M11 6l5 5-5 5" stroke="#EDEEE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display font-bold text-base text-[#1A1A1A]">RecastAI</span>
        </Link>
        <UserButton />
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-56 min-h-screen pt-14 md:pt-0">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 h-16 bg-[#EDEEE8] border-t border-[#D4D4CC] flex items-center justify-around px-2">
        {navLinks.map(({ label, href, icon }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-1 py-1 px-3 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
          >
            {icon}
            <span className="text-[10px]">{label}</span>
          </Link>
        ))}
      </nav>

    </div>
  )
}
