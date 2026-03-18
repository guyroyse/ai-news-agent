import { fetchFeeds, saveArticle, log, Article } from '@services'
import { articleWorkflow } from './workflow.js'

export type ArticleSummary = {
  title: string
  source: string
  date: string
  summary: string
  topics: string[]
  namedEntities: {
    people: string[]
    organizations: string[]
    locations: string[]
  }
}

export type IngestResult = {
  found: number
  processed: number
  articles: ArticleSummary[]
}

export async function ingest(limit?: number): Promise<IngestResult> {
  const articles: Article[] = []

  /* Fetch all feed items from RSS feeds */
  const allFeedItems = await fetchFeeds()

  /* If we have a limit, slice the feed items */
  const feedItems = limit ? allFeedItems.slice(0, limit) : allFeedItems

  log('ingest', 'Fetched', allFeedItems.length, 'feed items, processing', feedItems.length)

  /* Process all feed items through the workflow and save to Redis */
  for (const feedItem of feedItems) {
    log('ingest', 'Processing article:', feedItem.title)

    /* Process the feed item through the workflow */
    const result = await articleWorkflow.invoke({ feedItem })

    /* Skip if no article was produced */
    if (!result.article) {
      log('ingest', 'No article produced, skipping')
      continue
    }

    /* Save the article to Redis */
    await saveArticle(result.article)
    log('ingest', 'Saved article to Redis')

    /* Add the article to the list of articles to be returned */
    articles.push(result.article)
  }

  log('ingest', 'Completed processing', articles.length, 'articles')

  return {
    found: allFeedItems.length,
    processed: articles.length,
    articles: articles.map(({ title, source, publicationDate, summary, topics, namedEntities }) => ({
      title,
      source: source.title,
      date: new Date(publicationDate).toISOString(),
      summary,
      topics,
      namedEntities
    }))
  }
}
