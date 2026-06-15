const items = [
  'LinkedIn Posts',
  'Twitter Threads',
  'Email Newsletters',
  'YouTube Descriptions',
  'TL;DR Summaries',
  'Blog Intros',
  'Social Hooks',
  'Email Subject Lines',
  'Podcast Show Notes',
  'Instagram Captions',
]

const repeated = [...items, ...items]

export default function Marquee() {
  return (
    <div className="py-5 bg-[#1A1A1A] overflow-hidden border-y border-[#333]">
      <div className="flex whitespace-nowrap">
        <div className="marquee-track flex items-center shrink-0">
          {repeated.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-10 text-xs font-medium text-[#EDEEE8]/50 uppercase tracking-[0.18em] pr-10">
              {item}
              <span className="text-[#EDEEE8]/20 text-base leading-none">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
