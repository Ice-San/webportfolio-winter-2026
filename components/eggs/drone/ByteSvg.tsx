import { WebGlyph } from '../../comic/WebGlyph'

// Byte's body: a homemade drone with a red web on the shell, two spinning rotors and a blue lens.
// The site's only robot: it flies the page, sits at Ruben's desk in the last scene and is the face in the chat.
// `tingle` adds the spider-sense lines when the visitor scrolls fast; `ink` is the line colour (light on dark scenes).
export function ByteSvg({ still, tingle, ink = '#111110' }: { still: boolean; tingle: boolean; ink?: string }) {
  const spin = still ? '' : 'animate-[spin_0.35s_linear_infinite]'
  return (
    <svg viewBox="-34 -30 68 64" className="h-auto w-full overflow-visible" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* spider-sense */}
      {tingle && (
        <g stroke="#E0241B" strokeWidth={1.6}>
          <path d="M-22 -22 l-6 -5 M-12 -27 l-2 -7 M12 -27 l2 -7 M22 -22 l6 -5" />
          <path d="M-27 -12 l-7 -1 M27 -12 l7 -1" />
        </g>
      )}
      {/* rotors */}
      <path d="M-20 -14 V-19 M20 -14 V-19" stroke={ink} strokeWidth={1.6} />
      <g className={spin} style={{ transformOrigin: '-20px -20px', transformBox: 'view-box' }}>
        <path d="M-30 -20 H-10" stroke={ink} strokeWidth={1.8} />
      </g>
      <g className={spin} style={{ transformOrigin: '20px -20px', transformBox: 'view-box' }}>
        <path d="M10 -20 H30" stroke={ink} strokeWidth={1.8} />
      </g>
      <path d="M-20 -14 Q-12 -10 -8 -8 M20 -14 Q12 -10 8 -8" stroke={ink} strokeWidth={1.6} />
      {/* shell with the web */}
      <circle cx={0} cy={2} r={16} fill="#F6F5F1" stroke={ink} strokeWidth={1.8} />
      <WebGlyph x={-9} y={-8} width={18} height={18} color="#E0241B" weight={1.1} />
      {/* lens */}
      <path d="M-9 12 Q0 18 9 12" stroke={ink} strokeWidth={1.6} />
      <circle cx={0} cy={14} r={2.2} fill="#2350D8" />
    </svg>
  )
}
