import { fetchSources } from '@services/api-service'

export default class SourcesStore {
  #sources = $state<string[]>([])

  constructor() {
    this.#load()
  }

  get sources(): string[] {
    return this.#sources
  }

  async refresh(): Promise<void> {
    await this.#load()
  }

  async #load(): Promise<void> {
    const result = await fetchSources()
    if (result.success) {
      this.#sources = result.sources
    }
  }
}
