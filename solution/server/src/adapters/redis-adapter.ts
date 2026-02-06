import { createClient, SCHEMA_FIELD_TYPE, SCHEMA_VECTOR_FIELD_ALGORITHM } from 'redis'

import { config } from '@root/config.js'

const KEY_PREFIX = 'news:aggregator:article:'
const INDEX_NAME = 'news:aggregator:article:index'
const EMBEDDING_DIM = 1536

const redis: ReturnType<typeof createClient> = await createClient({ url: config.redisUrl })
  .on('error', err => console.error('Redis Client Error', err))
  .connect()

try {
  await redis.ft.info(INDEX_NAME)
  console.log(`Index ${INDEX_NAME} already exists`)
} catch {
  console.log(`Creating index ${INDEX_NAME}`)
  await redis.ft.create(
    INDEX_NAME,
    {
      '$.source.title': { type: SCHEMA_FIELD_TYPE.TAG, AS: 'source' },
      '$.publicationDate': { type: SCHEMA_FIELD_TYPE.NUMERIC, AS: 'date' },
      '$.topics[*]': { type: SCHEMA_FIELD_TYPE.TEXT, AS: 'topics' },
      '$.namedEntities.people[*]': { type: SCHEMA_FIELD_TYPE.TEXT, AS: 'people' },
      '$.namedEntities.organizations[*]': { type: SCHEMA_FIELD_TYPE.TEXT, AS: 'organizations' },
      '$.namedEntities.locations[*]': { type: SCHEMA_FIELD_TYPE.TEXT, AS: 'locations' },
      '$.embedding': {
        type: SCHEMA_FIELD_TYPE.VECTOR,
        AS: 'embedding',
        ALGORITHM: SCHEMA_VECTOR_FIELD_ALGORITHM.FLAT,
        TYPE: 'FLOAT32',
        DIM: EMBEDDING_DIM,
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

export async function fetchRedisConnection() {
  return redis
}
