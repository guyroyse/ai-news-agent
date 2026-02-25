import { sendChatMessage, fetchChatHistory, clearChatHistory, type ChatMessage } from '@services/api-service'
import type AppStore from './app-store.svelte'

export default class ChatStore {
  #appStore: AppStore
  #messages = $state<ChatMessage[]>([])
  #isLoading = $state<boolean>(false)
  #inputMessage = $state<string>('')

  constructor(appStore: AppStore) {
    this.#appStore = appStore
    this.#load()
  }

  get sessionId(): string {
    return this.#appStore.sessionId
  }

  get messages(): ChatMessage[] {
    return this.#messages
  }

  get isLoading(): boolean {
    return this.#isLoading
  }

  get inputMessage(): string {
    return this.#inputMessage
  }

  set inputMessage(value: string) {
    this.#inputMessage = value
  }

  async sendMessage(): Promise<void> {
    const message = this.#inputMessage.trim()
    if (!message || this.#isLoading) return

    // Add user message to chat
    this.#messages = [...this.#messages, { role: 'user', content: message }]
    this.#inputMessage = ''
    this.#isLoading = true

    try {
      const result = await sendChatMessage({
        sessionId: this.sessionId,
        message
      })

      if (result.success) {
        // Add assistant response to chat
        this.#messages = [...this.#messages, { role: 'assistant', content: result.response }]

        // If articles were returned, add them to the activity panel
        if (result.articles && result.articles.length > 0) {
          await this.#appStore.activities.addChatArticles(result.articles)
        }
      } else {
        // Add error as assistant message
        this.#messages = [...this.#messages, { role: 'assistant', content: `Error: ${result.error}` }]
      }
    } catch (error) {
      this.#messages = [...this.#messages, { role: 'assistant', content: `Error: ${String(error)}` }]
    } finally {
      this.#isLoading = false
    }
  }

  async clear(): Promise<void> {
    // Clear the current session's chat history on the server
    await clearChatHistory(this.sessionId)
    // Reset to a new session
    this.#appStore.resetSessionId()
    // Clear local state
    this.#messages = []
    this.#inputMessage = ''
    this.#isLoading = false
  }

  async #load(): Promise<void> {
    try {
      const result = await fetchChatHistory(this.sessionId)
      if (result.success) {
        this.#messages = result.messages.map(m => ({
          role: m.role,
          content: m.content
        }))
      }
    } catch {
      // Ignore load errors
    }
  }
}
