/*==========================================================================
 * Types for Agent Memory Server REST API
 +=========================================================================*/

/* Message content can be string or structured object */
export type MemoryMessageContent = string | { type: string; text: string; annotations?: unknown }

/* Message in a conversation */
export type MemoryMessage = {
  id?: string
  role: 'user' | 'assistant' | 'system'
  content: MemoryMessageContent
  created_at?: string
}

/* Helper to extract text content from a memory message */
export function getMessageText(content: MemoryMessageContent): string {
  if (typeof content === 'string') return content
  return content.text
}

/* Working memory for a session */
export type WorkingMemory = {
  session_id: string
  messages: MemoryMessage[]
  context?: string | null
  user_id?: string | null
  namespace?: string | null
  tokens?: number
}

/* Request to update working memory */
export type UpdateWorkingMemoryRequest = {
  messages: MemoryMessage[]
  context?: string | null
  user_id?: string | null
  namespace?: string | null
}

/* Request for memory prompt hydration */
export type MemoryPromptRequest = {
  query: string
  session?: {
    session_id: string
    namespace?: string | null
    user_id?: string | null
  } | null
  long_term_search?:
    | {
        text?: string
        limit?: number
      }
    | boolean
    | null
}

/* Response from memory prompt endpoint */
export type MemoryPromptResponse = {
  messages: MemoryMessage[]
}

/* Response from working memory endpoints */
export type WorkingMemoryResponse = WorkingMemory & {
  context_percentage_total_used?: number | null
  context_percentage_until_summarization?: number | null
  new_session?: boolean | null
}

/* Long-term memory entry */
export type LongTermMemory = {
  id: string
  text: string
  topics?: string[]
  entities?: string[]
  memory_type?: string
  created_at?: string
}

/* Response from long-term memory search */
export type LongTermMemorySearchResponse = {
  memories: LongTermMemory[]
  total: number
  next_offset?: string | null
}
