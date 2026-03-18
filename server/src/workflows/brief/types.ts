/*==========================================================================
 * Types for the brief workflow
 +=========================================================================*/

export type BriefPeriod = 'daily' | 'weekly' | 'monthly'

export type BriefRequest = {
  period: BriefPeriod
}

export type BriefResult = {
  brief: string
  articleCount: number
}
