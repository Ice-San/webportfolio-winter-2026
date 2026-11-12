import { PenLine } from 'lucide-react'

// Marks copy only Ruben can write. Visible on purpose so it can't ship unnoticed.
export function Tbd({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="flex items-start gap-3 border border-dashed border-accent/60 p-4 text-sm">
      <PenLine aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-text" />
      <p>
        <span className="font-mono uppercase tracking-wider text-accent-text">{label}</span>
        {hint && <span className="mt-1 block text-muted">{hint}</span>}
      </p>
    </div>
  )
}
