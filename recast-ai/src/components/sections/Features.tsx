'use client'

import { motion } from 'framer-motion'

const features = [
  {
    title: 'Streaming Output',
    description:
      'All 5 formats generate in real-time simultaneously. Watch your content appear token by token — no waiting, no refresh.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Tone Control',
    description:
      'Switch between Professional, Casual, or Witty with one click. The AI adapts voice and style — not just vocabulary.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    title: 'YouTube Support',
    description:
      'Drop any YouTube URL and we auto-fetch the transcript. No manual copy-paste. No plugin needed. Just the link.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    ),
  },
  {
    title: 'Full History',
    description:
      'Every repurposing is saved. Find, reuse, or download past outputs instantly from your dashboard.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Private by Default',
    description:
      'Your content is never used for AI training. Zero data retention beyond your own account. Read our privacy guarantee.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: '5 Formats at Once',
    description:
      'LinkedIn post, Twitter thread, email newsletter, YouTube description, and TL;DR — all generated in one run.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 border-t border-[#D4D4CC] scroll-mt-16">
      <div className="site-container">

        {/* Header */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-[#6B6B6B] uppercase tracking-[0.2em] mb-4"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#1A1A1A] max-w-sm"
          >
            Everything you need to publish faster
          </motion.h2>
        </div>

        {/* Feature rows */}
        <div className="divide-y divide-[#D4D4CC] border-t border-[#D4D4CC]">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="flex items-start gap-6 py-7 group cursor-default"
            >
              {/* Icon */}
              <div className="shrink-0 w-9 h-9 border border-[#D4D4CC] rounded-lg flex items-center justify-center text-[#6B6B6B] group-hover:border-[#1A1A1A] group-hover:text-[#1A1A1A] transition-all duration-200 mt-0.5">
                {feature.icon}
              </div>

              {/* Title + description */}
              <div className="flex-1 flex flex-col md:flex-row md:items-start gap-3">
                <h3 className="font-display font-semibold text-[0.95rem] text-[#1A1A1A] md:min-w-[200px] shrink-0">
                  {feature.title}
                </h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-lg">
                  {feature.description}
                </p>
              </div>

              {/* Index */}
              <span className="hidden md:block text-[11px] text-[#D4D4CC] font-mono shrink-0 mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
