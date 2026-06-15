export default function RepurposePage() {
  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <div className="mb-8">
        <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-[0.2em] mb-2">Repurpose</p>
        <h1 className="font-display text-3xl font-bold text-[#1A1A1A]">New Repurposing</h1>
        <p className="text-[#6B6B6B] text-sm mt-1">Paste content or drop a YouTube link to get started.</p>
      </div>

      {/* Coming in Phase 2 */}
      <div className="border border-dashed border-[#D4D4CC] rounded-2xl p-16 text-center">
        <div className="w-12 h-12 rounded-full bg-[#E5E6DF] border border-[#D4D4CC] flex items-center justify-center mx-auto mb-5">
          <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-[#1A1A1A] mb-2">AI Engine coming in Phase 2</p>
        <p className="text-xs text-[#6B6B6B] max-w-xs mx-auto">
          The repurposing tool — streaming AI output, tone selector, and YouTube support — is being built next.
        </p>
      </div>
    </div>
  )
}
