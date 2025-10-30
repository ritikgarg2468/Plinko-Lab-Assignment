import axios from 'axios'
import type { Round } from './types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api'
})

export async function commitRound() {
  const { data } = await api.post('/rounds/commit')
  return data as { roundId: string; commitHex: string; nonce: string }
}

export async function startRound(id: string, payload: { clientSeed: string; betCents: number; dropColumn: number }) {
  const { data } = await api.post(`/rounds/${id}/start`, payload)
  return data as { roundId: string; pegMapHash: string; rows: number; round: Round }
}

export async function revealRound(id: string) {
  const { data } = await api.post(`/rounds/${id}/reveal`)
  return data as { serverSeed: string }
}

export async function getRound(id: string) {
  const { data } = await api.get(`/rounds/${id}`)
  return data as Round
}

export async function verify(params: { serverSeed: string; clientSeed: string; nonce: string; dropColumn: number }) {
  const { data } = await api.get('/verify', { params })
  return data as {
    commitHex: string
    combinedSeed: string
    pegMapHash: string
    binIndex: number
  }
}
