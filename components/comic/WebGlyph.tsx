// The site's one Spider-Man symbol: a small web (eight spokes, two rings). Used instead of a spider so the nod
// never startles anyone with arachnophobia. Same motif as the web-shooter toggle and the splat where a web lands.
const SPOKES = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => (a * Math.PI) / 180)
const r2 = (n: number) => Math.round(n * 100) / 100
const ring = (r: number) => SPOKES.map((a) => `${r2(Math.cos(a) * r)},${r2(Math.sin(a) * r)}`).join(' ')

type Props = React.SVGProps<SVGSVGElement> & { color?: string; weight?: number }

export function WebGlyph({ color = 'currentColor', weight = 1, ...svg }: Props) {
  return (
    <svg aria-hidden viewBox="-12 -12 24 24" fill="none" stroke={color} strokeWidth={weight} strokeLinejoin="round" {...svg}>
      {SPOKES.map((a) => (
        <line key={a} x1={0} y1={0} x2={r2(Math.cos(a) * 11)} y2={r2(Math.sin(a) * 11)} />
      ))}
      <polygon points={ring(4.5)} />
      <polygon points={ring(8.5)} />
    </svg>
  )
}
