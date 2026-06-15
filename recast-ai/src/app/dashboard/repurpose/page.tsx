'use client'

import { useState, useRef, useCallback } from 'react'
import type { Tone, InputType } from '@/types'

// ── Types ─────────────────────────────────────────────────────────────────────
type Outputs = { linkedin: string; twitter: string; newsletter: string; youtube: string; tldr: string }
type FormatKey = keyof Outputs

const FORMATS: { key: FormatKey; label: string }[] = [
  { key: 'linkedin',   label: 'LinkedIn' },
  { key: 'twitter',    label: 'Twitter / X' },
  { key: 'newsletter', label: 'Newsletter' },
  { key: 'youtube',    label: 'YouTube' },
  { key: 'tldr',       label: 'TL;DR' },
]

const TONES: { value: Tone; label: string; desc: string }[] = [
  { value: 'professional', label: 'Professional', desc: 'Authoritative & insightful' },
  { value: 'casual',       label: 'Casual',       desc: 'Friendly & conversational' },
  { value: 'witty',        label: 'Witty',         desc: 'Clever & entertaining' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function extractTag(text: string, tag: string): string {
  const complete = text.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))
  if (complete) return complete[1].trim()
  const partial = text.match(new RegExp(`<${tag}>([\\s\\S]*?)$`))
  if (partial) return partial[1].trimStart()
  return ''
}

function getActiveTag(text: string): FormatKey | null {
  const order: FormatKey[] = ['linkedin', 'twitter', 'newsletter', 'youtube', 'tldr']
  for (const tag of [...order].reverse()) {
    if (text.includes(`<${tag}>`)) return tag
  }
  return null
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function RepurposePage() {
  const [inputType, setInputType]   = useState<InputType>('text')
  const [inputText, setInputText]   = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [tone, setTone]             = useState<Tone>('professional')
  const [isLoading, setIsLoading]   = useState(false)
  const [activeTab, setActiveTab]   = useState<FormatKey>('linkedin')
  const [outputs, setOutputs]       = useState<Outputs>({ linkedin: '', twitter: '', newsletter: '', youtube: '', tldr: '' })
  const [copied, setCopied]         = useState<FormatKey | null>(null)
  const [error, setError]           = useState<string | null>(null)
  const [isDone, setIsDone]         = useState(false)
  const accumulated                 = useRef('')

  const handleSubmit = useCallback(async () => {
    setIsLoading(true)
    setIsDone(false)
    setError(null)
    accumulated.current = ''
    setOutputs({ linkedin: '', twitter: '', newsletter: '', youtube: '', tldr: '' })
    setActiveTab('linkedin')

    try {
      const res = await fetch('/api/repurpose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputText:  inputType === 'text' ? inputText : '',
          tone,
          inputType,
          inputUrl:   inputType === 'youtube' ? youtubeUrl : undefined,
        }),
      })

      if (!res.ok) {
        const { message } = await res.json()
        setError(message ?? 'Something went wrong.')
        return
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        accumulated.current += decoder.decode(value, { stream: true })
        const acc = accumulated.current

        // Auto-switch tab to whichever section is actively streaming
        const active = getActiveTag(acc)
        if (active) setActiveTab(active)

        setOutputs({
          linkedin:   extractTag(acc, 'linkedin'),
          twitter:    extractTag(acc, 'twitter'),
          newsletter: extractTag(acc, 'newsletter'),
          youtube:    extractTag(acc, 'youtube'),
          tldr:       extractTag(acc, 'tldr'),
        })
      }

      setIsDone(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [inputText, youtubeUrl, tone, inputType])

  const handleCopy = (key: FormatKey) => {
    navigator.clipboard.writeText(outputs[key])
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const hasOutput = Object.values(outputs).some(Boolean)
  const charCount = (inputType === 'text' ? inputText : youtubeUrl).length
  const canSubmit = !isLoading && (
    (inputType === 'text' && inputText.trim().length >= 50) ||
    (inputType === 'youtube' && youtubeUrl.trim().length > 0)
  )

  return (
    <div className="p-6 md:p-10 h-full">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-[0.2em] mb-2">Repurpose</p>
        <h1 className="font-display text-3xl font-bold text-[#1A1A1A]">New Repurposing</h1>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6 items-start">

        {/* ── Left: Input panel ────────────────────────────────────────────── */}
        <div className="bg-[#E5E6DF] border border-[#D4D4CC] rounded-2xl p-6 space-y-5">

          {/* Input type toggle */}
          <div className="flex gap-1 p-1 bg-[#D4D4CC]/40 rounded-full w-fit">
            {(['text', 'youtube'] as InputType[]).map((type) => (
              <button
                key={type}
                onClick={() => setInputType(type)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  inputType === type
                    ? 'bg-[#1A1A1A] text-[#EDEEE8]'
                    : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
                }`}
              >
                {type === 'text' ? 'Paste Text' : 'YouTube URL'}
              </button>
            ))}
          </div>

          {/* Input area */}
          {inputType === 'text' ? (
            <div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your blog post, article, podcast transcript, or any long-form content here…"
                rows={12}
                className="w-full bg-[#EDEEE8] border border-[#D4D4CC] rounded-xl p-4 text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B]/60 resize-none focus:outline-none focus:border-[#1A1A1A] transition-colors leading-relaxed"
              />
              <p className="text-xs text-[#6B6B6B] mt-1.5">
                {charCount} chars {charCount < 50 && charCount > 0 && <span className="text-amber-600">— need at least 50</span>}
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 bg-[#EDEEE8] border border-[#D4D4CC] rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-[#6B6B6B] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B]/60 focus:outline-none"
                />
              </div>
              <p className="text-xs text-[#6B6B6B] mt-1.5">We'll fetch the transcript automatically — no API key needed.</p>
            </div>
          )}

          {/* Tone selector */}
          <div>
            <p className="text-xs font-medium text-[#1A1A1A] uppercase tracking-widest mb-3">Tone</p>
            <div className="grid grid-cols-3 gap-2">
              {TONES.map(({ value, label, desc }) => (
                <button
                  key={value}
                  onClick={() => setTone(value)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                    tone === value
                      ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#EDEEE8]'
                      : 'border-[#D4D4CC] bg-[#EDEEE8] text-[#1A1A1A] hover:border-[#1A1A1A]'
                  }`}
                >
                  <p className="text-xs font-semibold">{label}</p>
                  <p className={`text-[10px] mt-0.5 leading-tight ${tone === value ? 'text-[#EDEEE8]/60' : 'text-[#6B6B6B]'}`}>
                    {desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full py-4 rounded-full bg-[#1A1A1A] text-[#EDEEE8] font-medium text-sm hover:bg-[#333] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Generating…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                Repurpose Content
              </>
            )}
          </button>
        </div>

        {/* ── Right: Output panel ────────────────────────────────────────────── */}
        <div className="bg-[#E5E6DF] border border-[#D4D4CC] rounded-2xl overflow-hidden min-h-[480px] flex flex-col">

          {/* Format tabs */}
          <div className="flex border-b border-[#D4D4CC] overflow-x-auto">
            {FORMATS.map(({ key, label }) => {
              const hasContent = outputs[key].length > 0
              const isActive   = activeTab === key
              const isStreaming = isLoading && getActiveTag(accumulated.current) === key
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-all duration-200 border-b-2 flex items-center gap-1.5 ${
                    isActive
                      ? 'border-[#1A1A1A] text-[#1A1A1A] bg-[#EDEEE8]'
                      : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#EDEEE8]/50'
                  }`}
                >
                  {label}
                  {isStreaming && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  )}
                  {hasContent && !isStreaming && isDone && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]/30 shrink-0" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Output content */}
          <div className="flex-1 relative">
            {!hasOutput && !isLoading ? (
              /* Empty state */
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="w-12 h-12 rounded-full border border-[#D4D4CC] flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[#1A1A1A] mb-1">5 formats, one click</p>
                <p className="text-xs text-[#6B6B6B] max-w-xs">
                  Paste content or drop a YouTube link, pick your tone, and watch LinkedIn, Twitter, Newsletter, YouTube, and TL;DR generate in real time.
                </p>
              </div>
            ) : (
              <div className="p-6">
                {/* Content for active tab */}
                {FORMATS.map(({ key }) => (
                  <div key={key} className={activeTab === key ? 'block' : 'hidden'}>
                    {outputs[key] ? (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-xs text-[#6B6B6B]">
                            {outputs[key].split(/\s+/).filter(Boolean).length} words
                          </p>
                          <button
                            onClick={() => handleCopy(key)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 ${
                              copied === key
                                ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#EDEEE8]'
                                : 'border-[#D4D4CC] text-[#1A1A1A] hover:border-[#1A1A1A]'
                            }`}
                          >
                            {copied === key ? (
                              <>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                Copied!
                              </>
                            ) : (
                              <>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                </svg>
                                Copy
                              </>
                            )}
                          </button>
                        </div>

                        <pre className="text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-wrap font-sans">
                          {outputs[key]}
                          {isLoading && getActiveTag(accumulated.current) === key && (
                            <span className="inline-block w-0.5 h-4 bg-[#1A1A1A] ml-0.5 animate-pulse align-text-bottom" />
                          )}
                        </pre>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-[#6B6B6B]">
                        <svg className="w-3.5 h-3.5 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        <p className="text-xs">Generating…</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Done footer */}
          {isDone && (
            <div className="px-6 py-3 border-t border-[#D4D4CC] flex items-center justify-between bg-[#EDEEE8]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <p className="text-xs text-[#6B6B6B]">All 5 formats ready</p>
              </div>
              <button
                onClick={() => {
                  setOutputs({ linkedin: '', twitter: '', newsletter: '', youtube: '', tldr: '' })
                  setIsDone(false)
                  setActiveTab('linkedin')
                  accumulated.current = ''
                }}
                className="text-xs text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
              >
                Clear & start over →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
