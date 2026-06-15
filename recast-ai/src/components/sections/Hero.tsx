'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
}

export default function Hero() {
  return (
    <section className="relative min-h-screen">
      <div className="flex flex-col min-h-screen pt-16">
        <div className="site-container flex-1 flex flex-col lg:flex-row items-center justify-between gap-16 py-20">

          {/* Left: text */}
          <div className="lg:max-w-[560px] w-full">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4D4CC] bg-[#E5E6DF] mb-10 w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-[#6B6B6B] tracking-wide">Powered by Claude AI</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="font-display text-[clamp(2.8rem,5.5vw,5rem)] font-bold leading-[1.05] tracking-tight text-[#1A1A1A] mb-7"
            >
              Your best ideas
              <br />
              deserve{' '}
              <span className="border-b-[3px] border-[#1A1A1A]">every platform.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.22}
              className="text-[1.05rem] text-[#6B6B6B] leading-[1.8] mb-10 max-w-[460px]"
            >
              Paste a blog post, drop a YouTube link, or upload a transcript.
              Get LinkedIn posts, Twitter threads, newsletters, and more — in seconds.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.34}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1A1A1A] text-[#EDEEE8] font-medium text-sm hover:bg-[#333] transition-all duration-300"
              >
                Start for Free
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#D4D4CC] text-[#1A1A1A] font-medium text-sm hover:border-[#1A1A1A] transition-all duration-300"
              >
                See how it works
              </Link>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.46}
              className="mt-10 text-sm text-[#6B6B6B]"
            >
              <span className="font-semibold text-[#1A1A1A]">2,400+</span>{' '}
              creators already using RecastAI · No credit card required
            </motion.p>
          </div>

          {/* Right: product mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:flex-1 w-full lg:max-w-[520px]"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-[#E5E6DF] border border-[#D4D4CC] rounded-2xl p-6 shadow-[0_4px_40px_rgba(26,26,26,0.08)]">
                {/* Input */}
                <div className="bg-[#EDEEE8] border border-[#D4D4CC] rounded-xl p-4 mb-4">
                  <p className="text-[10px] font-medium text-[#6B6B6B] uppercase tracking-wider mb-2">Your content</p>
                  <p className="text-sm text-[#1A1A1A] leading-relaxed">
                    "The future of AI is not about replacing humans — it's about augmenting human capability in ways we never thought possible..."
                  </p>
                </div>

                {/* Format tabs */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {['LinkedIn', 'Twitter', 'Newsletter', 'TL;DR'].map((tab, i) => (
                    <span
                      key={tab}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        i === 0
                          ? 'bg-[#1A1A1A] text-[#EDEEE8]'
                          : 'border border-[#D4D4CC] text-[#6B6B6B]'
                      }`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>

                {/* Generated output */}
                <div className="bg-[#EDEEE8] border border-[#D4D4CC] rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-medium text-[#6B6B6B] uppercase tracking-wider">LinkedIn Post · Generated</span>
                  </div>
                  <p className="text-sm text-[#1A1A1A] leading-relaxed mb-1.5">
                    After 10 years in AI, I've seen one consistent truth: this technology isn't here to replace us.
                  </p>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    It's here to multiply what we can do. Here are 5 insights that changed how I think about human-AI collaboration...
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#D4D4CC] flex items-center justify-between">
                    <span className="text-xs text-[#6B6B6B]">247 words · Ready to post</span>
                    <button className="text-xs font-medium text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1 rounded-full hover:bg-[#1A1A1A] hover:text-[#EDEEE8] transition-all">
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating stat */}
              <div className="absolute -bottom-5 -left-5 bg-[#1A1A1A] text-[#EDEEE8] rounded-xl px-4 py-3 shadow-lg">
                <p className="text-[10px] text-[#EDEEE8]/50 mb-0.5">Avg. time saved</p>
                <p className="font-display font-bold text-xl leading-none">4.5 hrs</p>
                <p className="text-[10px] text-[#EDEEE8]/50 mt-0.5">per content piece</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
