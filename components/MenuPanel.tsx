'use client'

// The mobile menu is a native <details> (works without JS); with JS, a tap on a link also closes it.
export function MenuPanel({ children }: { children: React.ReactNode }) {
  return (
    <ul
      onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}
      className="absolute right-0 top-12 grid min-w-48 gap-1 rounded-2xl border border-line bg-paper p-4 text-base"
    >
      {children}
    </ul>
  )
}
