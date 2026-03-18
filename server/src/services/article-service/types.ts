export type Source = {
  title: string
  link: string
}

export type Topics = string[]

export type NamedEntities = {
  people: string[]
  organizations: string[]
  locations: string[]
}

export type Article = {
  id: string
  title: string
  link: string
  publicationDate: number
  content: string
  summary: string
  source: Source
  topics: Topics
  namedEntities: NamedEntities
  embedding: number[]
}

export type SearchCriteria = {
  sources?: string[]
  startDate?: number // Unix timestamp (seconds)
  endDate?: number // Unix timestamp (seconds)
  topics?: string[]
  people?: string[]
  organizations?: string[]
  locations?: string[]
  semanticQuery?: string
}

export type SearchedArticle = {
  id: string
  title: string
  link: string
  content: string
  summary: string
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

export type SearchError = {
  success: false
  error: string
}

export type SearchResponse = SearchResult | SearchError

export type ArticleResult = {
  success: true
  article: SearchedArticle
}

export type ArticleNotFound = {
  success: false
  error: 'not_found'
}

export type ArticleResponse = ArticleResult | ArticleNotFound | SearchError
