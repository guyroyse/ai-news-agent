import { config } from '@root/config.js'
import { log } from '../logger-service/index.js'
import type { LongTermMemory, LongTermMemorySearchResponse } from './types.js'

const AMS_BASE_URL = config.amsUrl ?? 'http://localhost:8100'

/*==========================================================================
 * Search long-term memories for a session
 +=========================================================================*/
export async function searchLongTermMemories(sessionId: string, limit: number = 50): Promise<LongTermMemory[]> {
  try {
    const response = await fetch(`${AMS_BASE_URL}/v1/long-term-memory/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'user preferences interests likes dislikes topics',
        limit,
        session_id: { eq: sessionId }
      })
    })

    if (response.status === 404) {
      return []
    }

    if (!response.ok) {
      throw new Error(`AMS error: ${response.status} ${response.statusText}`)
    }

    const data = (await response.json()) as LongTermMemorySearchResponse
    return data.memories
  } catch (error) {
    log('Long-Term Memory Service', '⛔️ Error searching long-term memories:', error)
    throw error
  }
}

