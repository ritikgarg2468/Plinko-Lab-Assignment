export function seedFromHexFirst4BytesBE(hex: string) {
  const n = parseInt(hex.slice(0, 8), 16) >>> 0
  return n || 1
}

export function xorshift32(seed: number) {
  let s = seed >>> 0
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return (s >>> 0) / 0xffffffff
  }
}
