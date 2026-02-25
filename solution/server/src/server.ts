import cors from 'cors'
import express from 'express'

import { config } from './config.js'
import { systemRoutes, articleRoutes, tagRoutes, chatRoutes, briefRoutes, activityRoutes } from './routes/index.js'

const port = config.port

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', systemRoutes)
app.use('/api', articleRoutes)
app.use('/api', tagRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/brief', briefRoutes)
app.use('/api/activities', activityRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
