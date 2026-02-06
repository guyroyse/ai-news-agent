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

