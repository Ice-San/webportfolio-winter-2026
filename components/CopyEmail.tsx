'use client'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

// Copies the address; if the clipboard is refused, selects the visible text so Ctrl+C works.
export function CopyEmail({ email, labels, targetId }: { email: string; labels: { copy: string; copied: string }; targetId: string }) {
  const [copied, setCopied] = useState(false)
  const onClick = () => {
    navigator.clipboard.writeText(email).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      () => {
        const el = document.getElementById(targetId)
        if (el) window.getSelection()?.selectAllChildren(el)
      },
    )
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-solid"
    >
      {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
      <span aria-live="polite">{copied ? labels.copied : labels.copy}</span>
    </button>
  )
}
