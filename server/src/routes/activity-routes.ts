import { Router } from 'express'

import { addActivity, fetchActivities, clearActivities } from '@services'
import type { Activity } from '@services'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const activities = await fetchActivities()
    res.json({ success: true, activities })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

router.post('/', async (req, res) => {
  try {
    const { activity } = req.body as { activity: Activity }
    if (!activity) {
      res.status(400).json({ success: false, error: 'activity is required' })
      return
    }
    await addActivity(activity)
    res.json({ success: true, activity })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

router.delete('/', async (_req, res) => {
  try {
    await clearActivities()
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

export default router
