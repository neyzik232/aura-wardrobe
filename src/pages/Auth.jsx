import { useState } from 'react'
import { motion } from 'framer-motion'
import { signIn, signUp } from '../lib/auth'

export default function Auth({ onLogin, onClose }) {
  const [mode, setMode]         = useState('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  async function handleSubmit() {
    if (!email || !password) { setError('Please fill all fields'); return }
    setLoading(true); setError('')
    const { data, error } = mode === 'login'
      ? await signIn(email, password)
      : await signUp(email, password)
    setLoading(false)
    if (error) { setError(error.message); return }
    onLogin(data.user || data.session?.user)
  }

  const inputStyle = {
    width: '100%', padding: '16px', border: '1.5px solid var(--gray-200)',
    borderRadius: 12, fontSize: 15, fontFamily: '"DM Sans", sans-serif',
    outline: 'none', background: 'var(--white)', color: 'var(--black)',
    marginBottom: 16,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      style={{ width: '100%', maxWidth: 420, textAlign: 'center', position: 'relative' }}
    >
      {/* Закрити */}
      {onClose && (
        <button onClick={onClose} style={{ position: 'absolute', top: -40, right: 0, background: 'none', border: 'none', color: 'var(--white)', fontSize: 28, cursor: 'pointer', lineHeight: 1 }}>×</button>
      )}

      <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 72, fontWeight: 300, letterSpacing: 8, marginBottom: 8, color: 'var(--white)' }}>AURA</h1>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 40 }}>Your Style OS</p>

      <div style={{ background: 'var(--white)', borderRadius: 24, padding: 40 }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, background: 'var(--gray-100)', borderRadius: 100, padding: 4 }}>
          {['login', 'register'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError('') }} style={{
              flex: 1, padding: '10px', borderRadius: 100, border: 'none', cursor: 'pointer',
              background: mode === m ? 'var(--black)' : 'transparent',
              color: mode === m ? 'var(--white)' : 'var(--gray-500)',
              fontSize: 13, letterSpacing: 1, textTransform: 'uppercase',
              fontFamily: '"DM Sans", sans-serif', transition: 'all 0.2s',
            }}>
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={inputStyle} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (min. 6 chars)" type="password" style={inputStyle} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />

        {error && <p style={{ color: '#e53e3e', fontSize: 13, marginBottom: 16, textAlign: 'left' }}>{error}</p>}

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', padding: '16px', background: 'var(--black)', color: 'var(--white)',
          border: 'none', borderRadius: 100, fontSize: 13, letterSpacing: 2,
          textTransform: 'uppercase', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
          opacity: loading ? 0.7 : 1,
        }}>
          {loading ? '...' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </div>
    </motion.div>
  )
}