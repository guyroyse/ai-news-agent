import { createHash } from 'crypto'

import { fetchRedisConnection } from '@adapters'

export type Source = {
  title: string
  link: string
}

export type Topics = string[]

export type NamedEntities = {
  people: string[]
  organizations: string[]
  locations: string[]
}

export type Article = {
  title: string
  link: string
  publicationDate: number
  content: string
  summary: string
  source: Source
  topics: Topics
  namedEntities: NamedEntities
  embedding: number[]
}

const INDEX_NAME = 'news:aggregator:article:index'

export async function articleExists(link: string): Promise<boolean> {
  const redis = await fetchRedisConnection()
  const key = generateArticleKey(link)
  const exists = await redis.exists(key)
  return exists === 1
}

export async function fetchAllSources(): Promise<string[]> {
  const redis = await fetchRedisConnection()
  return redis.ft.tagVals(INDEX_NAME, 'source')
}

export async function saveArticle(article: Article): Promise<void> {
  const redis = await fetchRedisConnection()
  const key = generateArticleKey(article.link)
  await redis.json.set(key, '$', article as any)
}

function generateArticleKey(link: string): string {
  const hash = createHash('sha1').update(link).digest('hex').substring(0, 16)
  return `news:aggregator:article:${hash}`
}
