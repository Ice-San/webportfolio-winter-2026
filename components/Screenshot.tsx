import Image, { type StaticImageData } from 'next/image'
import { Parallax } from './motion/Scroll'

// An app screenshot at its own shape, never cropped: the whole frame drifts a little instead of zooming the picture.
export function Screenshot({ src, alt, sizes, priority = false }: { src: StaticImageData; alt: string; sizes: string; priority?: boolean }) {
  return (
    <Parallax speed={0.05}>
      <Image src={src} alt={alt} sizes={sizes} priority={priority} placeholder="blur" className="h-auto w-full rounded-2xl border border-line" />
    </Parallax>
  )
}
