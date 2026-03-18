import ActivitiesStore from './activities-store.svelte'
import SourcesStore from './sources-store.svelte'
import TagsStore from './tags-store.svelte'
import SearchStore from './search-store.svelte'
import ChatStore from './chat-store.svelte'

const SESSION_STORAGE_KEY = 'news-agent-session-id'

export default class AppStore {
  static #instance: AppStore

  #isIngesting = $state<boolean>(false)
  #sessionId = $state<string>(this.#getOrCreateSessionId())

  #activities: ActivitiesStore
  #sources = new SourcesStore()
  #tags = new TagsStore()
  #search: SearchStore
  #chat: ChatStore

  private constructor() {
    this.#activities = new ActivitiesStore()
    this.#search = new SearchStore(this)
    this.#chat = new ChatStore(this)
  }

  static get instance() {
    return this.#instance ?? (this.#instance = new AppStore())
  }

  get sessionId(): string {
    return this.#sessionId
  }

  get activities(): ActivitiesStore {
    return this.#activities
  }

  get sources(): SourcesStore {
    return this.#sources
  }

  get tags(): TagsStore {
    return this.#tags
  }

  get search(): SearchStore {
    return this.#search
  }

  get chat(): ChatStore {
    return this.#chat
  }

  get isIngesting(): boolean {
    return this.#isIngesting
  }

  set isIngesting(value: boolean) {
    this.#isIngesting = value
  }

  resetSessionId(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY)
    this.#sessionId = this.#getOrCreateSessionId()
  }

  #getOrCreateSessionId(): string {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY)
    if (stored) {
      return stored
    }
    const newSessionId = `session-${crypto.randomUUID()}`
    localStorage.setItem(SESSION_STORAGE_KEY, newSessionId)
    return newSessionId
  }
}
