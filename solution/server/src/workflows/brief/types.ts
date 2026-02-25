/*==========================================================================
 * Types for the brief workflow
 +=========================================================================*/

export type BriefPeriod = 'daily' | 'weekly' | 'monthly'

export type BriefRequest = {
  sessionId: string
  period: BriefPeriod
}

export type BriefResult = {
  sessionId: string
  period: BriefPeriod
  brief: string
  articleCount: number
}

