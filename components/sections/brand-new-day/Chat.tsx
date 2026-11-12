import type { Dictionary } from '@/app/[lang]/dictionaries'
import { Panel } from '../../comic/Panel'
import { ByteSvg } from '../../eggs/drone/ByteSvg'

// Byte's face: the same drone as everywhere else, small and still.
function AiAvatar() {
  return (
    <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-paper">
      <span className="block w-8">
        <ByteSvg still tingle={false} />
      </span>
    </span>
  )
}

function AiLine({ name, text }: { name: string; text: string }) {
  return (
    <li>
      <Panel bare from={{ x: -40, y: 30 }}>
        <div className="flex items-end gap-3">
          <AiAvatar />
          <p className="chat">
            <span className="sr-only">{name}: </span>
            {text}
          </p>
        </div>
      </Panel>
    </li>
  )
}

// Ruben and his AI talking; the AI ends by handing over his contact details.
export function Chat({ t }: { t: Dictionary['ch04'] }) {
  return (
    <ol className="grid gap-5" aria-label={`${t.aiName} · ${t.meName}`}>
      <AiLine name={t.aiName} text={t.ai1} />
      <li>
        <Panel bare from={{ x: 40, y: 30 }}>
          <p className="chat chat-me ml-auto w-fit max-w-[36ch]">
            <span className="sr-only">{t.meName}: </span>
            {t.me1}
          </p>
        </Panel>
      </li>
      <AiLine name={t.aiName} text={t.ai2} />
    </ol>
  )
}
