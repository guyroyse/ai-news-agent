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
  response: string
}
