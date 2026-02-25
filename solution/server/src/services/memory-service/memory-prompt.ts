import { config } from '@root/config.js'
import { log } from '../logger-service/index.js'
import type { MemoryPromptRequest, MemoryPromptResponse } from './types.js'

const AMS_BASE_URL = config.amsUrl ?? 'http://localhost:8100'

/*==========================================================================
 * Fetch hydrated prompt with context, messages, and relevant long-term memories
 +=========================================================================*/
export async function fetchMemoryPrompt(request: MemoryPromptRequest): Promise<MemoryPromptResponse> {
  try {
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

