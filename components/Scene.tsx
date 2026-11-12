// One page of the issue. The ground never changes; overflow-x-clip keeps flying panels from widening the viewport.
export function Scene({ id, label, className = '', children }: { id: string; label: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-label={label} className={`relative scroll-mt-16 overflow-x-clip ${className}`}>
      {children}
    </section>
  )
}
