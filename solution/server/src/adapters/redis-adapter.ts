import { createClient } from 'redis'

import { config } from '@root/config.js'

let redis: ReturnType<typeof createClient> | null = null

export async function fetchRedisConnection() {
  if (!redis)
    redis = await createClient({ url: config.redisUrl })
      .on('error', err => console.error('Redis Client Error', err))
      .connect()

  return redis
}

export async function cleanupRedisConnection(): Promise<void> {
  if (redis) await redis.quit()
  redis = null
}
