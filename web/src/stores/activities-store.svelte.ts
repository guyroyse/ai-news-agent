import {
  fetchActivities,
  addActivity,
  clearActivities,
  type ArticleSummary,
  type SearchedArticle,
  type BriefPeriod,
  type Activity,
  type IngestActivity,
  type ErrorActivity,
  type ArticleActivity,
  type NoArticlesFoundActivity,
  type BriefActivity
} from '@services/api-service'

export type { Activity, IngestActivity, ErrorActivity, ArticleActivity, NoArticlesFoundActivity, BriefActivity }

const MAX_ACTIVITIES = 10

export default class ActivitiesStore {
  #activities = $state<Activity[]>([])

  constructor() {
    this.#load()
  }

  get activities(): Activity[] {
    return this.#activities
  }

  async addIngest(found: number, processed: number, articles: ArticleSummary[]): Promise<void> {
    const activity: IngestActivity = {
      type: 'ingest',
      timestamp: new Date().toISOString(),
      found,
      processed,
      articles
    }
    await this.#add(activity)
  }

  async addError(message: string): Promise<void> {
    const activity: ErrorActivity = {
      type: 'error',
      timestamp: new Date().toISOString(),
      message
    }
    await this.#add(activity)
  }

  async addSearch(articles: SearchedArticle[]): Promise<void> {
    const timestamp = new Date().toISOString()

    if (articles.length === 0) {
      await this.#add({ type: 'no-articles-found', timestamp })
      return
    }

    for (const article of articles) {
      const activity: ArticleActivity = {
        type: 'article',
        timestamp,
        article
      }
      await this.#add(activity)
    }
  }

  async addChatArticles(articles: SearchedArticle[]): Promise<void> {
    const timestamp = new Date().toISOString()

    for (const article of articles) {
      const activity: ArticleActivity = {
        type: 'article',
        timestamp,
        article
      }
      await this.#add(activity)
    }
  }

  async addBrief(period: BriefPeriod, brief: string, articleCount: number): Promise<void> {
    const activity: BriefActivity = {
      type: 'brief',
      timestamp: new Date().toISOString(),
      period,
      brief,
      articleCount
    }
    await this.#add(activity)
  }

  async #add(activity: Activity): Promise<void> {
    // Add to local state immediately for responsiveness
    this.#activities = [...this.#activities, activity].slice(-MAX_ACTIVITIES)
    // Persist to backend
    await addActivity(activity)
  }

  async clear(): Promise<void> {
    this.#activities = []
    await clearActivities()
  }

  async #load(): Promise<void> {
    try {
      const result = await fetchActivities()
      if (result.success) {
        this.#activities = result.activities.slice(-MAX_ACTIVITIES)
      }
    } catch {
      // Ignore load errors
    }
  }
}
