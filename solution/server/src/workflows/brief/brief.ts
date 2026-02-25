import { log } from '@services'

import type { BriefRequest, BriefResult } from './types.js'
import { briefWorkflow } from './workflow.js'

/*==========================================================================
 * Generate a personalized news brief
 +=========================================================================*/
export async function brief(request: BriefRequest): Promise<BriefResult> {
  const { sessionId, period } = request

  log('Brief Workflow', `🗞️ Generating ${period} brief for session ${sessionId}`)

  const result = await briefWorkflow.invoke({
    sessionId,
    period
  })

  log('Brief Workflow', `✅ Generated brief with ${result.articleCount} articles`)

  return {
    sessionId,
    period,
    brief: result.brief,
    articleCount: result.articleCount
  }
}

