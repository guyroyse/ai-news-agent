import cors from 'cors'
import express from 'express'

import { config } from './config.js'
import { articleRoutes, tagRoutes, chatRoutes, briefRoutes, activityRoutes } from './routes/index.js'

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

app.use('/api/articles', articleRoutes)
app.use('/api/tags', tagRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/brief', briefRoutes)
app.use('/api/activities', activityRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
