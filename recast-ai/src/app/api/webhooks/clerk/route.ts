import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { createUser, updateUserEmail, deleteUser } from '@/lib/db'

type ClerkUserEvent = {
  type: 'user.created' | 'user.updated' | 'user.deleted'
  data: {
    id: string
    email_addresses: { email_address: string; id: string }[]
    primary_email_address_id: string
  }
}

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET
  if (!secret) return new Response('Webhook secret not configured', { status: 500 })

  const headersList = await headers()
  const svix_id        = headersList.get('svix-id')
  const svix_timestamp = headersList.get('svix-timestamp')
  const svix_signature = headersList.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  const body = await req.text()

  let event: ClerkUserEvent
  try {
    const wh = new Webhook(secret)
    event = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as ClerkUserEvent
  } catch {
    return new Response('Invalid signature', { status: 400 })
  }

  const { type, data } = event
  const clerkId = data.id
  const primaryEmail = data.email_addresses.find(
    (e) => e.id === data.primary_email_address_id
  )?.email_address ?? ''

  try {
    if (type === 'user.created') {
      await createUser(clerkId, primaryEmail)
    } else if (type === 'user.updated') {
      await updateUserEmail(clerkId, primaryEmail)
    } else if (type === 'user.deleted') {
      await deleteUser(clerkId)
    }
  } catch (err) {
    console.error(`Webhook handler error for ${type}:`, err)
    return new Response('Database error', { status: 500 })
  }

  return new Response('OK', { status: 200 })
}
