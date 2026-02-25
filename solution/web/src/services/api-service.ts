import type {
  VersionInfo,
  IngestResponse,
  SourcesResponse,
  TopicsResponse,
  PeopleResponse,
  OrganizationsResponse,
  LocationsResponse,
  SearchCriteria,
  SearchResponse,
  ChatRequest,
  ChatResponse,
  BriefRequest,
  BriefResponse,
  Activity,
  ActivitiesResponse,
  ActivityResponse,
  ClearActivitiesResponse,
  ChatHistoryResponse,
  ClearChatHistoryResponse
} from './api-types'

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

export async function fetchTopics(): Promise<TopicsResponse> {
  const response = await fetch(`${API_BASE}/topics`)
  return response.json()
}

export async function fetchPeople(): Promise<PeopleResponse> {
  const response = await fetch(`${API_BASE}/people`)
  return response.json()
}

export async function fetchOrganizations(): Promise<OrganizationsResponse> {
  const response = await fetch(`${API_BASE}/organizations`)
  return response.json()
}

export async function fetchLocations(): Promise<LocationsResponse> {
  const response = await fetch(`${API_BASE}/locations`)
  return response.json()
}

export async function searchArticles(criteria: SearchCriteria, limit: number = 5): Promise<SearchResponse> {
  const response = await fetch(`${API_BASE}/search?limit=${limit}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(criteria)
  })
  return response.json()
}

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  })
  return response.json()
}

export async function fetchBrief(request: BriefRequest): Promise<BriefResponse> {
  const response = await fetch(`${API_BASE}/brief`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  })
  return response.json()
}

export async function fetchActivities(): Promise<ActivitiesResponse> {
  const response = await fetch(`${API_BASE}/activities`)
  return response.json()
}

export async function addActivity(activity: Activity): Promise<ActivityResponse> {
  const response = await fetch(`${API_BASE}/activities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ activity })
  })
  return response.json()
}

export async function clearActivities(): Promise<ClearActivitiesResponse> {
  const response = await fetch(`${API_BASE}/activities`, {
    method: 'DELETE'
  })
  return response.json()
}

export async function fetchChatHistory(sessionId: string): Promise<ChatHistoryResponse> {
  const response = await fetch(`${API_BASE}/chat/history?sessionId=${encodeURIComponent(sessionId)}`)
  return response.json()
}

export async function clearChatHistory(sessionId: string): Promise<ClearChatHistoryResponse> {
  const response = await fetch(`${API_BASE}/chat/history?sessionId=${encodeURIComponent(sessionId)}`, {
    method: 'DELETE'
  })
  return response.json()
}
