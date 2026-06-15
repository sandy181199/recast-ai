'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    tagline: 'Great for trying it out.',
    features: [
      '5 repurposings per month',
      '3 output formats',
      'Copy to clipboard',
      'Basic tone control',
    ],
    cta: 'Get Started',
    href: '/auth/sign-up',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    tagline: 'For serious content creators.',
    features: [
      'Unlimited repurposings',
      'All 5 output formats',
      'YouTube URL support',
      'Full tone control (3 modes)',
      'Unlimited history & saves',
      'Priority processing',
    ],
    cta: 'Start Pro — Free Trial',
    href: '/auth/sign-up?plan=pro',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: 'per month',
    tagline: 'For marketing teams.',
    features: [
      'Everything in Pro',
      'Up to 5 team members',
      'Shared history & library',
      'Custom brand tone profile',
      'API access (coming soon)',
      'Priority support',
    ],
    cta: 'Start Team — Free Trial',
    href: '/auth/sign-up?plan=team',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 border-t border-[#D4D4CC] scroll-mt-16">
      <div className="site-container">

        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-[#6B6B6B] uppercase tracking-[0.2em] mb-4"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#1A1A1A]"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-[#6B6B6B] text-sm"
          >
            Start free. No credit card required. Upgrade when you need more.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-[#E5E6DF] border-2 border-[#1A1A1A] md:-mt-4 md:pb-12 md:pt-10'
                  : 'bg-[#E5E6DF] border border-[#D4D4CC]'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#1A1A1A] text-[0.65rem] font-semibold text-[#EDEEE8] tracking-widest uppercase">
                  Most Popular
                </div>
              )}

              <div className="mb-7">
                <p className="text-[10px] font-semibold text-[#6B6B6B] uppercase tracking-widest mb-3">{plan.name}</p>
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  <span className="font-display text-[3.25rem] font-bold tracking-tight text-[#1A1A1A] leading-none">
                    {plan.price}
                  </span>
                  <span className="text-[#6B6B6B] text-sm">/{plan.period}</span>
                </div>
                <p className="text-[#6B6B6B] text-xs">{plan.tagline}</p>
              </div>

              <ul className="space-y-3 mb-8 pt-6 border-t border-[#D4D4CC]">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-[#1A1A1A]">
                    <svg className="w-4 h-4 text-[#1A1A1A] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full text-center py-3.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-[#1A1A1A] text-[#EDEEE8] hover:bg-[#333]'
                    : 'border border-[#D4D4CC] text-[#1A1A1A] hover:border-[#1A1A1A]'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
