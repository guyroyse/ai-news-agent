import { config } from '@root/config.js'
import { log } from '../logger-service/index.js'
import type { MemoryPromptRequest, MemoryPromptResponse } from './types.js'

const AMS_BASE_URL = config.amsUrl
const LONG_TERM_MEMORY_LIMIT = 10

/*==========================================================================
 * Fetch hydrated prompt with context, messages, and relevant long-term memories
 +=========================================================================*/
export async function fetchMemoryPrompt(sessionId: string, query: string): Promise<MemoryPromptResponse> {
  try {
    const request: MemoryPromptRequest = {
      query,
      session: { session_id: sessionId },
      long_term_search: { text: query, limit: LONG_TERM_MEMORY_LIMIT }
    }

    const response = await fetch(`${AMS_BASE_URL}/v1/memory/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      throw new Error(`AMS error: ${response.status} ${response.statusText}`)
    }

    return (await response.json()) as MemoryPromptResponse
  } catch (error) {
    log('Memory Prompt Service', '⛔️ Error fetching memory prompt:', error)
    throw error
  }
}
