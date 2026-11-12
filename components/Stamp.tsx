import { CheckCircle2, FlaskConical, Hammer } from 'lucide-react'
import type { Project } from '@/content/projects'

const icons = { done: CheckCircle2, progress: Hammer, beta: FlaskConical }

// Quest status. Icon + text, so status never depends on colour alone.
export function Stamp({ tone, label, className = '' }: { tone: Project['tone']; label: string; className?: string }) {
  const Icon = icons[tone]
  return (
    <span className={`chip shrink-0 ${tone === 'done' ? 'text-muted' : 'border-red/40 text-red-text'} ${className}`}>
      <Icon aria-hidden className="size-3.5" />
      {label}
    </span>
  )
}
