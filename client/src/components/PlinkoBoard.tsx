import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  rows: number
  path: number[] | null
  binIndex: number | null
  muted: boolean
  onPeg?: () => void
  onWin?: () => void
}

export default function PlinkoBoard({ rows, path, binIndex, onPeg, onWin }: Props) {
  const width = 600
  const pegGapY = 36
  const pegGapX = 36
  const topPad = 40

  const pegPositions = useMemo(() => {
    const arr: {x:number, y:number}[] = []
    for (let r=0; r<rows; r++) {
      for (let c=0; c<=r; c++) {
        const x = width/2 - pegGapX*r/2 + c*pegGapX
        const y = topPad + r*pegGapY
        arr.push({ x, y })
      }
    }
    return arr
  }, [rows])

  const [ball, setBall] = useState<{x:number; y:number} | null>(null)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (!path) return
    let r = -1, pos = 0, x = width/2, y = 0
    setBall({ x, y })

    const step = () => {
      r++
      if (r >= rows) return onWin?.()
      const isRight = path[r] === 1
      const pegIdx = (r*(r+1))/2 + Math.min(pos, r)
      const peg = pegPositions[pegIdx]
      const frames = 10
      let t = 0
      const baseX = peg.x, baseY = peg.y
      const targetX = baseX + (isRight ? pegGapX/2 : -pegGapX/2)
      const targetY = baseY + pegGapY

      const animateToPeg = () => {
        t++
        const k = t/frames
        setBall({ x: x + (baseX - x)*k, y: y + (baseY - y)*k })
        if (t < frames) raf.current = requestAnimationFrame(animateToPeg)
        else {
          onPeg?.()
          t = 0
          const fall = () => {
            t++
            const k2 = t/frames
            setBall({ x: baseX + (targetX - baseX)*k2, y: baseY + (targetY - baseY)*k2 })
            if (t < frames) raf.current = requestAnimationFrame(fall)
            else { x = targetX; y = targetY; if (isRight) pos++; raf.current = requestAnimationFrame(step) }
          }
          raf.current = requestAnimationFrame(fall)
        }
      }
      animateToPeg()
    }
    raf.current = requestAnimationFrame(step)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [path, rows, pegPositions, onPeg, onWin])

  return (
    <div className="card p-4">
      <svg viewBox={`0 0 ${width} ${topPad + rows*pegGapY + 80}`} className="w-full">
        {pegPositions.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="4" className="fill-slate-400" />)}
        {Array.from({length: rows+1}).map((_,i)=>{
          const x = width/2 - pegGapX*rows/2 + i*pegGapX
          const y = topPad + rows*pegGapY + 20
          const active = binIndex===i
          return (
            <g key={i}>
              <rect x={x-12} y={y} width="24" height="28" className={`fill-${active?'indigo-500':'slate-700'}`} rx="6" />
              <text x={x} y={y+19} textAnchor="middle" className="fill-slate-200 text-[10px]">{i}</text>
            </g>
          )
        })}
        {ball && <motion.circle cx={ball.x} cy={ball.y} r="8" className="fill-white drop-shadow" />}
      </svg>
    </div>
  )
}
