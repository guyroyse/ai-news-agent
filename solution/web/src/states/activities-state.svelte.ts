import type { ArticleSummary } from '@services/api-service'

export type IngestActivity = {
  type: 'ingest'
  timestamp: Date
  found: number
  processed: number
  articles: ArticleSummary[]
}

export type Activity = IngestActivity

const STORAGE_KEY = 'news-agent-activities'
const MAX_ACTIVITIES = 10

export default class ActivitiesState {
  static #instance: ActivitiesState

  #activities = $state<Activity[]>([])

  private constructor() {
    this.#activities = this.#load()
  }

  static get instance() {
    return this.#instance ?? (this.#instance = new ActivitiesState())
  }

  get activities(): Activity[] {
    return this.#activities
  }

  add(activity: Activity): void {
    this.#activities = [activity, ...this.#activities].slice(0, MAX_ACTIVITIES)
    this.#save()
  }

  clear(): void {
    this.#activities = []
    this.#save()
  }

  #load(): Activity[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return []
      const parsed = JSON.parse(stored)
      // Convert timestamp strings back to Date objects
      return parsed.map((activity: Activity) => ({
        ...activity,
        timestamp: new Date(activity.timestamp)
      }))
    } catch {
      return []
    }
  }

  #save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.#activities.slice(0, MAX_ACTIVITIES)))
    } catch {
      // Ignore storage errors
    }
  }
}
