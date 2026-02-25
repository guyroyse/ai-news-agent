import { chatWorkflow } from './workflow.js'
import type { ChatRequest, ChatResponse } from './types.js'

export async function chat(request: ChatRequest): Promise<ChatResponse> {
  const { sessionId, message } = request

  /* Invoke the workflow */
  const result = await chatWorkflow.invoke({
    sessionId,
    userMessage: message
  })

  return {
    sessionId,
    response: result.response,
    articles: result.articles.length > 0 ? result.articles : undefined
  }
}
