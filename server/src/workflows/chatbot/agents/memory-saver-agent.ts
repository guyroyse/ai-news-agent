import { fetchWorkingMemory, updateWorkingMemory, addChatMessage } from '@services'

import type { ChatState } from '../state.js'

export async function memorySaver(state: ChatState): Promise<Partial<ChatState>> {
  const { sessionId, userMessage, responseMessage } = state

  /* Fetch current working memory */
  const workingMemory = await fetchWorkingMemory(sessionId)
  const existingMessages = workingMemory?.messages ?? []

  /* Append new messages */
  const updatedMessages = [
    ...existingMessages,
    { role: 'user' as const, content: userMessage },
    { role: 'assistant' as const, content: responseMessage }
  ]

  /* Update working memory */
  await updateWorkingMemory(sessionId, { messages: updatedMessages })

  /* Also save to Redis Stream for full conversation history preservation */
  await addChatMessage(sessionId, 'user', userMessage)
  await addChatMessage(sessionId, 'assistant', responseMessage)

  return {}
}
