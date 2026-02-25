import { Router } from 'express'

const router = Router()

router.get('/version', (_req, res) => {
  res.json({
    name: 'News Agent API',
    version: '1.0.0',
    node: process.version
  })
})

export default router

