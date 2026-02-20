import { createHash } from 'crypto'

import { SCHEMA_FIELD_TYPE, SCHEMA_VECTOR_FIELD_ALGORITHM } from 'redis'

import { fetchEmbeddingDims, fetchEmbedder, fetchRedisConnection } from '@adapters'
import type { Article, SearchCriteria, SearchResponse } from './types.js'

const KEY_PREFIX = 'news:aggregator:article:'
const INDEX_NAME = 'news:aggregator:article:index'

const redis = await fetchRedisConnection()

await createIndex()

/*==========================================================================
 * Article CRUD operations
 +=========================================================================*/
export async function articleExists(link: string): Promise<boolean> {
  const key = generateArticleKey(link)
  const exists = await redis.exists(key)
  return exists === 1
}

export async function saveArticle(article: Article): Promise<void> {
  const key = generateArticleKey(article.link)
  await redis.json.set(key, '$', article as any)
}

function generateArticleKey(link: string): string {
  const hash = createHash('sha1').update(link).digest('hex').substring(0, 16)
  return `${KEY_PREFIX}${hash}`
}

/*==========================================================================
 * Creates the search index if it doesn't already exist.
 +=========================================================================*/
async function createIndex(): Promise<void> {
  try {
    await redis.ft.info(INDEX_NAME)
    console.log(`Index ${INDEX_NAME} already exists`)
  } catch {
    const embeddingDimensions = fetchEmbeddingDims()

    console.log(`Creating index ${INDEX_NAME}`)
    await redis.ft.create(
      INDEX_NAME,
      {
        '$.source.title': { type: SCHEMA_FIELD_TYPE.TAG, AS: 'source' },
        '$.publicationDate': { type: SCHEMA_FIELD_TYPE.NUMERIC, AS: 'date' },
        '$.topics[*]': { type: SCHEMA_FIELD_TYPE.TAG, AS: 'topics' },
        '$.namedEntities.people[*]': { type: SCHEMA_FIELD_TYPE.TAG, AS: 'people' },
        '$.namedEntities.organizations[*]': { type: SCHEMA_FIELD_TYPE.TAG, AS: 'organizations' },
        '$.namedEntities.locations[*]': { type: SCHEMA_FIELD_TYPE.TAG, AS: 'locations' },
        '$.embedding': {
          type: SCHEMA_FIELD_TYPE.VECTOR,
          AS: 'embedding',
          ALGORITHM: SCHEMA_VECTOR_FIELD_ALGORITHM.FLAT,
          TYPE: 'FLOAT32',
          DIM: embeddingDimensions,
          DISTANCE_METRIC: 'COSINE'
        }
      },
      { ON: 'JSON', PREFIX: KEY_PREFIX }
    )
    console.log(`Index ${INDEX_NAME} created`)
    console.log(
      'NOTE: If you change the index in code, you must delete the index in Redis CLI with:',
      `FT.DROPINDEX ${INDEX_NAME}"`
    )
  }
}

/*==========================================================================
 * Fetches all unique source names, topics, people, organizations, and
 * locations from the index.
 +=========================================================================*/
export async function fetchAllSources(): Promise<string[]> {
  return redis.ft.tagVals(INDEX_NAME, 'source')
}

export async function fetchAllTopics(): Promise<string[]> {
  return redis.ft.tagVals(INDEX_NAME, 'topics')
}

export async function fetchAllPeople(): Promise<string[]> {
  return redis.ft.tagVals(INDEX_NAME, 'people')
}

export async function fetchAllOrganizations(): Promise<string[]> {
  return redis.ft.tagVals(INDEX_NAME, 'organizations')
}

export async function fetchAllLocations(): Promise<string[]> {
  return redis.ft.tagVals(INDEX_NAME, 'locations')
}

/*==========================================================================
 * Searches for articles matching the given criteria. Supports TAG filters
 * (source, topics, entities), date range, and semantic search.
 +=========================================================================*/
export async function searchArticles(criteria: SearchCriteria, limit: number = 5): Promise<SearchResponse> {
  try {
    // Build the text query from criteria
    const queryParts: string[] = []

    // Source filter (TAG field - OR logic, any of the selected sources)
    if (criteria.sources && criteria.sources.length > 0) {
      const sourceTags = criteria.sources.join('|')
      queryParts.push(`@source:{${sourceTags}}`)
    }

    // Date range filter (NUMERIC field)
    if (criteria.startDate || criteria.endDate) {
      const start = criteria.startDate ?? '-inf'
      const end = criteria.endDate ?? '+inf'
      queryParts.push(`@date:[${start} ${end}]`)
    }

    // TAG filters with AND logic - each selected tag adds a separate filter
    if (criteria.topics) criteria.topics.forEach(tag => queryParts.push(`@topics:{${tag}}`))
    if (criteria.people) criteria.people.forEach(tag => queryParts.push(`@people:{${tag}}`))
    if (criteria.organizations) criteria.organizations.forEach(tag => queryParts.push(`@organizations:{${tag}}`))
    if (criteria.locations) criteria.locations.forEach(tag => queryParts.push(`@locations:{${tag}}`))

    const textQuery = queryParts.length > 0 ? queryParts.join(' ') : '*'

    // Build embedding for semantic search if provided
    let vectorBuffer: Buffer | null = null
    if (criteria.semanticQuery) {
      const embedder = fetchEmbedder()
      const embedding = await embedder.embedQuery(criteria.semanticQuery)
      vectorBuffer = Buffer.from(new Float32Array(embedding).buffer)
    }

    // Build the query and options
    let query: string
    const options: any = { LIMIT: { from: 0, size: limit } }

    if (vectorBuffer) {
      query = `(${textQuery})=>[KNN ${limit} @embedding $vec]`

      options.PARAMS = { vec: vectorBuffer }
      options.SORTBY = { BY: '__embedding_score', DIRECTION: 'ASC' }
    } else {
      query = textQuery
      options.SORTBY = { BY: 'date', DIRECTION: 'DESC' }
    }

    // Execute the search
    const result = (await redis.ft.search(INDEX_NAME, query, options)) as {
      total: number
      documents: { id: string; value: any }[]
    }

    // Map results to SearchedArticle
    const articles = result.documents.map((doc: any) => ({
      title: doc.value.title ?? '',
      link: doc.value.link ?? '',
      content: doc.value.content ?? '',
      source: doc.value.source?.title ?? ''
    }))

    return { success: true, articles }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}
