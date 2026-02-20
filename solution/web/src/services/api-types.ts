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

export type SearchCriteria = {
  sources?: string[]
  startDate?: Date | null
  endDate?: Date | null
  topics?: string
  people?: string
  organizations?: string
  locations?: string
  semanticQuery?: string
}

export type SearchedArticle = {
  title: string
  link: string
  content: string
  source: string
}

export type SearchResult = {
  success: true
  articles: SearchedArticle[]
}

export type SearchResponse = SearchResult | ApiError
