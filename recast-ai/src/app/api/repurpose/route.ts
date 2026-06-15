import { auth } from '@clerk/nextjs/server'
import { getModel } from '@/lib/gemini'
import { fetchYouTubeTranscript } from '@/lib/youtube'
import { buildRepurposePrompt } from '@/lib/prompts'
import { getUserByClerkId, getMonthlyUsage, incrementUsage } from '@/lib/db'
import { supabase } from '@/lib/supabase'
import { PLAN_LIMITS } from '@/types'
import type { Tone, InputType, RepurposingOutputs } from '@/types'

function parseOutputs(text: string): RepurposingOutputs {
  const extract = (tag: string) => {
    const match = text.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))
    return match ? match[1].trim() : ''
  }
  return {
    linkedin:   extract('linkedin'),
    twitter:    extract('twitter'),
    newsletter: extract('newsletter'),
    youtube:    extract('youtube'),
    tldr:       extract('tldr'),
  }
}

export async function POST(req: Request) {
  // ── Auth ──────────────────────────────────────────────
  const { userId } = await auth()
  if (!userId) return Response.json({ message: 'Unauthorized' }, { status: 401 })

  const dbUser = await getUserByClerkId(userId)
  if (!dbUser) return Response.json({ message: 'User not found' }, { status: 404 })

  // ── Usage gate ────────────────────────────────────────
  const limit = PLAN_LIMITS[dbUser.plan]
  if (limit !== null) {
    const usage = await getMonthlyUsage(dbUser.id)
    if (usage >= limit) {
      return Response.json(
        { message: `Monthly limit reached (${limit} repurposings on ${dbUser.plan} plan). Upgrade to continue.` },
        { status: 403 }
      )
    }
  }

  // ── Parse body ────────────────────────────────────────
  const { inputText, tone, inputType, inputUrl } = await req.json() as {
    inputText: string
    tone: Tone
    inputType: InputType
    inputUrl?: string
  }

  let contentToProcess = inputText

  // ── YouTube transcript ────────────────────────────────
  if (inputType === 'youtube' && inputUrl) {
    try {
      contentToProcess = await fetchYouTubeTranscript(inputUrl)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch YouTube transcript.'
      return Response.json({ message }, { status: 400 })
    }
  }

  if (!contentToProcess || contentToProcess.trim().length < 50) {
    return Response.json({ message: 'Content is too short. Please provide at least a paragraph.' }, { status: 400 })
  }

  // ── Stream from Gemini ────────────────────────────────
  const encoder = new TextEncoder()
  let fullText = ''

  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  ;(async () => {
    try {
      const model = getModel(buildRepurposePrompt(tone))
      const result = await model.generateContentStream(contentToProcess)

      for await (const chunk of result.stream) {
        const text = chunk.text()
        if (text) {
          fullText += text
          await writer.write(encoder.encode(text))
        }
      }
    } catch (err) {
      console.error('Gemini stream error:', err)
      await writer.write(encoder.encode('\n\n[ERROR: Generation failed]'))
    } finally {
      await writer.close()

      // ── Persist after stream completes ─────────────────
      try {
        const outputs = parseOutputs(fullText)
        await supabase.from('repurposings').insert({
          user_id:    dbUser.id,
          input_text: contentToProcess.slice(0, 5000),
          input_type: inputType,
          input_url:  inputUrl ?? null,
          tone,
          outputs,
        })
        await incrementUsage(dbUser.id)
      } catch (dbErr) {
        console.error('DB save error:', dbErr)
      }
    }
  })()

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  })
}
