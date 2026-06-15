'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const stats = [
  { value: '2,400+', label: 'Active creators' },
  { value: '5 min',  label: 'Avg. setup time' },
  { value: '4.5 hrs', label: 'Saved per piece' },
  { value: '5×',     label: 'More distribution' },
]

export default function FinalCTA() {
  return (
    <section className="py-24 bg-[#1A1A1A]">
      <div className="site-container">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left: heading + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.2rem)] font-bold leading-[1.05] text-[#EDEEE8] mb-8">
              Start publishing
              <br />
              everywhere, today.
            </h2>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#EDEEE8] text-[#1A1A1A] font-medium text-sm hover:bg-white transition-all duration-300"
            >
              Get started for free
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <p className="mt-5 text-sm text-[#EDEEE8]/35">No credit card · Cancel anytime</p>
          </motion.div>

          {/* Right: stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="border border-[#EDEEE8]/10 rounded-xl p-6">
                <p className="font-display text-3xl font-bold text-[#EDEEE8] mb-1">{value}</p>
                <p className="text-sm text-[#EDEEE8]/45">{label}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
