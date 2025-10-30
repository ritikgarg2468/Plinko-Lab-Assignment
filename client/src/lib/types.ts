export type Round = {
  id: string
  status: 'CREATED' | 'STARTED' | 'REVEALED'
  nonce: string
  commitHex: string
  serverSeed?: string | null
  clientSeed: string
  combinedSeed: string
  pegMapHash: string
  rows: number
  dropColumn: number
  binIndex: number
  payoutMultiplier: number
  betCents: number
  pathJson: number[]
  revealedAt?: string | null
  createdAt: string
}
