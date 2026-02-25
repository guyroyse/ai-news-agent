import { searchArticles, type SearchCriteria } from '@services/api-service'
import type AppStore from './app-store.svelte'

export default class SearchStore {
  #appStore: AppStore

  #isSearching = $state<boolean>(false)
  sources = $state<string[]>([])
  #startDate = $state<Date | null>(null)
  #endDate = $state<Date | null>(null)
  topics = $state<string[]>([])
  people = $state<string[]>([])
  organizations = $state<string[]>([])
  locations = $state<string[]>([])
  semanticQuery = $state('')

  constructor(appStore: AppStore) {
    this.#appStore = appStore
  }

  get isSearching(): boolean {
    return this.#isSearching
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
    if (this.#isSearching) return
    this.#isSearching = true

    try {
      const result = await searchArticles(this.#buildCriteria())

      if (result.success) {
        await this.#appStore.activities.addSearch(result.articles)
      } else {
        await this.#appStore.activities.addError(result.error)
      }
    } catch (error) {
      await this.#appStore.activities.addError(String(error))
    } finally {
      this.#isSearching = false
    }
  }

  clear(): void {
    this.sources = []
    this.#startDate = null
    this.#endDate = null
    this.topics = []
    this.people = []
    this.organizations = []
    this.locations = []
    this.semanticQuery = ''
  }

  #buildCriteria(): SearchCriteria {
    const criteria: SearchCriteria = {}
    if (this.sources.length > 0) criteria.sources = this.sources
    if (this.#startDate) criteria.startDate = this.#startDate.toISOString()
    if (this.#endDate) criteria.endDate = this.#endDate.toISOString()
    if (this.topics.length > 0) criteria.topics = this.topics
    if (this.people.length > 0) criteria.people = this.people
    if (this.organizations.length > 0) criteria.organizations = this.organizations
    if (this.locations.length > 0) criteria.locations = this.locations
    if (this.semanticQuery) criteria.semanticQuery = this.semanticQuery
    return criteria
  }
}
