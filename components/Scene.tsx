// One page of the issue. The ground never changes; overflow-x-clip keeps flying panels from widening the viewport.
// Every section gets the same vertical rhythm (.section-y); only the full-screen cover opts out with `flush`.
export function Scene({ id, label, flush = false, className = '', children }: { id: string; label: string; flush?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-label={label} className={`relative scroll-mt-16 overflow-x-clip ${flush ? '' : 'section-y'} ${className}`}>
      {children}
    </section>
  )
}
