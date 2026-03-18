import { log } from '@services'

import type { BriefRequest, BriefResult } from './types.js'
import { briefWorkflow } from './workflow.js'

/*==========================================================================
 * Generate a personalized news brief
 +=========================================================================*/
export async function brief(request: BriefRequest): Promise<BriefResult> {
  const { period } = request

  log('Brief Workflow', `🗞️ Generating ${period} brief`)

  const result = await briefWorkflow.invoke({ period })

  const articleCount = result.articles.length

  log('Brief Workflow', `✅ Generated brief with ${articleCount} articles`)

  return {
    brief: result.brief,
    articleCount
  }
}
