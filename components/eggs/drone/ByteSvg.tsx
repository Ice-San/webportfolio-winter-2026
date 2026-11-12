// Byte's body: a homemade spider-drone, red spider on the shell, two spinning rotors, a blue lens.
// `tingle` adds the spider-sense lines when the visitor scrolls fast.
export function ByteSvg({ still, tingle }: { still: boolean; tingle: boolean }) {
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
      <path d="M-20 -14 V-19 M20 -14 V-19" stroke="#111110" strokeWidth={1.6} />
      <g className={spin} style={{ transformOrigin: '-20px -20px', transformBox: 'view-box' }}>
        <path d="M-30 -20 H-10" stroke="#111110" strokeWidth={1.8} />
      </g>
      <g className={spin} style={{ transformOrigin: '20px -20px', transformBox: 'view-box' }}>
        <path d="M10 -20 H30" stroke="#111110" strokeWidth={1.8} />
      </g>
      <path d="M-20 -14 Q-12 -10 -8 -8 M20 -14 Q12 -10 8 -8" stroke="#111110" strokeWidth={1.6} />
      {/* shell with the spider */}
      <circle cx={0} cy={2} r={16} fill="#F6F5F1" stroke="#111110" strokeWidth={1.8} />
      <g stroke="#E0241B" strokeWidth={1.1}>
        <path d="M-2 -3 L-6 -7 L-7 -10 M-2.5 -1 L-7 -2 L-9 -5 M-2.5 1 L-7 3 L-8 6 M-2 3 L-5 6 L-5 9" />
        <path d="M2 -3 L6 -7 L7 -10 M2.5 -1 L7 -2 L9 -5 M2.5 1 L7 3 L8 6 M2 3 L5 6 L5 9" />
      </g>
      <ellipse cx={0} cy={0} rx={2.4} ry={4} fill="#E0241B" />
      {/* lens */}
      <path d="M-9 12 Q0 18 9 12" stroke="#111110" strokeWidth={1.6} />
      <circle cx={0} cy={14} r={2.2} fill="#2350D8" />
    </svg>
  )
}
