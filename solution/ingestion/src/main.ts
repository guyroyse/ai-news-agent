import { cleanupRedisConnection } from '@adapters'
import { fetchFeeds, saveArticle } from '@services'
import { articleWorkflow } from './workflow.js'

/* Fetch all feed items from RSS feeds */
const feedItems = await fetchFeeds()
console.log(`Fetched ${feedItems.length} feed items to process`)
console.log()

/* Process all feed items through the workflow and save to Redis */
for (const feedItem of feedItems) {
  console.log(`Processing article "${feedItem.title}"`)
  console.log()

  /* Process the feed item through the workflow */
  const result = await articleWorkflow.invoke({ feedItem })

  /* Save the article to Redis if there is one */
  if (result.article) {
    await saveArticle(result.article)
    console.log('Saved article to Redis')
    console.log()
  }
}

console.log(`Completed processing articles`)

/* Close Redis connection */
await cleanupRedisConnection()
