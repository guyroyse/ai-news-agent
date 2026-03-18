import { fetchTopics, fetchPeople, fetchOrganizations, fetchLocations } from '@services/api-service'

export default class TagsStore {
  #topics = $state<string[]>([])
  #people = $state<string[]>([])
  #organizations = $state<string[]>([])
  #locations = $state<string[]>([])

  constructor() {
    this.#load()
  }

  get topics(): string[] {
    return this.#topics
  }

  get people(): string[] {
    return this.#people
  }

  get organizations(): string[] {
    return this.#organizations
  }

  get locations(): string[] {
    return this.#locations
  }

  async refresh(): Promise<void> {
    await this.#load()
  }

  async #load(): Promise<void> {
    const [topicsResult, peopleResult, orgsResult, locsResult] = await Promise.all([
      fetchTopics(),
      fetchPeople(),
      fetchOrganizations(),
      fetchLocations()
    ])

    if (topicsResult.success) this.#topics = topicsResult.topics.sort()
    if (peopleResult.success) this.#people = peopleResult.people.sort()
    if (orgsResult.success) this.#organizations = orgsResult.organizations.sort()
    if (locsResult.success) this.#locations = locsResult.locations.sort()
  }
}
