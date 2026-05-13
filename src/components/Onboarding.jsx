import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STYLE_TAGS } from '../data/constants'

const STEPS = ['welcome', 'style', 'ready']

export default function Onboarding({ onComplete }) {
  const [step, setStep]       = useState(0)
  const [selected, setSelected] = useState([])

  function toggleTag(tag) {
    setSelected(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  function finish() {
    if (selected.length) localStorage.setItem('aura_style_tags', JSON.stringify(selected))
    localStorage.setItem('aura_onboarded', 'true')
    onComplete()
  }

  const slide = { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -40 }, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        style={{ background: 'var(--white)', borderRadius: 28, padding: 48, width: '100%', maxWidth: 480, textAlign: 'center', overflow: 'hidden', position: 'relative' }}
      >
        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 40 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ width: i === step ? 24 : 6, height: 6, borderRadius: 3, background: i === step ? 'var(--black)' : 'var(--gray-200)', transition: 'all 0.3s' }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="welcome" {...slide}>
              <p style={{ fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 16 }}>Welcome to</p>
              <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 80, fontWeight: 300, letterSpacing: 8, marginBottom: 12, lineHeight: 1 }}>AURA</h1>
              <p style={{ color: 'var(--gray-500)', fontSize: 14, lineHeight: 1.6, marginBottom: 40 }}>
                Your personal style OS. Build your digital wardrobe, plan outfits, and discover your aesthetic.
              </p>
              <button onClick={() => setStep(1)} style={btnStyle}>
                Get Started
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="style" {...slide}>
              <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 42, fontWeight: 300, marginBottom: 8 }}>Your Style</h2>
              <p style={{ color: 'var(--gray-500)', fontSize: 13, marginBottom: 28 }}>Pick aesthetics that speak to you.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 36 }}>
                {STYLE_TAGS.map(tag => (
                  <button key={tag} onClick={() => toggleTag(tag)} style={{
                    padding: '10px 20px', borderRadius: 100, fontSize: 12, letterSpacing: 1,
                    cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
                    border: '1.5px solid ' + (selected.includes(tag) ? 'var(--black)' : 'var(--gray-200)'),
                    background: selected.includes(tag) ? 'var(--black)' : 'transparent',
                    color: selected.includes(tag) ? 'var(--white)' : 'var(--black)',
                    transition: 'all 0.18s',
                  }}>{tag}</button>
                ))}
              </div>
              <button onClick={() => setStep(2)} style={btnStyle} disabled={selected.length === 0}>
                {selected.length === 0 ? 'Select at least one' : 'Continue'}
              </button>
              <button onClick={() => setStep(2)} style={skipStyle}>Skip</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="ready" {...slide}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>✦</div>
              <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 48, fontWeight: 300, marginBottom: 12 }}>You're all set</h2>
              <p style={{ color: 'var(--gray-500)', fontSize: 14, lineHeight: 1.6, marginBottom: 40 }}>
                Start by adding your first piece to your wardrobe.
              </p>
              <button onClick={finish} style={btnStyle}>Open My Wardrobe</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

const btnStyle = {
  width: '100%', padding: '16px', background: 'var(--black)', color: 'var(--white)',
  border: 'none', borderRadius: 100, fontSize: 13, letterSpacing: 2,
  textTransform: 'uppercase', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
}

const skipStyle = {
  marginTop: 14, background: 'none', border: 'none', fontSize: 12,
  color: 'var(--gray-500)', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
  textDecoration: 'underline',
}
