import { Router } from 'express'
import { sha256 } from '../utils/crypto.js'
import { runEngine } from '../engine/deterministic.js'

const router = Router()

router.get('/', (req, res) => {
  const { serverSeed, clientSeed, nonce, dropColumn } = req.query
  if (!serverSeed || !clientSeed || !nonce)
    return res.status(400).json({ error: 'missing params' })

  const commitHex = sha256(`${serverSeed}:${nonce}`)
  const combinedSeed = sha256(`${serverSeed}:${clientSeed}:${nonce}`)
  const { pegMapHash, binIndex } = runEngine({
    rows: 12,
    combinedSeed,
    dropColumn: Number(dropColumn)
  })
  res.json({ commitHex, combinedSeed, pegMapHash, binIndex })
})

export default router
