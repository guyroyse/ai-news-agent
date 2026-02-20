import cors from 'cors'
import express from 'express'

import { config } from './config.js'
import { ingest } from '@ingestion'
import {
  fetchAllSources,
  fetchAllTopics,
  fetchAllPeople,
  fetchAllOrganizations,
  fetchAllLocations,
  searchArticles
} from '@services'

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

app.get('/api/topics', async (_req, res) => {
  try {
    const topics = await fetchAllTopics()
    res.json({ success: true, topics })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

app.get('/api/people', async (_req, res) => {
  try {
    const people = await fetchAllPeople()
    res.json({ success: true, people })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

app.get('/api/organizations', async (_req, res) => {
  try {
    const organizations = await fetchAllOrganizations()
    res.json({ success: true, organizations })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

app.get('/api/locations', async (_req, res) => {
  try {
    const locations = await fetchAllLocations()
    res.json({ success: true, locations })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

app.post('/api/search', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
