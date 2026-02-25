import type { SearchedArticle } from '@services'

/*==========================================================================
 * Types for chatbot workflow
 +=========================================================================*/

/* Request from client to chat endpoint */
export type ChatRequest = {
  sessionId: string
  message: string
}

/* Response from chat endpoint */
export type ChatResponse = {
  sessionId: string
  response: string
  articles?: SearchedArticle[] // Articles to display in activity panel
}

