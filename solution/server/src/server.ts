import cors from 'cors'
import express from 'express'

import { config } from './config.js'
import { ingest } from '@ingestion'
import { fetchAllSources } from '@services'

const port = config.port

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/version', (_req, res) => {
  res.json({
    name: 'News Agent API',
    version: '1.0.0',
    node: process.version
  })
})

app.post('/api/ingest', async (req, res) => {
  try {
    const limit = Number(req.query.limit)
    const result = Number.isNaN(limit) ? await ingest() : await ingest(limit)
    res.json({ success: true, ...result })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

app.get('/api/sources', async (_req, res) => {
  try {
    const sources = await fetchAllSources()
    res.json({ success: true, sources })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
