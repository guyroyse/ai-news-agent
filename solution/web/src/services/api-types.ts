export type ApiError = {
  success: false
  error: string
}

export type VersionInfo = {
  name: string
  version: string
  node: string
}

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

export type IngestResult = {
  success: true
  found: number
  processed: number
  articles: ArticleSummary[]
}

export type IngestResponse = IngestResult | ApiError

export type SourcesResult = {
  success: true
  sources: string[]
}

export type SourcesResponse = SourcesResult | ApiError

export type TopicsResult = {
  success: true
  topics: string[]
}

export type TopicsResponse = TopicsResult | ApiError

export type PeopleResult = {
  success: true
  people: string[]
}

export type PeopleResponse = PeopleResult | ApiError

export type OrganizationsResult = {
  success: true
  organizations: string[]
}

export type OrganizationsResponse = OrganizationsResult | ApiError

export type LocationsResult = {
  success: true
  locations: string[]
}

export type LocationsResponse = LocationsResult | ApiError

export type SearchCriteria = {
  sources?: string[]
  startDate?: string
  endDate?: string
  topics?: string[]
  people?: string[]
  organizations?: string[]
  locations?: string[]
  semanticQuery?: string
}

export type SearchedArticle = {
  title: string
  link: string
  content: string
  source: string
  publicationDate: number
  topics: string[]
  namedEntities: {
    people: string[]
    organizations: string[]
    locations: string[]
  }
}

export type SearchResult = {
  success: true
  articles: SearchedArticle[]
}

export type SearchResponse = SearchResult | ApiError

/*==========================================================================
 * Chat types
 +=========================================================================*/

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export type ChatRequest = {
  sessionId: string
  message: string
}

export type ChatResult = {
  success: true
  sessionId: string
  response: string
  articles?: SearchedArticle[]
}

export type ChatResponse = ChatResult | ApiError

/*==========================================================================
 * Brief types
 +=========================================================================*/

export type BriefPeriod = 'daily' | 'weekly' | 'monthly'

export type BriefRequest = {
  sessionId: string
  period: BriefPeriod
}

export type BriefResult = {
  success: true
  sessionId: string
  period: BriefPeriod
  brief: string
  articleCount: number
}

export type BriefResponse = BriefResult | ApiError

/*==========================================================================
 * Activity types
 +=========================================================================*/

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

export type ActivitiesResult = {
  success: true
  activities: Activity[]
}

export type ActivitiesResponse = ActivitiesResult | ApiError

export type ActivityResult = {
  success: true
  activity: Activity
}

export type ActivityResponse = ActivityResult | ApiError

export type ClearActivitiesResult = {
  success: true
}

export type ClearActivitiesResponse = ClearActivitiesResult | ApiError

/*==========================================================================
 * Chat History types (stored in Redis Stream)
 +=========================================================================*/

export type ChatHistoryMessage = {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export type ChatHistoryResult = {
  success: true
  messages: ChatHistoryMessage[]
}

export type ChatHistoryResponse = ChatHistoryResult | ApiError

export type ClearChatHistoryResult = {
  success: true
}

export type ClearChatHistoryResponse = ClearChatHistoryResult | ApiError
