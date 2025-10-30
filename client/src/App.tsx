import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function App() {
  const { pathname } = useLocation()
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="text-xl font-bold">🟣 Plinko Lab</Link>
          <nav className="ml-auto flex gap-2">
            <Link to="/" className={`px-3 py-1 rounded-lg ${pathname==='/'?'bg-slate-800':''}`}>Game</Link>
            <Link to="/verify" className={`px-3 py-1 rounded-lg ${pathname==='/verify'?'bg-slate-800':''}`}>Verifier</Link>
          </nav>
        </div>
      </header>

      <motion.main
        className="max-w-6xl mx-auto px-4 py-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Outlet />
      </motion.main>

      <footer className="py-10 text-center text-sm text-slate-400">
        Built with ♥ — deterministic & provably-fair demo
      </footer>
    </div>
  )
}
