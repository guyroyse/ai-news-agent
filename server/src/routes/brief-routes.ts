import { Router } from 'express'

import { brief } from '@workflows'
import type { BriefRequest } from '@workflows'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const request = req.body as BriefRequest
    const result = await brief(request)
    res.json({ success: true, ...result })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

export default router

