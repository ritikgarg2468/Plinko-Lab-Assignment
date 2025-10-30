import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rounds from './routes/rounds.js'
import verify from './routes/verify.js'

const app = express()
app.use(helmet())
app.use(express.json())

const allowed = (process.env.ALLOWED_ORIGINS || '').split(',')
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true)
    cb(new Error('Blocked by CORS'))
  }
}))

app.get('/api/health', (_, res) => res.json({ ok: true }))
app.use('/api/rounds', rounds)
app.use('/api/verify', verify)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`))
