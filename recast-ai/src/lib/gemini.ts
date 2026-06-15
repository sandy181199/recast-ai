import { GoogleGenerativeAI } from '@google/generative-ai'

if (!process.env.GEMINI_API_KEY) throw new Error('Missing GEMINI_API_KEY')

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export function getModel(systemPrompt: string) {
  return genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: systemPrompt,
  })
}
