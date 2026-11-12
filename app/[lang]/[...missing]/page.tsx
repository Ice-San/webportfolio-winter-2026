import { notFound } from 'next/navigation'

export const instant = false

// Any unknown path under a locale renders the localized not-found page.
export default function Missing() {
  notFound()
}
