import { Annotation, messagesStateReducer } from '@langchain/langgraph'
import type { BaseMessage } from '@langchain/core/messages'

import type { SearchedArticle, MemoryMessage } from '@services'

/*==========================================================================
 * State annotation for the chatbot workflow
 +=========================================================================*/
export const ChatAnnotation = Annotation.Root({
  // Input fields
  sessionId: Annotation<string>(),
  userMessage: Annotation<string>(),

  // Messages array - uses built-in reducer for proper message handling
  messages: Annotation<BaseMessage[]>({
    default: () => [],
    reducer: messagesStateReducer
  }),

  // Memory messages from AMS (for persisting back to working memory)
  memoryMessages: Annotation<MemoryMessage[]>({
    default: () => [],
    reducer: (_, next) => next // Replace with latest value (no merging needed)
  }),

  // Output fields
  response: Annotation<string>(),
  articles: Annotation<SearchedArticle[]>({
    default: () => [],
    reducer: (prev, next) => [...prev, ...next]
  })
})

export type ChatState = typeof ChatAnnotation.State
