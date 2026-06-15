export type Plan = 'free' | 'pro' | 'team'
export type Tone = 'professional' | 'casual' | 'witty'
export type InputType = 'text' | 'youtube'

export interface User {
  id: string
  clerk_id: string
  email: string
  plan: Plan
  created_at: string
}

export interface RepurposingOutputs {
  linkedin: string
  twitter: string
  newsletter: string
  youtube: string
  tldr: string
}

export interface Repurposing {
  id: string
  user_id: string
  input_text: string
  input_type: InputType
  input_url?: string
  tone: Tone
  outputs: RepurposingOutputs | null
  created_at: string
}

export const PLAN_LIMITS: Record<Plan, number | null> = {
  free: 5,
  pro: null,   // unlimited
  team: null,
}

export const FORMAT_LABELS: Record<keyof RepurposingOutputs, string> = {
  linkedin:   'LinkedIn Post',
  twitter:    'Twitter Thread',
  newsletter: 'Email Newsletter',
  youtube:    'YouTube Description',
  tldr:       'TL;DR',
}
