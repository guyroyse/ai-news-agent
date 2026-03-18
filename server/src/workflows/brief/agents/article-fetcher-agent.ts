import { searchArticles } from '@services'

import type { BriefState } from '../state.js'

const ONE_DAY_MS = 24 * 60 * 60 * 1000
const ONE_WEEK_MS = 7 * ONE_DAY_MS
const ONE_MONTH_MS = 30 * ONE_DAY_MS

/*==========================================================================
 * Calculates the date range and fetches articles from the database
 +=========================================================================*/
export async function articleFetcher(state: BriefState): Promise<Partial<BriefState>> {
  const { period } = state

  // Calculate start date based on period
  const now = Date.now()
  let offset: number

  switch (period) {
    case 'daily':
      offset = ONE_DAY_MS
      break
    case 'weekly':
      offset = ONE_WEEK_MS
      break
    case 'monthly':
      offset = ONE_MONTH_MS
      break
    default:
      offset = ONE_DAY_MS
  }

  const startDate = Math.floor((now - offset) / 1000)

  // Search for articles starting from the calculated date
  const result = await searchArticles({ startDate }, 250)

  return { articles: result.success ? result.articles : [] }
}
