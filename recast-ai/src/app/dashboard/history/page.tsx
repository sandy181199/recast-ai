import { auth } from '@clerk/nextjs/server'
import { getUserByClerkId, getRecentRepurposings } from '@/lib/db'
import Link from 'next/link'

export default async function HistoryPage() {
  const { userId } = await auth()
  const dbUser = userId ? await getUserByClerkId(userId) : null
  const history = dbUser ? await getRecentRepurposings(dbUser.id, 50) : []

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <div className="mb-8">
        <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-[0.2em] mb-2">History</p>
        <h1 className="font-display text-3xl font-bold text-[#1A1A1A]">Past Repurposings</h1>
        <p className="text-[#6B6B6B] text-sm mt-1">Every repurposing you've ever run, all in one place.</p>
      </div>

      {history.length === 0 ? (
        <div className="border border-dashed border-[#D4D4CC] rounded-2xl p-16 text-center">
          <p className="text-sm font-medium text-[#1A1A1A] mb-1">Nothing here yet</p>
          <p className="text-xs text-[#6B6B6B] mb-5">Your history will appear here once you run your first repurposing.</p>
          <Link
            href="/dashboard/repurpose"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1A1A1A] text-sm font-medium text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#EDEEE8] transition-all"
          >
            Start repurposing
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-[#D4D4CC] border border-[#D4D4CC] rounded-2xl overflow-hidden">
          {history.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-5 py-4 bg-[#E5E6DF] hover:bg-[#EDEEE8] transition-colors cursor-pointer">
              <div>
                <p className="text-sm font-medium text-[#1A1A1A] truncate max-w-sm">
                  {String(r.outputs?.linkedin ?? '').slice(0, 80) || 'Untitled repurposing'}
                  {String(r.outputs?.linkedin ?? '').length > 80 ? '…' : ''}
                </p>
                <p className="text-xs text-[#6B6B6B] mt-0.5 capitalize">
                  {r.tone} tone · {r.input_type === 'youtube' ? 'YouTube' : 'Text'} · {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <svg className="w-4 h-4 text-[#6B6B6B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
