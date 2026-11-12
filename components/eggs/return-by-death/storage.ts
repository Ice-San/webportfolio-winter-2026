export const SAVE_KEY = 'rc-save'
const ATTEMPT_KEY = 'rc-attempt'

// Storage can be blocked (private mode, sandboxed previews): the game still works, it just forgets.
export const read = (k: string) => {
  try {
    return sessionStorage.getItem(k)
  } catch {
    return null
  }
}
export const write = (k: string, v: string) => {
  try {
    sessionStorage.setItem(k, v)
  } catch {}
}

// The attempt count lives in sessionStorage (survives reloads in this visit), with a memory fallback when it's blocked.
let memAttempt = 1
const listeners = new Set<() => void>()
export const attempts = {
  subscribe: (cb: () => void) => {
    listeners.add(cb)
    return () => listeners.delete(cb)
  },
  get: () => Number(read(ATTEMPT_KEY)) || memAttempt,
  bump: () => {
    memAttempt = attempts.get() + 1
    write(ATTEMPT_KEY, String(memAttempt))
    listeners.forEach((l) => l())
  },
}
