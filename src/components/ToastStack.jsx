import { AnimatePresence, motion } from 'framer-motion'

/**
 * Renders a stack of animated toast messages.
 * Position: fixed bottom-right.
 */
export default function ToastStack({ toasts }) {
  return (
    <div style={{ position: 'fixed', bottom: 40, right: 40, zIndex: 2000, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'var(--black)', color: 'var(--white)',
              padding: '14px 24px', borderRadius: 100,
              fontSize: 13, letterSpacing: 1,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
            }}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
