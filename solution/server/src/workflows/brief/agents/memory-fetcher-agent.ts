import { searchLongTermMemories } from '@services'

import type { BriefState } from '../state.js'

/*==========================================================================
 * Fetches long-term memories from AMS to personalize the brief
 +=========================================================================*/
export async function memoryFetcher(state: BriefState): Promise<Partial<BriefState>> {
  const { sessionId } = state

  try {
    const memories = await searchLongTermMemories(sessionId)
    return { memories }
  } catch {
    // If no memories found, continue with empty memories
    return { memories: [] }
  }
}

