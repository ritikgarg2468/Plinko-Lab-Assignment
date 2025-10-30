import { useState, useEffect } from 'react'
import Controls from '../components/Controls'
import Paytable from '../components/Paytable'
import PlinkoBoard from '../components/PlinkoBoard'
import { commitRound, startRound, revealRound, getRound } from '../lib/api'
import type { Round } from '../lib/types'
import { useSound } from '../lib/useSound'

const ROWS = 12

export default function Home() {
  const [round, setRound] = useState<Round | null>(null)
  const [loading, setLoading] = useState(false)
  const [muted, setMuted] = useState(false)

  const peg = useSound('/sfx/peg.wav', 0.25)
  const win = useSound('/sfx/win.wav', 0.5)
  useEffect(() => {
    peg.setMuted(muted)
    win.setMuted(muted)
  }, [muted])

  const handleDrop = async (opts: { clientSeed: string; betCents: number; dropColumn: number }) => {
    try {
      setLoading(true)
      const { roundId } = await commitRound()
      await startRound(roundId, opts)
      const r = await getRound(roundId)
      setRound(r)
      await revealRound(roundId)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-4">
      <PlinkoBoard
        rows={ROWS}
        path={round?.pathJson ?? null}
        binIndex={round?.binIndex ?? null}
        muted={muted}
        onPeg={() => peg.play()}
        onWin={() => win.play()}
      />

      <div className="flex flex-wrap items-center gap-2">
        <button className="btn" onClick={() => setMuted(m => !m)}>
          {muted ? '🔇 Unmute' : '🔊 Mute'}
        </button>
        <div className="text-slate-400 text-sm">Tip: Use keyboard arrows to move column, space to drop.</div>
      </div>

      <Controls rows={ROWS} onDrop={handleDrop} disabled={loading} />
      <Paytable />

      {round && (
        <div className="card p-4 text-sm break-all">
          <div className="font-semibold mb-2">Round Details</div>
          <div><b>ID:</b> {round.id}</div>
          <div><b>Status:</b> {round.status}</div>
          <div><b>Commit:</b> {round.commitHex}</div>
          <div><b>Nonce:</b> {round.nonce}</div>
          <div><b>CombinedSeed:</b> {round.combinedSeed}</div>
          <div><b>PegMapHash:</b> {round.pegMapHash}</div>
          <div><b>Bin:</b> {round.binIndex}</div>
          <div><b>Payout ×:</b> {round.payoutMultiplier}</div>
        </div>
      )}
    </div>
  )
}
