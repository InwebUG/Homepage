import { type RemixNode } from 'remix/ui'

function Svg() {
  return ({ children }: { children: RemixNode }) => (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function IconDesign() {
  return () => (
    <Svg>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M3 9h18M9 21V9" />
    </Svg>
  )
}

export function IconCode() {
  return () => (
    <Svg>
      <path d="M8 6l-5 6 5 6M16 6l5 6-5 6M13 4l-2 16" />
    </Svg>
  )
}

export function IconServer() {
  return () => (
    <Svg>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </Svg>
  )
}

export function IconCart() {
  return () => (
    <Svg>
      <path d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.3h8.2a1.5 1.5 0 0 0 1.5-1.2L21 8H6" />
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
    </Svg>
  )
}

export function IconGauge() {
  return () => (
    <Svg>
      <path d="M12 14l4-4M4.5 18a9 9 0 1 1 15 0" />
      <circle cx="12" cy="14" r="1" />
    </Svg>
  )
}

export function IconCheck() {
  return () => (
    <Svg>
      <path d="M20 6L9 17l-5-5" />
    </Svg>
  )
}
