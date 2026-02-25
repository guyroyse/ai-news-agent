import type { ChatState } from '../state.js'

export async function articleCollector(state: ChatState): Promise<Partial<ChatState>> {
  const { messages } = state

  /* Find all ToolMessages from show_article calls and extract articles */
  const articles = messages
    .filter(m => m.constructor.name === 'ToolMessage')
    .map(m => {
      try {
        const parsed = JSON.parse(m.content as string)
        if (parsed.shown && parsed.article) {
          return parsed.article
        }
      } catch {
        /* Ignore parse errors */
      }
      return null
    })
    .filter(Boolean)

  return { articles }
}
