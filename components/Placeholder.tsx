import Image, { type StaticImageData } from 'next/image'
import { ImageIcon } from 'lucide-react'
import { Parallax } from './motion/Scroll'

// A picture in a frame. With `src` it's the real photo or screenshot; without, a stand-in that says what should go
// here and exposes that as the image's description. `drift` makes it a parallax image: the picture moves slower than
// its frame as you scroll.
export function Placeholder({
  description,
  label,
  src,
  position = 'object-center',
  sizes = '(min-width: 1024px) 40rem, 100vw',
  ratio = '16/9',
  drift = false,
  className = '',
}: {
  description: string
  label: string
  src?: StaticImageData
  position?: string
  sizes?: string
  ratio?: string
  drift?: boolean
  className?: string
}) {
  const art = src ? (
    <div className={`relative h-full ${drift ? 'scale-[1.18]' : ''}`}>
      <Image src={src} alt={description} fill sizes={sizes} placeholder="blur" className={`object-cover ${position}`} />
    </div>
  ) : (
    <div className={`tone grid h-full min-h-36 place-items-center bg-paper-2 p-5 ${drift ? 'scale-[1.18]' : ''}`}>
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
      style={{ aspectRatio: ratio }}
      className={`relative max-w-full overflow-hidden bg-paper-2 ${className}`}
    >
      {drift ? (
        <Parallax speed={0.09} className="absolute inset-0" innerClassName="h-full">
          {art}
        </Parallax>
      ) : (
        art
      )}
    </div>
  )
}
