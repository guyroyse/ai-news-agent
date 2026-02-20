import type { ArticleSummary, SearchedArticle } from '@services/api-service'

export type IngestActivity = {
  type: 'ingest'
  timestamp: Date
  found: number
  processed: number
  articles: ArticleSummary[]
}

export type ErrorActivity = {
  type: 'error'
  timestamp: Date
  message: string
}

export type ArticleActivity = {
  type: 'article'
  timestamp: Date
  article: SearchedArticle
}

export type NoArticlesFoundActivity = {
  type: 'no-articles-found'
  timestamp: Date
}

export type Activity = IngestActivity | ErrorActivity | ArticleActivity | NoArticlesFoundActivity

const STORAGE_KEY = 'news-agent-activities'
const MAX_ACTIVITIES = 10

export default class ActivitiesStore {
  #activities = $state<Activity[]>([])

  constructor() {
    this.#activities = this.#load()
  }

  get activities(): Activity[] {
    return this.#activities
  }

  addIngest(found: number, processed: number, articles: ArticleSummary[]): void {
    this.#add({
      type: 'ingest',
      timestamp: new Date(),
      found,
      processed,
      articles
    })
  }

  addError(message: string): void {
    this.#add({
      type: 'error',
      timestamp: new Date(),
      message
    })
  }

  addSearch(articles: SearchedArticle[]): void {
    const timestamp = new Date()

    if (articles.length === 0) {
      this.#add({ type: 'no-articles-found', timestamp })
      return
    }

    const articleActivities: ArticleActivity[] = articles.map(article => ({
      type: 'article',
      timestamp,
      article
    }))
    this.#activities = [...articleActivities, ...this.#activities].slice(0, MAX_ACTIVITIES)
    this.#save()
  }

  #add(activity: Activity): void {
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
