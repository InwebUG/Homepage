import { clientEntry, css, ref, type Handle } from 'remix/ui'

/**
 * A single, page-wide enhancement layer. It hydrates once and progressively
 * upgrades the static HTML with mouse-driven motion:
 *
 *  - a custom trailing cursor (ring + dot) that reacts to interactive targets
 *  - magnetic buttons        ([data-magnetic])
 *  - 3D tilt cards           ([data-tilt])
 *  - scroll reveals          ([data-reveal])
 *  - animated counters       ([data-count])
 *  - a cursor-following glow ([data-glow])
 *  - a scroll-aware nav       ([data-nav] + [data-navlink])
 *
 * Everything is attached inside a `ref` callback, so none of it runs during
 * server rendering, and all listeners are torn down via the provided signal.
 */
export const Effects = clientEntry(import.meta.url, function Effects(_handle: Handle) {
  return () => (
    <div
      aria-hidden="true"
      mix={ref((_node, signal) => {
        setup(signal)
      })}
    >
      <div className="rmx-cursor-ring" mix={cursorRing} />
      <div className="rmx-cursor-dot" mix={cursorDot} />
    </div>
  )
})

function setup(signal: AbortSignal) {
  // Signals the head failsafe that the effects layer hydrated successfully.
  ;(window as unknown as { __fx?: boolean }).__fx = true

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  setupReveals(signal)
  setupCounters(signal)
  setupNav(signal)

  if (reduce) return

  setupCursor(signal)
  setupMagnetic(signal)
  setupTilt(signal)
  setupGlow(signal)
}

// ---------------------------------------------------------------------------
// Custom cursor: ring lerps toward the pointer, dot tracks it precisely.
// ---------------------------------------------------------------------------
function setupCursor(signal: AbortSignal) {
  const ring = document.querySelector<HTMLElement>('.rmx-cursor-ring')
  const dot = document.querySelector<HTMLElement>('.rmx-cursor-dot')
  if (!ring || !dot || matchMedia('(pointer: coarse)').matches) return

  let targetX = window.innerWidth / 2
  let targetY = window.innerHeight / 2
  let ringX = targetX
  let ringY = targetY
  let hovering = false
  let visible = false

  const onMove = (event: PointerEvent) => {
    targetX = event.clientX
    targetY = event.clientY
    dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`
    if (!visible) {
      visible = true
      ring.style.opacity = '1'
      dot.style.opacity = '1'
    }
    const interactive = (event.target as Element | null)?.closest(
      'a, button, [data-tilt], [data-magnetic], input, textarea, select, label',
    )
    hovering = Boolean(interactive)
  }

  let frame = 0
  const tick = () => {
    ringX += (targetX - ringX) * 0.18
    ringY += (targetY - ringY) * 0.18
    const scale = hovering ? 1.8 : 1
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`
    ring.style.borderColor = hovering ? 'rgba(255,101,219,0.9)' : 'rgba(255,255,255,0.5)'
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)

  const onLeave = () => {
    visible = false
    ring.style.opacity = '0'
    dot.style.opacity = '0'
  }

  window.addEventListener('pointermove', onMove, { signal })
  document.addEventListener('pointerleave', onLeave, { signal })
  signal.addEventListener('abort', () => cancelAnimationFrame(frame))
}

// ---------------------------------------------------------------------------
// Magnetic buttons drift toward the pointer. Only ever ONE button reacts at a
// time — the one whose center is nearest the pointer (so two adjacent CTAs
// never get pulled together). The pull is eased every frame for smoothness.
// ---------------------------------------------------------------------------
function setupMagnetic(signal: AbortSignal) {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'))
  if (!els.length) return

  const radius = 120
  const strength = 0.35
  const state = els.map(() => ({ cx: 0, cy: 0, tx: 0, ty: 0 }))
  let raf = 0

  const ensureRaf = () => {
    if (!raf) raf = requestAnimationFrame(tick)
  }

  const tick = () => {
    let active = false
    for (let i = 0; i < els.length; i++) {
      const s = state[i]
      s.cx += (s.tx - s.cx) * 0.16
      s.cy += (s.ty - s.cy) * 0.16
      if (Math.abs(s.cx) < 0.05 && Math.abs(s.cy) < 0.05 && s.tx === 0 && s.ty === 0) {
        els[i].style.transform = ''
      } else {
        els[i].style.transform = `translate(${s.cx.toFixed(2)}px, ${s.cy.toFixed(2)}px)`
        active = true
      }
    }
    raf = active ? requestAnimationFrame(tick) : 0
  }

  const onMove = (event: PointerEvent) => {
    // Pick the single nearest button by distance from its center to the pointer
    // (vertical distance included, so stacked buttons are separated by row).
    let nearest = -1
    let nearestDist = Infinity
    const cx: number[] = []
    const cy: number[] = []
    const reach: number[] = []
    for (let i = 0; i < els.length; i++) {
      const r = els[i].getBoundingClientRect()
      cx[i] = r.left + r.width / 2
      cy[i] = r.top + r.height / 2
      reach[i] = r.width / 2 + radius
      const d = Math.hypot(event.clientX - cx[i], event.clientY - cy[i])
      if (d < nearestDist) {
        nearestDist = d
        nearest = i
      }
    }
    for (let i = 0; i < els.length; i++) {
      const pull = i === nearest && nearestDist < reach[i]
      state[i].tx = pull ? (event.clientX - cx[i]) * strength : 0
      state[i].ty = pull ? (event.clientY - cy[i]) * strength : 0
    }
    ensureRaf()
  }

  const reset = () => {
    for (const s of state) {
      s.tx = 0
      s.ty = 0
    }
    ensureRaf()
  }

  window.addEventListener('pointermove', onMove, { signal })
  document.addEventListener('pointerleave', reset, { signal })
  signal.addEventListener('abort', () => cancelAnimationFrame(raf))
}

// ---------------------------------------------------------------------------
// Tilt cards rotate in 3D based on the pointer position over the card.
// ---------------------------------------------------------------------------
function setupTilt(signal: AbortSignal) {
  const max = 9
  for (const el of document.querySelectorAll<HTMLElement>('[data-tilt]')) {
    el.style.transformStyle = 'preserve-3d'
    el.style.transition = 'transform 200ms ease'
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      const rx = (0.5 - py) * max * 2
      const ry = (px - 0.5) * max * 2
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    }
    const reset = () => {
      el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'
    }
    el.addEventListener('pointerenter', () => (el.style.transition = 'transform 80ms ease'), {
      signal,
    })
    el.addEventListener('pointermove', onMove, { signal })
    el.addEventListener('pointerleave', () => {
      el.style.transition = 'transform 400ms ease'
      reset()
    }, { signal })
  }
}

// ---------------------------------------------------------------------------
// Scroll reveals: stagger siblings, reveal once.
// ---------------------------------------------------------------------------
function setupReveals(signal: AbortSignal) {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'))
    return
  }
  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const delay = Number(el.dataset.revealDelay ?? 0)
          el.style.transitionDelay = `${delay}ms`
          el.classList.add('is-in')
          obs.unobserve(el)
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  )
  els.forEach((el) => observer.observe(el))
  signal.addEventListener('abort', () => observer.disconnect())
}

// ---------------------------------------------------------------------------
// Counters animate from 0 to their target when scrolled into view.
// ---------------------------------------------------------------------------
function setupCounters(signal: AbortSignal) {
  const els = document.querySelectorAll<HTMLElement>('[data-count]')
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => (el.textContent = format(el)))
    return
  }
  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        obs.unobserve(el)
        run(el)
      }
    },
    { threshold: 0.6 },
  )
  els.forEach((el) => observer.observe(el))
  signal.addEventListener('abort', () => observer.disconnect())

  function format(el: HTMLElement, value?: number) {
    const target = Number(el.dataset.count ?? 0)
    const decimals = Number(el.dataset.decimals ?? 0)
    const n = value ?? target
    return `${el.dataset.prefix ?? ''}${n.toFixed(decimals)}${el.dataset.suffix ?? ''}`
  }

  function run(el: HTMLElement) {
    const target = Number(el.dataset.count ?? 0)
    const duration = 1500
    const start = performance.now()
    const step = (now: number) => {
      if (signal.aborted) return
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      el.textContent = format(el, target * eased)
      if (t < 1) requestAnimationFrame(step)
      else el.textContent = format(el)
    }
    requestAnimationFrame(step)
  }
}

// ---------------------------------------------------------------------------
// Hero glow follows the pointer inside its container.
// ---------------------------------------------------------------------------
function setupGlow(signal: AbortSignal) {
  for (const glow of document.querySelectorAll<HTMLElement>('[data-glow]')) {
    const parent = glow.parentElement
    if (!parent) continue
    const onMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect()
      glow.style.left = `${event.clientX - rect.left}px`
      glow.style.top = `${event.clientY - rect.top}px`
    }
    parent.addEventListener('pointermove', onMove, { signal })
  }
}

// ---------------------------------------------------------------------------
// Nav gains a solid background after scrolling and highlights the active link.
// ---------------------------------------------------------------------------
function setupNav(signal: AbortSignal) {
  const nav = document.querySelector<HTMLElement>('[data-nav]')
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true, signal })
  }

  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-navlink]'))
  if (links.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = entry.target.id
          links.forEach((link) =>
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`),
          )
        }
      },
      { threshold: 0.5 },
    )
    links.forEach((link) => {
      const id = link.getAttribute('href')?.slice(1)
      const section = id && document.getElementById(id)
      if (section) observer.observe(section)
    })
    signal.addEventListener('abort', () => observer.disconnect())
  }
}

const cursorRing = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '34px',
  height: '34px',
  marginLeft: 0,
  border: '1.5px solid rgba(255,255,255,0.5)',
  borderRadius: '50%',
  pointerEvents: 'none',
  zIndex: 9999,
  opacity: 0,
  transition: 'opacity 250ms ease, border-color 250ms ease',
  mixBlendMode: 'difference',
})

const cursorDot = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '6px',
  height: '6px',
  background: '#fff',
  borderRadius: '50%',
  pointerEvents: 'none',
  zIndex: 9999,
  opacity: 0,
  transition: 'opacity 250ms ease',
  mixBlendMode: 'difference',
})
