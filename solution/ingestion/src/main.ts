import { cleanupRedisConnection } from '@adapters'
import { fetchFeeds, saveArticle, log } from '@services'
import { articleWorkflow } from './workflow.js'

/* Fetch all feed items from RSS feeds */
const feedItems = await fetchFeeds()
log('Main', 'Fetched', feedItems.length, 'feed items to process')

/* Process all feed items through the workflow and save to Redis */
for (const feedItem of feedItems) {
  log('Main', 'Processing article:', feedItem.title)

  /* Process the feed item through the workflow */
  const result = await articleWorkflow.invoke({ feedItem })

  /* Save the article to Redis if there is one */
  if (result.article) {
    await saveArticle(result.article)
    log('Main', 'Saved article to Redis')
  }
}

log('Main', 'Completed processing articles')

/* Close Redis connection */
await cleanupRedisConnection()
