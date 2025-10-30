import { sha256 } from '../utils/crypto.js'
import { seedFromHexFirst4BytesBE, xorshift32 } from '../utils/prng.js'

export function runEngine({
  rows,
  combinedSeed,
  dropColumn
}: {
  rows: number
  combinedSeed: string
  dropColumn: number
}) {
  const seed = seedFromHexFirst4BytesBE(combinedSeed)
  const rand = xorshift32(seed)

  const pegMap: number[][] = []
  for (let r = 0; r < rows; r++) {
    const row: number[] = []
    for (let i = 0; i <= r; i++) {
      const bias = 0.5 + (rand() - 0.5) * 0.2
      row.push(Math.round(bias * 1e6) / 1e6)
    }
    pegMap.push(row)
  }
  const pegMapHash = sha256(JSON.stringify(pegMap))

  const adj = (dropColumn - Math.floor(rows / 2)) * 0.01
  let pos = 0
  const path: number[] = []
  for (let r = 0; r < rows; r++) {
    const peg = pegMap[r][Math.min(pos, r)]
    let bias = peg + adj
    bias = Math.min(1, Math.max(0, bias))
    const right = rand() >= bias
    path.push(right ? 1 : 0)
    if (right) pos++
  }

  const binIndex = pos
  return { pegMap, pegMapHash, path, binIndex }
}

export function payoutForBin(bin: number) {
  const table = [8, 4, 2, 1, 1, 1, 1, 1, 1, 1, 2, 4, 8]
  return table[bin] ?? 1
}
