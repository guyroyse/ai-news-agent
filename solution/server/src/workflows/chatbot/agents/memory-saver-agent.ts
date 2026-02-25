import { AIMessage } from '@langchain/core/messages'

import { updateWorkingMemory, toMemoryMessages, addChatMessage } from '@services'

import type { ChatState } from '../state.js'

export async function memorySaver(state: ChatState): Promise<Partial<ChatState>> {
  const { sessionId, userMessage, messages, memoryMessages } = state

  /* Find the final assistant response (last AIMessage) */
  const lastAiMessage = [...messages].reverse().find(m => m instanceof AIMessage)
  const responseContent = (lastAiMessage?.content as string) ?? ''

  /* Append new messages to existing memory messages and save to AMS
     (PUT replaces, so we need to include all previous messages) */
  const updatedMessages = [
    ...memoryMessages,
    ...toMemoryMessages([
      { role: 'user', content: userMessage },
      { role: 'assistant', content: responseContent }
    ])
  ]

  await updateWorkingMemory(sessionId, {
    messages: updatedMessages
  })

  /* Also save to Redis Stream for full conversation history preservation */
  await addChatMessage(sessionId, 'user', userMessage)
  await addChatMessage(sessionId, 'assistant', responseContent)

  return { response: responseContent }
}
