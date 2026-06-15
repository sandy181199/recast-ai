import { YoutubeTranscript } from 'youtube-transcript'

export function extractVideoId(url: string): string | null {
  const patterns = [
    /[?&]v=([^&#]+)/,
    /youtu\.be\/([^?&#]+)/,
    /youtube\.com\/embed\/([^?&#]+)/,
    /youtube\.com\/shorts\/([^?&#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export async function fetchYouTubeTranscript(url: string): Promise<string> {
  const videoId = extractVideoId(url)
  if (!videoId) throw new Error('Invalid YouTube URL — could not extract video ID.')

  const segments = await YoutubeTranscript.fetchTranscript(videoId)
  if (!segments || segments.length === 0) throw new Error('No transcript available for this video.')

  return segments.map((s) => s.text).join(' ').replace(/\s+/g, ' ').trim()
}
