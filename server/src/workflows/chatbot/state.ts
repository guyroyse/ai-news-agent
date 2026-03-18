import { Annotation } from '@langchain/langgraph'
import type { BaseMessage } from '@langchain/core/messages'

/*==========================================================================
 * State annotation for the chatbot workflow
 +=========================================================================*/
export const ChatAnnotation = Annotation.Root({
  sessionId: Annotation<string>(),
  userMessage: Annotation<string>(),
  promptMessages: Annotation<BaseMessage[]>(),
  responseMessage: Annotation<string>()
})

export type ChatState = typeof ChatAnnotation.State
