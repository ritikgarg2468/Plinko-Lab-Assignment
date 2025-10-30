const PAY = [8,4,2,1,1,1,1,1,1,1,2,4,8]

export default function Paytable() {
  return (
    <div className="card p-3">
      <div className="font-semibold mb-2">Payout Table</div>
      <div className="grid grid-cols-13 gap-1 text-center text-sm">
        {PAY.map((m,i) => (
          <div key={i} className="bg-slate-800 rounded-md py-2">{i}<div className="text-indigo-300">{m}x</div></div>
        ))}
      </div>
    </div>
  )
}
