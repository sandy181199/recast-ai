'use client'

import { motion } from 'framer-motion'

export default function EditorialText() {
  return (
    <section className="py-24 border-t border-[#D4D4CC]">
      <div className="site-container">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left: large statement */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] text-[#1A1A1A]"
          >
            Content without distribution is just writing in a diary.
          </motion.h2>

          {/* Right: body copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="pt-2"
          >
            <p className="text-[#6B6B6B] leading-[1.8] mb-6 text-[1.05rem]">
              The best ideas don't reach the right audience because creators lack time — not talent.
              RecastAI removes the bottleneck. Write once, publish everywhere, without losing your voice or spending hours adapting formats.
            </p>
            <p className="text-[#6B6B6B] leading-[1.8] text-[1.05rem]">
              We built RecastAI because we were frustrated watching great content disappear into a single platform.
              A 3,000-word blog post became one LinkedIn update. A 45-minute podcast became nothing. That ends today.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
