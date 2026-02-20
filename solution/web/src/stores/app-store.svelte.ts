import ActivitiesStore from './activities-store.svelte'
import SourcesStore from './sources-store.svelte'
import SearchStore from './search-store.svelte'

export default class AppStore {
  static #instance: AppStore

  #isBusy = $state<boolean>(false)

  #activities = new ActivitiesStore()
  #sources = new SourcesStore()
  #search: SearchStore

  private constructor() {
    this.#search = new SearchStore(this)
  }

  static get instance() {
    return this.#instance ?? (this.#instance = new AppStore())
  }

  get activities(): ActivitiesStore {
    return this.#activities
  }

  get sources(): SourcesStore {
    return this.#sources
  }

  get search(): SearchStore {
    return this.#search
  }

  get displayOverlay(): boolean {
    return this.#isBusy
  }

  showOverlay(): void {
    this.#isBusy = true
  }

  hideOverlay(): void {
    this.#isBusy = false
  }
}
