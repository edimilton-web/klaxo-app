"use client"

import { useEffect, useState } from "react"

const DURATION = 900

/**
 * The number the page is really about. It climbs while the statement rows
 * are still landing, so the total reads as a consequence of the list.
 *
 * It is rendered at its final value and only drops to zero once the first
 * frame actually arrives — if animation frames never run (JavaScript off,
 * reduced motion, a backgrounded tab) the real figure is simply there, and a
 * safety timer restores it either way.
 */
export function RunningTotal({ value, delay }: { value: number; delay: number }) {
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let start = 0

    const tick = (now: number) => {
      if (!start) {
        start = now
        setShown(0)
        frame = requestAnimationFrame(tick)
        return
      }
      // Ease out — fast at first, settling onto the real number.
      const t = Math.min((now - start) / DURATION, 1)
      setShown(value * (1 - Math.pow(1 - t, 3)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    const startTimer = window.setTimeout(() => {
      frame = requestAnimationFrame(tick)
    }, delay)

    const safety = window.setTimeout(() => {
      cancelAnimationFrame(frame)
      setShown(value)
    }, delay + DURATION + 600)

    return () => {
      window.clearTimeout(startTimer)
      window.clearTimeout(safety)
      cancelAnimationFrame(frame)
    }
  }, [value, delay])

  return (
    <span className="lp-total__value">
      £{shown.toFixed(2)}
      <span className="lp-total__unit"> /mo</span>
    </span>
  )
}
