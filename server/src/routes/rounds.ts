import { Router } from 'express'
import { prisma } from '../db.js'
import { randomHex, sha256 } from '../utils/crypto.js'
import { runEngine, payoutForBin } from '../engine/deterministic.js'

const router = Router()
const ROWS = 12

router.post('/commit', async (_req, res) => {
  const serverSeed = randomHex(32)
  const nonce = randomHex(4)
  const commitHex = sha256(`${serverSeed}:${nonce}`)

  const round = await prisma.round.create({
    data: {
      status: 'CREATED',
      nonce,
      commitHex,
      serverSeed,
      clientSeed: '',
      combinedSeed: '',
      pegMapHash: '',
      rows: ROWS,
      dropColumn: 0,
      binIndex: 0,
      payoutMultiplier: 1,
      betCents: 0,
      pathJson: []
    },
    select: { id: true, nonce: true, commitHex: true }
  })

  res.json({ roundId: round.id, commitHex, nonce })
})

router.post('/:id/start', async (req, res) => {
  const { id } = req.params
  const { clientSeed, betCents, dropColumn } = req.body

  const r = await prisma.round.findUnique({ where: { id } })
  if (!r) return res.status(404).json({ error: 'Round not found' })

  const combinedSeed = sha256(`${r.serverSeed}:${clientSeed}:${r.nonce}`)
  const { pegMapHash, path, binIndex } = runEngine({
    rows: ROWS,
    combinedSeed,
    dropColumn
  })
  const payoutMultiplier = payoutForBin(binIndex)

  const round = await prisma.round.update({
    where: { id },
    data: {
      status: 'STARTED',
      clientSeed,
      combinedSeed,
      pegMapHash,
      dropColumn,
      binIndex,
      payoutMultiplier,
      betCents,
      pathJson: path
    }
  })
  res.json({ roundId: id, pegMapHash, rows: ROWS, round })
})

router.post('/:id/reveal', async (req, res) => {
  const { id } = req.params
  const r = await prisma.round.findUnique({ where: { id } })
  if (!r) return res.status(404).json({ error: 'Round not found' })

  await prisma.round.update({
    where: { id },
    data: { status: 'REVEALED', revealedAt: new Date() }
  })
  res.json({ serverSeed: r.serverSeed })
})

router.get('/:id', async (req, res) => {
  const round = await prisma.round.findUnique({ where: { id: req.params.id } })
  if (!round) return res.status(404).json({ error: 'Round not found' })
  res.json(round)
})

export default router
