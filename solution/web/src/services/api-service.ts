import type { VersionInfo, IngestResponse, SourcesResponse, SearchCriteria, SearchResponse } from './api-types'

export * from './api-types'

const API_BASE = '/api'

export async function fetchVersion(): Promise<VersionInfo> {
  const response = await fetch(`${API_BASE}/version`)
  return response.json()
}

export async function ingestArticles(limit?: number): Promise<IngestResponse> {
  const url = limit ? `${API_BASE}/ingest?limit=${limit}` : `${API_BASE}/ingest`
  const response = await fetch(url, { method: 'POST' })
  return response.json()
}

export async function fetchSources(): Promise<SourcesResponse> {
  const response = await fetch(`${API_BASE}/sources`)
  return response.json()
}

export async function searchArticles(criteria: SearchCriteria, limit: number = 10): Promise<SearchResponse> {
  // TODO: Remove this temporary hardcoded response
  throw new Error('Network error: Failed to fetch')

  const response = await fetch(`${API_BASE}/search?limit=${limit}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(criteria)
  })
  return response.json()
}
