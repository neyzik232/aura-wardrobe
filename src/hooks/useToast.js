import { useState, useCallback } from 'react'

/**
 * Lightweight toast notification hook.
 * Returns { toasts, toast } — call toast('msg') to push a notification.
 */
export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 2600)
  }, [])

  return { toasts, toast }
}
