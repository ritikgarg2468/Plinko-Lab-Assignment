import { useEffect, useRef } from 'react'

export function useSound(src: string, volume = 0.4) {
  const ref = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const a = new Audio(src)
    a.volume = volume
    ref.current = a
    return () => { a.pause(); ref.current = null }
  }, [src, volume])

  return {
    play: () => {
      if (!ref.current) return
      ref.current.currentTime = 0
      ref.current.play()
    },
    setMuted: (muted: boolean) => {
      if (ref.current) ref.current.muted = muted
    }
  }
}
