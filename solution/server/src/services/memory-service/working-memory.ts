import { config } from '@root/config.js'
import { log } from '../logger-service/index.js'
import type { MemoryMessage, UpdateWorkingMemoryRequest, WorkingMemoryResponse } from './types.js'

const AMS_BASE_URL = config.amsUrl ?? 'http://localhost:8100'

/*==========================================================================
 * Fetch working memory for a session
 +=========================================================================*/
export async function fetchWorkingMemory(sessionId: string): Promise<WorkingMemoryResponse | null> {
  try {
    const response = await fetch(`${AMS_BASE_URL}/v1/working-memory/${sessionId}`)

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      throw new Error(`AMS error: ${response.status} ${response.statusText}`)
    }

    return (await response.json()) as WorkingMemoryResponse
  } catch (error) {
    log('Working Memory Service', '⛔️ Error fetching working memory:', error)
    throw error
  }
}

/*==========================================================================
 * Update working memory for a session
 +=========================================================================*/
export async function updateWorkingMemory(sessionId: string, payload: UpdateWorkingMemoryRequest): Promise<WorkingMemoryResponse> {
  try {
    const response = await fetch(`${AMS_BASE_URL}/v1/working-memory/${sessionId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`AMS error: ${response.status} ${response.statusText}`)
    }

    return (await response.json()) as WorkingMemoryResponse
  } catch (error) {
    log('Working Memory Service', '⛔️ Error updating working memory:', error)
    throw error
  }
}

/*==========================================================================
 * Clear working memory for a session (keeps long-term memories)
 +=========================================================================*/
export async function clearWorkingMemory(sessionId: string): Promise<void> {
  try {
    const response = await fetch(`${AMS_BASE_URL}/v1/working-memory/${sessionId}`, {
      method: 'DELETE'
    })

    if (response.status === 404) {
      // Already cleared or never existed
      return
    }

    if (!response.ok) {
      throw new Error(`AMS error: ${response.status} ${response.statusText}`)
    }

    log('Working Memory Service', `Cleared working memory for session ${sessionId}`)
  } catch (error) {
    log('Working Memory Service', '⛔️ Error clearing working memory:', error)
    throw error
  }
}

/*==========================================================================
 * Helper to convert messages from LangChain format
 +=========================================================================*/
export function toMemoryMessages(messages: Array<{ role: string; content: string }>): MemoryMessage[] {
  return messages.map(msg => ({
    role: msg.role as 'user' | 'assistant' | 'system',
    content: msg.content,
    created_at: new Date().toISOString()
  }))
}

