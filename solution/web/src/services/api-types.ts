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
