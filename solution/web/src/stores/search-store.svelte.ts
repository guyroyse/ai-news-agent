import { searchArticles, type SearchCriteria } from '@services/api-service'
import type AppStore from './app-store.svelte'

export default class SearchStore {
  #appStore: AppStore

  sources = $state<string[]>([])
  #startDate = $state<Date | null>(null)
  #endDate = $state<Date | null>(null)
  topics = $state('')
  people = $state('')
  organizations = $state('')
  locations = $state('')
  semanticQuery = $state('')

  constructor(appStore: AppStore) {
    this.#appStore = appStore
  }

  // String getters/setters for HTML date inputs
  get startDateString(): string {
    return this.#startDate?.toISOString().split('T')[0] ?? ''
  }

  set startDateString(value: string) {
    this.#startDate = value ? new Date(value) : null
  }

  get endDateString(): string {
    return this.#endDate?.toISOString().split('T')[0] ?? ''
  }

  set endDateString(value: string) {
    this.#endDate = value ? new Date(value) : null
  }

  // Date getters for search API
  get startDate(): Date | null {
    return this.#startDate
  }

  get endDate(): Date | null {
    return this.#endDate
  }

  async search(): Promise<void> {
    this.#appStore.showOverlay()

    try {
      const result = await searchArticles(this.#buildCriteria())

      if (result.success) {
        this.#appStore.activities.addSearch(result.articles)
      } else {
        this.#appStore.activities.addError(result.error)
      }
    } catch (error) {
      this.#appStore.activities.addError(String(error))
    } finally {
      this.#appStore.hideOverlay()
    }
  }

  clear(): void {
    this.sources = []
    this.#startDate = null
    this.#endDate = null
    this.topics = ''
    this.people = ''
    this.organizations = ''
    this.locations = ''
    this.semanticQuery = ''
  }

  #buildCriteria(): SearchCriteria {
    const criteria: SearchCriteria = {}
    if (this.sources.length > 0) criteria.sources = this.sources
    if (this.#startDate) criteria.startDate = this.#startDate
    if (this.#endDate) criteria.endDate = this.#endDate
    if (this.topics) criteria.topics = this.topics
    if (this.people) criteria.people = this.people
    if (this.organizations) criteria.organizations = this.organizations
    if (this.locations) criteria.locations = this.locations
    if (this.semanticQuery) criteria.semanticQuery = this.semanticQuery
    return criteria
  }
}
