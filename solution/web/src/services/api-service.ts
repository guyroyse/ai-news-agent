const API_BASE = 'http://localhost:3000'

export type VersionInfo = {
  name: string
  version: string
  node: string
}

export async function fetchVersion(): Promise<VersionInfo> {
  const response = await fetch(`${API_BASE}/version`)
  return response.json()
}

