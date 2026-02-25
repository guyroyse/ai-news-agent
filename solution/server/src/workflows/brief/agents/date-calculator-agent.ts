import type { BriefState } from '../state.js'

/*==========================================================================
 * Calculates the start date based on the period
 +=========================================================================*/
export async function dateCalculator(state: BriefState): Promise<Partial<BriefState>> {
  const { period } = state

  const now = new Date()
  let startDate: Date

  switch (period) {
    case 'daily':
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      break
    case 'weekly':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case 'monthly':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      break
    default:
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  }

  // Convert to Unix timestamp in seconds
  return { startDate: Math.floor(startDate.getTime() / 1000) }
}

