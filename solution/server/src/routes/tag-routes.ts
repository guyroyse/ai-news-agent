import { Router } from 'express'

import {
  fetchAllTopics,
  fetchAllPeople,
  fetchAllOrganizations,
  fetchAllLocations
} from '@services'

const router = Router()

router.get('/topics', async (_req, res) => {
  try {
    const topics = await fetchAllTopics()
    res.json({ success: true, topics })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

router.get('/people', async (_req, res) => {
  try {
    const people = await fetchAllPeople()
    res.json({ success: true, people })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

router.get('/organizations', async (_req, res) => {
  try {
    const organizations = await fetchAllOrganizations()
    res.json({ success: true, organizations })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

router.get('/locations', async (_req, res) => {
  try {
    const locations = await fetchAllLocations()
    res.json({ success: true, locations })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

export default router

