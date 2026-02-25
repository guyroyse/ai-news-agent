import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'

import { fetchMemoryPrompt, fetchWorkingMemory, getMessageText } from '@services'

import type { ChatState } from '../state.js'

export async function memoryFetcher(state: ChatState): Promise<Partial<ChatState>> {
  const { sessionId, userMessage } = state

  /* Fetch hydrated prompt from AMS with context and relevant memories */
  const memoryPrompt = await fetchMemoryPrompt({
    query: userMessage,
    session: { session_id: sessionId },
    long_term_search: true
  })

  /* Build messages from memory + user message
     Note: AMS content can be string or {type, text} object */
  const messages = [
    ...memoryPrompt.messages.map(m => {
      const text = getMessageText(m.content)
      if (m.role === 'user') return new HumanMessage(text)
      if (m.role === 'assistant') return new AIMessage(text)
      return new SystemMessage(text)
    }),
    new HumanMessage(userMessage)
  ]

  /* Fetch the actual working memory for persisting later
     (separate from the enriched prompt which includes system context) */
  const workingMemory = await fetchWorkingMemory(sessionId)
  const memoryMessages = workingMemory?.messages ?? []

  return { messages, memoryMessages }
}
