import { searchArticles } from '@services'

import type { BriefState } from '../state.js'

/*==========================================================================
 * Fetches articles from the database for the calculated date range
 +=========================================================================*/
export async function articleFetcher(state: BriefState): Promise<Partial<BriefState>> {
  const { startDate } = state

  // Search for articles starting from the calculated date
  const result = await searchArticles({ startDate }, 50)

  if (result.success) {
    return {
      articles: result.articles,
      articleCount: result.articles.length
    }
  }

  return { articles: [], articleCount: 0 }
}

