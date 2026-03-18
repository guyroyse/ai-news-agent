import { fetchRedisConnection } from '@adapters'
import { log } from '../logger-service/index.js'
import type { Activity } from './types.js'

const STREAM_KEY = 'activities'
const MAX_ACTIVITIES = 10

/*==========================================================================
 * Add an activity to the global activity stream
 +=========================================================================*/
export async function addActivity(activity: Activity): Promise<void> {
  const redis = await fetchRedisConnection()

  await redis.xAdd(STREAM_KEY, '*', {
    type: activity.type,
    data: JSON.stringify(activity)
  })

  // Trim to keep only the last MAX_ACTIVITIES entries
  await redis.xTrim(STREAM_KEY, 'MAXLEN', MAX_ACTIVITIES)

  log('Activity Service', `Added ${activity.type} activity to stream`)
}

/*==========================================================================
 * Fetch all activities
 +=========================================================================*/
export async function fetchActivities(): Promise<Activity[]> {
  const redis = await fetchRedisConnection()

  const entries = await redis.xRange(STREAM_KEY, '-', '+')

  return entries.map(entry => JSON.parse(entry.message.data))
}

/*==========================================================================
 * Clear all activities
 +=========================================================================*/
export async function clearActivities(): Promise<void> {
  const redis = await fetchRedisConnection()

  await redis.del(STREAM_KEY)

  log('Activity Service', `Cleared activity stream`)
}
