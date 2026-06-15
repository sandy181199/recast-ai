import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { getUserByClerkId, getMonthlyUsage, getRecentRepurposings } from '@/lib/db'
import { PLAN_LIMITS } from '@/types'

export default async function DashboardPage() {
  const { userId } = await auth()
  const clerkUser = await currentUser()

  const dbUser = userId ? await getUserByClerkId(userId) : null
  const usage  = dbUser ? await getMonthlyUsage(dbUser.id) : 0
  const recent = dbUser ? await getRecentRepurposings(dbUser.id, 5) : []

  const plan  = dbUser?.plan ?? 'free'
  const limit = PLAN_LIMITS[plan]
  const firstName = clerkUser?.firstName ?? 'there'

  const usagePct = limit ? Math.min((usage / limit) * 100, 100) : 0

  return (
    <div className="p-6 md:p-10 max-w-4xl">

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-[0.2em] mb-2">Dashboard</p>
        <h1 className="font-display text-3xl font-bold text-[#1A1A1A]">
          Hey, {firstName} 👋
        </h1>
        <p className="text-[#6B6B6B] text-sm mt-1">Here's an overview of your account.</p>
      </div>

      {/* Stats row */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {/* Usage */}
        <div className="bg-[#E5E6DF] border border-[#D4D4CC] rounded-2xl p-6">
          <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-widest mb-3">This month</p>
          <p className="font-display text-4xl font-bold text-[#1A1A1A]">
            {usage}
            <span className="text-lg text-[#6B6B6B] font-normal">/{limit ?? '∞'}</span>
          </p>
          <p className="text-xs text-[#6B6B6B] mt-1">repurposings used</p>
          {limit && (
            <div className="mt-4 h-1 bg-[#D4D4CC] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1A1A1A] rounded-full transition-all"
                style={{ width: `${usagePct}%` }}
              />
            </div>
          )}
        </div>

        {/* Plan */}
        <div className="bg-[#E5E6DF] border border-[#D4D4CC] rounded-2xl p-6">
          <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-widest mb-3">Current plan</p>
          <p className="font-display text-4xl font-bold text-[#1A1A1A] capitalize">{plan}</p>
          <p className="text-xs text-[#6B6B6B] mt-1">
            {plan === 'free' ? '5 repurposings / month' : 'Unlimited repurposings'}
          </p>
          {plan === 'free' && (
            <Link
              href="/dashboard/settings"
              className="mt-4 inline-flex text-xs font-medium text-[#1A1A1A] border-b border-[#1A1A1A]/30 hover:border-[#1A1A1A] transition-colors"
            >
              Upgrade to Pro →
            </Link>
          )}
        </div>

        {/* Total runs */}
        <div className="bg-[#E5E6DF] border border-[#D4D4CC] rounded-2xl p-6">
          <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-widest mb-3">All time</p>
          <p className="font-display text-4xl font-bold text-[#1A1A1A]">{recent.length === 5 ? '5+' : recent.length}</p>
          <p className="text-xs text-[#6B6B6B] mt-1">total repurposings</p>
        </div>
      </div>

      {/* Quick action */}
      <div className="mb-10">
        <Link
          href="/dashboard/repurpose"
          className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#1A1A1A] text-[#EDEEE8] font-medium text-sm hover:bg-[#333] transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Repurposing
        </Link>
      </div>

      {/* Recent repurposings */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-lg text-[#1A1A1A]">Recent</h2>
          {recent.length > 0 && (
            <Link href="/dashboard/history" className="text-xs text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              View all →
            </Link>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="border border-dashed border-[#D4D4CC] rounded-2xl p-12 text-center">
            <div className="w-10 h-10 rounded-full border border-[#D4D4CC] flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#1A1A1A] mb-1">No repurposings yet</p>
            <p className="text-xs text-[#6B6B6B] mb-5">Paste content and get 5 formats instantly.</p>
            <Link
              href="/dashboard/repurpose"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1A1A1A] text-sm font-medium text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#EDEEE8] transition-all"
            >
              Start your first repurposing
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#D4D4CC] border border-[#D4D4CC] rounded-2xl overflow-hidden">
            {recent.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-5 py-4 bg-[#E5E6DF] hover:bg-[#EDEEE8] transition-colors">
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A] truncate max-w-xs">
                    {String(r.outputs?.linkedin ?? '').slice(0, 60) || 'Untitled'}
                    {String(r.outputs?.linkedin ?? '').length > 60 ? '…' : ''}
                  </p>
                  <p className="text-xs text-[#6B6B6B] mt-0.5 capitalize">
                    {r.tone} · {new Date(r.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-xs text-[#6B6B6B] border border-[#D4D4CC] px-2.5 py-1 rounded-full capitalize shrink-0">
                  {r.input_type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
