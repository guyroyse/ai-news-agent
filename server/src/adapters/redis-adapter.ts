import { createClient } from 'redis'

import { config } from '@root/config.js'

const redis: ReturnType<typeof createClient> = await createClient({ url: config.redisUrl })
  .on('error', err => console.error('Redis Client Error', err))
  .connect()

export async function fetchRedisConnection() {
  return redis
}
