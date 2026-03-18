import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages'

import { fetchMemoryPrompt } from '@services'

import type { ChatState } from '../state.js'

export async function promptEnricher(state: ChatState): Promise<Partial<ChatState>> {
  const { sessionId, userMessage } = state

  /* Fetch hydrated prompt from AMS with context and relevant memories */
  const enrichedPrompt = await fetchMemoryPrompt(sessionId, userMessage)

  /* Build LangChain messages from AMS response */
  const promptMessages = enrichedPrompt.messages.map(msg => {
    const text = typeof msg.content === 'string' ? msg.content : msg.content.text
    if (msg.role === 'user') return new HumanMessage(text)
    if (msg.role === 'assistant') return new AIMessage(text)
    return new SystemMessage(text)
  })

  return { promptMessages }
}
