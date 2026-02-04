import { cleanupRedisConnection } from '@adapters'
import { fetchFeeds, saveArticle } from '@services'
import { articleWorkflow } from './workflow.js'

/* Fetch all feed items from RSS feeds */
const feedItems = await fetchFeeds()
console.log(`Fetched ${feedItems.length} feed items to process`)

/* Process all feed items through the workflow and save to Redis */
for (const feedItem of feedItems) {
  const result = await articleWorkflow.invoke({ feedItem })
  if (result.article) await saveArticle(result.article)
}

console.log(`Processed ${feedItems.length} articles`)

/* Close Redis connection */
await cleanupRedisConnection()
