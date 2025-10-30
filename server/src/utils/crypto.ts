import { createHash, randomBytes } from 'crypto'

export function sha256(str: string) {
  return createHash('sha256').update(str).digest('hex')
}

export function randomHex(bytes: number) {
  return randomBytes(bytes).toString('hex')
}
