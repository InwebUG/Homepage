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

export function IconUsers() {
  return () => (
    <Svg>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.4a3 3 0 0 1 0 5.6M16.5 20a5.5 5.5 0 0 0-3-4.9" />
    </Svg>
  )
}

export function IconCard() {
  return () => (
    <Svg>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 9.5h18M6.5 15h4" />
    </Svg>
  )
}

export function IconShield() {
  return () => (
    <Svg>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </Svg>
  )
}

export function IconDoc() {
  return () => (
    <Svg>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M8 13h8M8 17h6" />
    </Svg>
  )
}

export function IconMail() {
  return () => (
    <Svg>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </Svg>
  )
}

export function IconPhone() {
  return () => (
    <Svg>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </Svg>
  )
}

export function IconBuilding() {
  return () => (
    <Svg>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" />
    </Svg>
  )
}

export function IconScale() {
  return () => (
    <Svg>
      <path d="M12 4v16M7 20h10M5 7h14M12 5l-5 2 5-2 5 2-5-2" />
      <path d="M7 7l-3 6h6zM17 7l-3 6h6z" />
    </Svg>
  )
}

export function IconUser() {
  return () => (
    <Svg>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </Svg>
  )
}

export function IconCookie() {
  return () => (
    <Svg>
      <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-4-4 3 3 0 0 0-1-1z" />
      <path d="M9 10h.01M14 13h.01M10 15h.01" />
    </Svg>
  )
}

export function IconChart() {
  return () => (
    <Svg>
      <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-7" />
    </Svg>
  )
}

export function IconDatabase() {
  return () => (
    <Svg>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </Svg>
  )
}

export function IconLock() {
  return () => (
    <Svg>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Svg>
  )
}

export function IconPin() {
  return () => (
    <Svg>
      <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  )
}

export function IconArrowLeft() {
  return () => (
    <Svg>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </Svg>
  )
}
