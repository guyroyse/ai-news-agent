const API_BASE = '/api'

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

export type IngestError = {
  success: false
  error: string
}

export type IngestResponse = IngestResult | IngestError

export async function fetchVersion(): Promise<VersionInfo> {
  const response = await fetch(`${API_BASE}/version`)
  return response.json()
}

export async function ingestArticles(limit?: number): Promise<IngestResponse> {
  const url = limit ? `${API_BASE}/ingest?limit=${limit}` : `${API_BASE}/ingest`
  const response = await fetch(url, { method: 'POST' })
  return response.json()
}
