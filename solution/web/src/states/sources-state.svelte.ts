import { fetchSources } from '@services/api-service'

export default class SourcesState {
  static #instance: SourcesState

  #sources = $state<string[]>([])

  private constructor() {
    this.#load()
  }

  static get instance() {
    return this.#instance ?? (this.#instance = new SourcesState())
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
