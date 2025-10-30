import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rounds from './routes/rounds.js'
import verify from './routes/verify.js'

const app = express()
app.use(helmet())
app.use(express.json())

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/api/health', (_, res) => res.json({ ok: true }))
app.use('/api/rounds', rounds)
app.use('/api/verify', verify)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`))
