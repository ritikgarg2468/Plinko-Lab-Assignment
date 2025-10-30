import { useState } from 'react'

type Props = {
  onDrop: (opts: { clientSeed: string; betCents: number; dropColumn: number }) => void
  disabled?: boolean
  rows: number
}

export default function Controls({ onDrop, disabled, rows }: Props) {
  const [clientSeed, setClientSeed] = useState('player-seed')
  const [bet, setBet] = useState(100)
  const [col, setCol] = useState(Math.floor(rows / 2))

  return (
    <div className="card p-4 flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-sm text-slate-400">Client Seed</label>
          <input className="input" value={clientSeed} onChange={e => setClientSeed(e.target.value)} />
        </div>
        <div>
          <label className="text-sm text-slate-400">Bet (cents)</label>
          <input type="number" className="input" value={bet} onChange={e => setBet(Number(e.target.value))} />
        </div>
        <div>
          <label className="text-sm text-slate-400">Drop Column (0–{rows})</label>
          <input
            type="number"
            className="input"
            min={0}
            max={rows}
            value={col}
            onChange={e => setCol(Math.max(0, Math.min(rows, Number(e.target.value))))}
          />
        </div>
      </div>
      <button className="btn w-full" disabled={disabled} onClick={() => onDrop({ clientSeed, betCents: bet, dropColumn: col })}>
        ⬇️ Drop
      </button>
    </div>
  )
}
