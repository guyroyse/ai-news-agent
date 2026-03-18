import { fetchRedisConnection } from '@adapters'
import { log } from '../logger-service/index.js'
import type { ChatHistoryMessage, ChatMessageRole } from './types.js'

const STREAM_PREFIX = 'chat:'

/*==========================================================================
 * Add a message to the chat history stream
 +=========================================================================*/
export async function addChatMessage(sessionId: string, role: ChatMessageRole, content: string): Promise<void> {
  const redis = await fetchRedisConnection()
  const streamKey = `${STREAM_PREFIX}${sessionId}`

  await redis.xAdd(streamKey, '*', {
    role,
    content,
    timestamp: new Date().toISOString()
  })

  log('Chat History Service', `Added ${role} message to stream ${streamKey}`)
}

/*==========================================================================
 * Fetch all messages from the chat history stream
 +=========================================================================*/
export async function fetchChatHistory(sessionId: string): Promise<ChatHistoryMessage[]> {
  const redis = await fetchRedisConnection()
  const streamKey = `${STREAM_PREFIX}${sessionId}`

  const entries = await redis.xRange(streamKey, '-', '+')

  return entries.map(entry => ({
    role: entry.message.role as ChatMessageRole,
    content: entry.message.content,
    timestamp: entry.message.timestamp
  }))
}

/*==========================================================================
 * Clear the chat history stream
 +=========================================================================*/
export async function clearChatHistory(sessionId: string): Promise<void> {
  const redis = await fetchRedisConnection()
  const streamKey = `${STREAM_PREFIX}${sessionId}`

  await redis.del(streamKey)

  log('Chat History Service', `Cleared chat history stream ${streamKey}`)
}
