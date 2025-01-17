import { HensAI } from 'hens-ai'

// Initialize HensAI instance
export const ai = new HensAI({
    apiKey: process.env.NEXT_PUBLIC_CLAUDE!,
    model: 'hens-next-level',
    maxTokens: 1024,
    enableHistory: true
})
