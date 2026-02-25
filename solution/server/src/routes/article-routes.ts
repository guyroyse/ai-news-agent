import { Router } from 'express'

import { ingest } from '@workflows'
import { fetchAllSources, searchArticles } from '@services'

const router = Router()

router.post('/ingest', async (req, res) => {
  try {
    const limit = Number(req.query.limit)
    const result = Number.isNaN(limit) ? await ingest() : await ingest(limit)
    res.json({ success: true, ...result })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

router.get('/sources', async (_req, res) => {
  try {
    const sources = await fetchAllSources()
    res.json({ success: true, sources })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

router.post('/search', async (req, res) => {
  try {
    const limit = Number(req.query.limit)
    const criteria = req.body

    // Convert Date strings to Unix timestamps (seconds) for Redis NUMERIC queries
    if (criteria.startDate) {
      criteria.startDate = Math.floor(new Date(criteria.startDate).getTime() / 1000)
    }
    if (criteria.endDate) {
      criteria.endDate = Math.floor(new Date(criteria.endDate).getTime() / 1000)
    }

    const result = Number.isNaN(limit) ? await searchArticles(criteria) : await searchArticles(criteria, limit)
    res.json(result)
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

export default router

