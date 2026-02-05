import Parser from 'rss-parser'
import { config } from '@root/config'
import { articleExists } from './article-service.js'
import { log } from './logger-service.js'

export type FeedItem = {
  feedTitle: string
  feedLink: string
  title: string
  content: string
  pubDate: string
  link: string
  html: string | undefined
}

/* Fetch all feed items from the configured RSS feeds */
const feeds = config.rssFeeds

/* Create a parser instance for the service to use */
const parser = new Parser()

/* Fetch all feed items from the configured RSS feeds */
export async function fetchFeeds(): Promise<FeedItem[]> {
  const allItems: FeedItem[] = []

  /* Loop over the feeds and fetch them */
  for (const feedLink of feeds) {
    log('Feed Service', 'Fetching feed:', feedLink)
    const items = await fetchFeed(feedLink)
    allItems.push(...items)
  }

  return allItems
}

/* Fetch a single feed */
async function fetchFeed(feedLink: string): Promise<FeedItem[]> {
  try {
    /* Fetch the feed */
    const feed = await parser.parseURL(feedLink)

    /* Make sure the feed titlt has a value */
    const feedTitle = feed.title ?? 'Untitled'
    const feedItemCount = feed.items.length
    log('Feed Service', '-> Fetched', feedItemCount, 'items for', feedTitle)

    /* Fetch all items from the feed */
    const items = await fetchFeedItems(feed.items)

    /* Enrich the items with the feed title and link */
    const enrichedItems = items.map(item => ({ ...item, feedTitle, feedLink }) as FeedItem)

    return enrichedItems
  } catch (error) {
    log('Feed Service', '⛔️ Error fetching', feedLink, ':', error)
    return []
  }
}

/* Fetch all items from a single feed */
async function fetchFeedItems(items: Parser.Item[]): Promise<Partial<FeedItem>[]> {
  const feedItems: Partial<FeedItem>[] = []

  /* Loop over the items and fetch them */
  for (const item of items) {
    const feedItem = await fetchFeedItem(item)
    if (feedItem) feedItems.push(feedItem)
  }

  return feedItems
}

/* Fetch a single item from a feed */
async function fetchFeedItem(item: Parser.Item): Promise<Partial<FeedItem> | null> {
  const link = item.link ?? ''

  if (await articleExists(link)) return null

  const html = await fetchItemHtml(link)

  return {
    title: item.title ?? 'Untitled',
    content: item.content ?? item.contentSnippet ?? (item as any).description ?? '',
    pubDate: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
    link: link,
    html: html
  }
}

/* Fetch the HTML for a single item */
async function fetchItemHtml(url: string): Promise<string | undefined> {
  try {
    const response = await fetch(url)
    if (response.ok) {
      return await response.text()
    }
  } catch (error) {
    console.error(`Error fetching HTML for ${url}:`, error)
  }
  return undefined
}
