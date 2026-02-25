import { Router } from 'express'

import { chat } from '@workflows'
import type { ChatRequest } from '@workflows'
import { fetchChatHistory, clearChatHistory, clearWorkingMemory } from '@services'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const request = req.body as ChatRequest
    const result = await chat(request)
    res.json({ success: true, ...result })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

router.get('/history', async (req, res) => {
  try {
    const sessionId = req.query.sessionId as string
    if (!sessionId) {
      res.status(400).json({ success: false, error: 'sessionId is required' })
      return
    }
    const messages = await fetchChatHistory(sessionId)
    res.json({ success: true, messages })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

router.delete('/history', async (req, res) => {
  try {
    const sessionId = req.query.sessionId as string
    if (!sessionId) {
      res.status(400).json({ success: false, error: 'sessionId is required' })
      return
    }
    // Clear both the chat history stream and AMS working memory
    await clearChatHistory(sessionId)
    await clearWorkingMemory(sessionId)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) })
  }
})

export default router
