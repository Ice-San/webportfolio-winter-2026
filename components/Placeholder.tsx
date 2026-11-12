import Image, { type StaticImageData } from 'next/image'
import { ImageIcon } from 'lucide-react'

// A picture in a frame. With `src` it's the real photo or screenshot; without, a stand-in that says what should go
// here and exposes that as the image's description. A real picture keeps its own aspect ratio (never cropped); `ratio`
// only shapes the stand-in. Motion comes from the panel around it.
export function Placeholder({
  description,
  label,
  src,
  sizes = '(min-width: 1024px) 40rem, 100vw',
  ratio = '16/9',
  className = '',
}: {
  description: string
  label: string
  src?: StaticImageData
  sizes?: string
  ratio?: string
  className?: string
}) {
  const art = src ? (
    <Image src={src} alt={description} fill sizes={sizes} placeholder="blur" className="object-cover" />
  ) : (
    <div className="tone grid h-full min-h-36 place-items-center bg-paper-2 p-5">
      <div aria-hidden className="grid max-w-[34ch] justify-items-center gap-2 rounded-xl bg-paper/90 p-3 text-center">
        <ImageIcon className="size-5 text-muted" />
        <span className="slate">{label}</span>
        <p className="text-sm leading-snug text-muted">{description}</p>
      </div>
    </div>
  )
  return (
    <div
      role={src ? undefined : 'img'}
      aria-label={src ? undefined : description}
      style={{ aspectRatio: src ? `${src.width}/${src.height}` : ratio }}
      className={`relative max-w-full overflow-hidden bg-paper-2 ${className}`}
    >
      {art}
    </div>
  )
}
