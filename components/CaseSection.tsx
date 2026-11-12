import { Reveal } from './motion/Reveal'

// One section of the case study. A null body is copy Ruben hasn't written yet: visitors don't see the section at all
// (docs/README.md lists what's missing).
export function CaseSection({ heading, body, children }: { heading: string; body?: string | null; children?: React.ReactNode }) {
  if (!children && !body) return null
  return (
    <Reveal className="grid gap-4 border-t border-line pt-6 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8">
      <h2 className="kicker h-fit">{heading}</h2>
      <div className="prose-story grid gap-4">{children ?? <p>{body}</p>}</div>
    </Reveal>
  )
}
