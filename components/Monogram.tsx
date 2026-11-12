// The site mark: "RC" on an ink disc with a red dot, the same mark as the favicon (app/favicon.ico, app/icon.png).
// The face photo lives only in the hero, so it isn't repeated in the nav and the browser tab.
export function Monogram({ className = 'size-9 text-[0.8125rem]' }: { className?: string }) {
  return (
    <span aria-hidden className={`relative grid shrink-0 place-items-center rounded-full bg-ink font-semibold tracking-[-0.06em] text-paper ${className}`}>
      RC
      <span className="absolute bottom-[18%] right-[18%] size-[12%] rounded-full bg-red" />
    </span>
  )
}
