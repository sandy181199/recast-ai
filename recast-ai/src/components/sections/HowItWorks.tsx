'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Paste or Link',
    description:
      'Drop in any long-form content — a blog post URL, YouTube link, podcast transcript, or raw notes. We handle the rest.',
    visual: (
      <div className="bg-[#EDEEE8] border border-[#D4D4CC] rounded-xl p-5 h-44 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="h-2.5 w-3/4 bg-[#D4D4CC] rounded-full" />
          <div className="h-2.5 w-full bg-[#D4D4CC] rounded-full" />
          <div className="h-2.5 w-5/6 bg-[#D4D4CC] rounded-full" />
          <div className="h-2.5 w-4/5 bg-[#D4D4CC] rounded-full" />
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-8 flex-1 rounded-lg border border-[#D4D4CC] bg-[#E5E6DF] flex items-center px-3">
            <span className="text-xs text-[#6B6B6B]">youtube.com/watch?v=...</span>
          </div>
          <div className="h-8 w-16 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
            <span className="text-[10px] text-[#EDEEE8] font-medium">Go</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '02',
    title: 'AI Repurposes It',
    description:
      'Claude AI simultaneously rewrites your content into 5 distinct formats, matching the tone and style you choose.',
    visual: (
      <div className="bg-[#EDEEE8] border border-[#D4D4CC] rounded-xl p-5 h-44 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-[#6B6B6B]">Generating 5 formats...</span>
        </div>
        {['LinkedIn Post', 'Twitter Thread', 'Newsletter', 'YouTube Desc.', 'TL;DR'].map((f, i) => (
          <div key={f} className="flex items-center gap-2.5">
            <div className={`w-2.5 h-2.5 rounded-full border border-[#D4D4CC] flex items-center justify-center ${i < 2 ? 'bg-[#1A1A1A] border-[#1A1A1A]' : ''}`}>
              {i < 2 && <svg viewBox="0 0 8 8" fill="none" className="w-1.5 h-1.5"><path d="M1 4l2 2 4-4" stroke="#EDEEE8" strokeWidth="1.2" strokeLinecap="round"/></svg>}
            </div>
            <div className={`h-1.5 rounded-full flex-1 ${i < 2 ? 'bg-[#1A1A1A]/30' : 'bg-[#D4D4CC]'}`} />
            <span className="text-[10px] text-[#6B6B6B] w-16 shrink-0">{f}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: '03',
    title: 'Copy & Publish',
    description:
      'One click copies any format. Paste directly into LinkedIn, Twitter, your newsletter platform, anywhere.',
    visual: (
      <div className="bg-[#EDEEE8] border border-[#D4D4CC] rounded-xl p-5 h-44 flex flex-col gap-2.5">
        {[
          { label: 'LinkedIn Post', copied: true },
          { label: 'Twitter Thread', copied: false },
          { label: 'Newsletter', copied: false },
        ].map(({ label, copied }) => (
          <div key={label} className="flex items-center justify-between p-3 bg-[#E5E6DF] border border-[#D4D4CC] rounded-lg">
            <span className="text-xs text-[#1A1A1A] font-medium">{label}</span>
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
              copied ? 'bg-[#1A1A1A] text-[#EDEEE8]' : 'border border-[#D4D4CC] text-[#6B6B6B]'
            }`}>
              {copied ? 'Copied ✓' : 'Copy'}
            </span>
          </div>
        ))}
      </div>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 border-t border-[#D4D4CC] scroll-mt-16">
      <div className="site-container">

        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-[#6B6B6B] uppercase tracking-[0.2em] mb-4"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#1A1A1A] max-w-xs"
          >
            Three steps to everywhere
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              className="bg-[#E5E6DF] border border-[#D4D4CC] rounded-2xl p-6"
            >
              <div className="mb-5">{step.visual}</div>
              <p className="text-xs font-medium text-[#6B6B6B] mb-2 tracking-wider">{step.number}</p>
              <h3 className="font-display font-semibold text-[1.05rem] text-[#1A1A1A] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
