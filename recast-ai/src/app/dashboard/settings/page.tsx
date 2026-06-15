import { auth, currentUser } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/lib/db'
import Link from 'next/link'

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    features: ['5 repurposings / month', '3 output formats', 'Basic tone control'],
    plan: 'free',
  },
  {
    name: 'Pro',
    price: '$9/mo',
    features: ['Unlimited repurposings', 'All 5 formats', 'YouTube support', 'Full tone control', 'Unlimited history'],
    plan: 'pro',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$29/mo',
    features: ['Everything in Pro', 'Up to 5 members', 'Shared library', 'Custom brand tone', 'API access'],
    plan: 'team',
  },
]

export default async function SettingsPage() {
  const { userId } = await auth()
  const clerkUser = await currentUser()
  const dbUser = userId ? await getUserByClerkId(userId) : null
  const currentPlan = dbUser?.plan ?? 'free'

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <div className="mb-10">
        <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-[0.2em] mb-2">Settings</p>
        <h1 className="font-display text-3xl font-bold text-[#1A1A1A]">Account & Billing</h1>
        <p className="text-[#6B6B6B] text-sm mt-1">Manage your plan and account details.</p>
      </div>

      {/* Account info */}
      <section className="mb-10">
        <h2 className="font-display font-semibold text-lg text-[#1A1A1A] mb-4">Account</h2>
        <div className="bg-[#E5E6DF] border border-[#D4D4CC] rounded-2xl divide-y divide-[#D4D4CC]">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-xs text-[#6B6B6B] mb-0.5">Name</p>
              <p className="text-sm font-medium text-[#1A1A1A]">
                {clerkUser?.firstName} {clerkUser?.lastName}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-xs text-[#6B6B6B] mb-0.5">Email</p>
              <p className="text-sm font-medium text-[#1A1A1A]">
                {clerkUser?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-xs text-[#6B6B6B] mb-0.5">Current plan</p>
              <p className="text-sm font-medium text-[#1A1A1A] capitalize">{currentPlan}</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full border border-[#D4D4CC] text-[#6B6B6B] capitalize">
              {currentPlan}
            </span>
          </div>
        </div>
      </section>

      {/* Billing / Plans */}
      <section>
        <h2 className="font-display font-semibold text-lg text-[#1A1A1A] mb-4">Plans</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {pricingPlans.map((plan) => {
            const isCurrent = plan.plan === currentPlan
            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 border ${
                  isCurrent
                    ? 'border-2 border-[#1A1A1A] bg-[#E5E6DF]'
                    : 'border-[#D4D4CC] bg-[#E5E6DF]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest">{plan.name}</p>
                  {isCurrent && (
                    <span className="text-[10px] font-semibold text-[#EDEEE8] bg-[#1A1A1A] px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Current
                    </span>
                  )}
                </div>
                <p className="font-display text-2xl font-bold text-[#1A1A1A] mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[#6B6B6B]">
                      <svg className="w-3.5 h-3.5 text-[#1A1A1A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {isCurrent ? (
                  <div className="w-full text-center py-2.5 rounded-full border border-[#D4D4CC] text-xs text-[#6B6B6B]">
                    Current plan
                  </div>
                ) : (
                  <button
                    className="w-full py-2.5 rounded-full bg-[#1A1A1A] text-[#EDEEE8] text-xs font-medium hover:bg-[#333] transition-colors"
                    disabled
                    title="Billing coming in Phase 4"
                  >
                    Upgrade — coming soon
                  </button>
                )}
              </div>
            )
          })}
        </div>
        <p className="text-xs text-[#6B6B6B] mt-4">
          Stripe billing integration coming in Phase 4. Upgrades will be available then.
        </p>
      </section>
    </div>
  )
}
