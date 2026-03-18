/*==========================================================================
 * Chat History Types - stored in Redis Streams
 +=========================================================================*/

export type ChatMessageRole = 'user' | 'assistant'

export type ChatHistoryMessage = {
  role: ChatMessageRole
  content: string
  timestamp: string
}

export type ChatHistoryResponse = {
  success: true
  messages: ChatHistoryMessage[]
}

export type ClearChatHistoryResponse = {
  success: true
}

