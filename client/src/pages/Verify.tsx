import { useState } from 'react'
import { verify } from '../lib/api'

export default function Verify() {
  const [serverSeed, setServerSeed] = useState('')
  const [clientSeed, setClientSeed] = useState('')
  const [nonce, setNonce] = useState('')
  const [dropColumn, setDropColumn] = useState(6)
  const [out, setOut] = useState<any | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await verify({ serverSeed, clientSeed, nonce, dropColumn })
      setOut(data)
    } catch (err) {
      console.error(err)
      setOut({ error: 'Verification failed' })
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <form onSubmit={onSubmit} className="card p-4 grid gap-3">
        <div className="text-lg font-semibold">Verifier</div>

        <div>
          <label className="text-sm text-slate-400">Server Seed</label>
          <input className="input" value={serverSeed} onChange={e => setServerSeed(e.target.value)} />
        </div>

        <div>
          <label className="text-sm text-slate-400">Client Seed</label>
          <input className="input" value={clientSeed} onChange={e => setClientSeed(e.target.value)} />
        </div>

        <div>
          <label className="text-sm text-slate-400">Nonce</label>
          <input className="input" value={nonce} onChange={e => setNonce(e.target.value)} />
        </div>

        <div>
          <label className="text-sm text-slate-400">Drop Column</label>
          <input
            type="number"
            min={0}
            max={12}
            className="input"
            value={dropColumn}
            onChange={e => setDropColumn(Number(e.target.value))}
          />
        </div>

        <button className="btn">Verify</button>
      </form>

      <div className="card p-4">
        <div className="font-semibold mb-2">Result</div>
        {out ? (
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(out, null, 2)}</pre>
        ) : (
          <div className="text-slate-400 text-sm">Enter inputs above and press Verify.</div>
        )}
      </div>
    </div>
  )
}
