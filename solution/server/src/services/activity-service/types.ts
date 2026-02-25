/*==========================================================================
 * Types for Activity Service
 +=========================================================================*/

import type { SearchedArticle } from '../article-service/types.js'

export type BriefPeriod = 'daily' | 'weekly' | 'monthly'

export type ArticleSummary = {
  title: string
  source: string
  date: string
  summary: string
  topics: string[]
  namedEntities: {
    people: string[]
    organizations: string[]
    locations: string[]
  }
}

export type IngestActivity = {
  type: 'ingest'
  timestamp: string
  found: number
  processed: number
  articles: ArticleSummary[]
}

export type ErrorActivity = {
  type: 'error'
  timestamp: string
  message: string
}

export type ArticleActivity = {
  type: 'article'
  timestamp: string
  article: SearchedArticle
}

export type NoArticlesFoundActivity = {
  type: 'no-articles-found'
  timestamp: string
}

export type BriefActivity = {
  type: 'brief'
  timestamp: string
  period: BriefPeriod
  brief: string
  articleCount: number
}

export type Activity = IngestActivity | ErrorActivity | ArticleActivity | NoArticlesFoundActivity | BriefActivity

export type ActivitiesResponse = {
  success: true
  activities: Activity[]
}

export type ActivityResponse = {
  success: true
  activity: Activity
}

export type ClearResponse = {
  success: true
}
