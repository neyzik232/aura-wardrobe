import { useState } from 'react'
import { motion } from 'framer-motion'
import { signIn, signUp, resetPassword, signInWithGoogle } from '../lib/auth'

export default function Auth({ onLogin, onClose }) {
  const [mode, setMode]         = useState('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]     = useState(false)
  const [gLoading, setGLoading]   = useState(false)
  const [error, setError]         = useState('')
  const [resetSent, setResetSent]   = useState(false)
  const [verifySent, setVerifySent] = useState(false)

  async function handleSubmit() {
    if (mode === 'forgot') {
      if (!email) { setError('Please enter your email'); return }
      setLoading(true); setError('')
      const { error } = await resetPassword(email)
      setLoading(false)
      if (error) { setError(error.message); return }
      setResetSent(true)
      return
    }
    if (!email || !password) { setError('Please fill all fields'); return }
    setLoading(true); setError('')
    const { data, error } = mode === 'login'
      ? await signIn(email, password)
      : await signUp(email, password)
    setLoading(false)
    if (error) { setError(error.message); return }
    if (mode === 'register' && !data.session) {
      setVerifySent(true)
      return
    }
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
        {mode !== 'forgot' && (
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
        )}

        {/* Google button — тільки на login/register */}
        {mode !== 'forgot' && !verifySent && !resetSent && (
          <>
            <button
              onClick={async () => { setGLoading(true); await signInWithGoogle(); setGLoading(false) }}
              disabled={gLoading}
              style={{
                width: '100%', padding: '14px', border: '1.5px solid var(--gray-200)',
                borderRadius: 100, fontSize: 13, cursor: 'pointer', background: 'var(--white)',
                color: 'var(--black)', fontFamily: '"DM Sans", sans-serif',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                marginBottom: 20, transition: 'border-color 0.2s',
                opacity: gLoading ? 0.7 : 1,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.09-6.09C34.46 3.09 29.5 1 24 1 14.82 1 7.01 6.48 3.42 14.19l7.1 5.52C12.3 13.38 17.68 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.67c-.55 2.97-2.2 5.49-4.67 7.19l7.19 5.59C43.36 37.57 46.5 31.45 46.5 24.5z"/>
                <path fill="#FBBC05" d="M10.52 28.29A14.6 14.6 0 0 1 9.5 24c0-1.49.26-2.94.72-4.29l-7.1-5.52A23.94 23.94 0 0 0 0 24c0 3.87.92 7.53 2.54 10.77l7.98-6.48z"/>
                <path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.49-4.93l-7.19-5.59c-1.83 1.23-4.17 1.95-6.3 1.95-6.32 0-11.68-3.88-13.48-9.21l-7.98 6.48C7.01 41.52 14.82 47 24 47z"/>
              </svg>
              {gLoading ? 'Redirecting...' : 'Continue with Google'}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--gray-200)' }} />
              <span style={{ fontSize: 12, color: 'var(--gray-500)', letterSpacing: 1 }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'var(--gray-200)' }} />
            </div>
          </>
        )}

        {mode === 'forgot' && !resetSent && (
          <>
            <h2 style={{ fontFamily: '"DM Sans", sans-serif', fontSize: 18, fontWeight: 600, marginBottom: 8, color: 'var(--black)' }}>Reset Password</h2>
            <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 24 }}>Enter your email and we'll send you a reset link.</p>
          </>
        )}

        {verifySent ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📬</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--black)', marginBottom: 8 }}>Verify your email</p>
            <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 24 }}>We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
            <button onClick={() => { setMode('login'); setVerifySent(false); setEmail(''); setPassword('') }} style={{
              background: 'none', border: 'none', color: 'var(--black)', fontSize: 13,
              cursor: 'pointer', textDecoration: 'underline', fontFamily: '"DM Sans", sans-serif',
            }}>Back to Sign In</button>
          </div>
        ) : resetSent ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✉️</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--black)', marginBottom: 8 }}>Check your email</p>
            <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 24 }}>We sent a reset link to <strong>{email}</strong></p>
            <button onClick={() => { setMode('login'); setResetSent(false); setEmail('') }} style={{
              background: 'none', border: 'none', color: 'var(--black)', fontSize: 13,
              cursor: 'pointer', textDecoration: 'underline', fontFamily: '"DM Sans", sans-serif',
            }}>Back to Sign In</button>
          </div>
        ) : (
          <>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={inputStyle} />
            {mode !== 'forgot' && (
              <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (min. 6 chars)" type="password" style={inputStyle} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            )}

            {mode === 'login' && (
              <div style={{ textAlign: 'right', marginTop: -8, marginBottom: 16 }}>
                <button onClick={() => { setMode('forgot'); setError('') }} style={{
                  background: 'none', border: 'none', fontSize: 12, color: 'var(--gray-500)',
                  cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', textDecoration: 'underline',
                }}>Forgot password?</button>
              </div>
            )}

            {error && <p style={{ color: '#e53e3e', fontSize: 13, marginBottom: 16, textAlign: 'left' }}>{error}</p>}

            <button onClick={handleSubmit} disabled={loading} style={{
              width: '100%', padding: '16px', background: 'var(--black)', color: 'var(--white)',
              border: 'none', borderRadius: 100, fontSize: 13, letterSpacing: 2,
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
              opacity: loading ? 0.7 : 1,
            }}>
              {loading ? '...' : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
            </button>

            {mode === 'forgot' && (
              <button onClick={() => { setMode('login'); setError('') }} style={{
                marginTop: 16, background: 'none', border: 'none', fontSize: 12,
                color: 'var(--gray-500)', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
                textDecoration: 'underline', width: '100%',
              }}>Back to Sign In</button>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}