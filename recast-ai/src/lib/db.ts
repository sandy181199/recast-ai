import { supabase } from './supabase'

export async function getUserByClerkId(clerkId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single()
  if (error) return null
  return data
}

export async function createUser(clerkId: string, email: string) {
  const { data, error } = await supabase
    .from('users')
    .insert({ clerk_id: clerkId, email, plan: 'free' })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateUserEmail(clerkId: string, email: string) {
  const { error } = await supabase
    .from('users')
    .update({ email })
    .eq('clerk_id', clerkId)
  if (error) throw error
}

export async function deleteUser(clerkId: string) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('clerk_id', clerkId)
  if (error) throw error
}

export async function getMonthlyUsage(userId: string): Promise<number> {
  const month = new Date().toISOString().slice(0, 7) // 'YYYY-MM'
  const { data } = await supabase
    .from('usage_logs')
    .select('count')
    .eq('user_id', userId)
    .eq('month', month)
    .single()
  return data?.count ?? 0
}

export async function incrementUsage(userId: string): Promise<number> {
  const month = new Date().toISOString().slice(0, 7)
  const { data, error } = await supabase
    .rpc('increment_usage', { p_user_id: userId, p_month: month })
  if (error) throw error
  return data
}

export async function getRecentRepurposings(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from('repurposings')
    .select('id, input_type, input_url, tone, created_at, outputs')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) return []
  return data
}
