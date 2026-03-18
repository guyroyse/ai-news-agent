import { searchLongTermMemories } from '@services'

import type { BriefState } from '../state.js'

/*==========================================================================
 * Fetches long-term memories from AMS to personalize the brief
 +=========================================================================*/
export async function memoryFetcher(_state: BriefState): Promise<Partial<BriefState>> {
  try {
    const memories = await searchLongTermMemories()
    return { memories }
  } catch {
    // If no memories found, continue with empty memories
    return { memories: [] }
  }
}
