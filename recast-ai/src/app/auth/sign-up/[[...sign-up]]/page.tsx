import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#EDEEE8] flex flex-col">
      {/* Minimal nav */}
      <header className="h-16 flex items-center px-8 border-b border-[#D4D4CC]">
        <Link href="/" className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect width="22" height="22" rx="5" fill="#1A1A1A" />
            <path d="M6 11h10M11 6l5 5-5 5" stroke="#EDEEE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display font-bold text-lg text-[#1A1A1A]">RecastAI</span>
        </Link>
      </header>

      {/* Sign up form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <SignUp
          appearance={{
            variables: {
              colorPrimary: '#1A1A1A',
              colorBackground: '#EDEEE8',
              colorText: '#1A1A1A',
              colorTextSecondary: '#6B6B6B',
              colorInputBackground: '#E5E6DF',
              colorInputText: '#1A1A1A',
              colorNeutral: '#6B6B6B',
              borderRadius: '0.75rem',
              fontFamily: 'var(--font-sans)',
            },
            elements: {
              card: 'shadow-none border border-[#D4D4CC] bg-[#EDEEE8]',
              headerTitle: 'font-display text-[#1A1A1A]',
              headerSubtitle: 'text-[#6B6B6B]',
              formButtonPrimary:
                'bg-[#1A1A1A] hover:bg-[#333] rounded-full text-[#EDEEE8] transition-colors',
              footerActionLink: 'text-[#1A1A1A] hover:text-[#333]',
              socialButtonsBlockButton:
                'border border-[#D4D4CC] bg-[#E5E6DF] hover:bg-[#EDEEE8] text-[#1A1A1A] rounded-full',
              dividerLine: 'bg-[#D4D4CC]',
              dividerText: 'text-[#6B6B6B]',
              formFieldInput:
                'border border-[#D4D4CC] bg-[#E5E6DF] text-[#1A1A1A] rounded-xl focus:border-[#1A1A1A]',
              formFieldLabel: 'text-[#1A1A1A] text-sm',
            },
          }}
        />
      </div>
    </div>
  )
}
