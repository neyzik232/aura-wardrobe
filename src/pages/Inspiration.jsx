import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOODS, STYLE_BOARD, CATEGORY_EMOJI } from '../data/constants'

export default function Inspiration({ wardrobe, onNavigate, toast }) {
  const [mood, setMood]             = useState('all')
  const [generated, setGenerated]   = useState(null)
  const [activeCard, setActiveCard] = useState(null)

  function generateFit(overrideMood) {
    const moodId = overrideMood || (mood === 'all'
      ? MOODS.filter(m => m.id !== 'all')[Math.floor(Math.random() * (MOODS.length - 1))].id
      : mood)
    const moodData = MOODS.find(m => m.id === moodId) || MOODS[0]
    const items = wardrobe.length
      ? [...wardrobe].sort(() => Math.random() - 0.5).slice(0, Math.min(4, wardrobe.length))
      : []
    setGenerated({ moodData, items })
    toast('Outfit generated ✦')
    setTimeout(() => document.getElementById('generated-result')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
  }

  function handleCardClick(card) {
    setActiveCard(card.name)
    setMood(card.mood)
    generateFit(card.mood)
    toast(card.name + ' vibe activated ✦')
  }

  function todaysFit() {
    const moodPool = MOODS.filter(m => m.id !== 'all')
    const todayMood = moodPool[new Date().getDay() % moodPool.length]
    setMood(todayMood.id)
    generateFit(todayMood.id)
    toast("Today's fit ready ✦")
  }

  return (
    <div style={{ padding: '40px 60px 80px' }}>
      <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 56, fontWeight: 300, marginBottom: 8 }}>Get Inspired</h1>
      <p style={{ color: 'var(--gray-700)', fontSize: 14 }}>Click any style card to instantly generate an outfit in that vibe.</p>

      <div style={{ margin: '40px 0 28px' }}>
        <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 16 }}>Pick a mood</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {MOODS.map(m => (
            <button key={m.id} onClick={() => setMood(m.id)} style={{
              padding: '12px 28px', borderRadius: 100, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
              background: mood === m.id ? 'var(--black)' : 'transparent',
              color: mood === m.id ? 'var(--white)' : 'var(--black)',
              border: '1.5px solid ' + (mood === m.id ? 'var(--black)' : 'var(--gray-200)'),
              transition: 'all 0.2s',
            }}>{m.label}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 48, flexWrap: 'wrap' }}>
        <button onClick={() => generateFit()} style={{ background: 'var(--black)', color: 'var(--white)', padding: '16px 36px', borderRadius: 100, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', border: 'none', fontFamily: '"DM Sans", sans-serif' }}>
          ✦ Generate Outfit
        </button>
        <button onClick={todaysFit} style={{ background: 'transparent', color: 'var(--black)', padding: '16px 36px', borderRadius: 100, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', border: '1.5px solid var(--gray-200)', fontFamily: '"DM Sans", sans-serif' }}>
          Today's Fit ✦
        </button>
      </div>

      <AnimatePresence>
        {generated && (
          <motion.div id="generated-result"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ background: 'var(--gray-100)', borderRadius: 16, padding: 40, marginBottom: 60 }}
          >
            <span style={{ display: 'inline-block', background: 'var(--black)', color: 'var(--white)', padding: '4px 14px', borderRadius: 100, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
              {generated.moodData.label}
            </span>
            <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 36, fontWeight: 300, marginBottom: 24 }}>
              {generated.moodData.desc}
            </h3>
            {generated.items.length > 0 ? (
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {generated.items.map(item => (
                  <div key={item.id} style={{ background: 'var(--white)', borderRadius: 10, overflow: 'hidden', width: 140 }}>
                    <div style={{ width: '100%', height: 160, background: 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>
                      {item.img ? <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : CATEGORY_EMOJI[item.category] || '👗'}
                    </div>
                    <div style={{ padding: '10px 12px', fontSize: 12, color: 'var(--gray-700)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Add items to your wardrobe first to generate outfits.</p>
            )}
            <button onClick={() => onNavigate('builder')} style={{ marginTop: 24, background: 'var(--black)', color: 'var(--white)', padding: '12px 24px', borderRadius: 100, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', border: 'none', fontFamily: '"DM Sans", sans-serif' }}>
              Try in Builder →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 36, fontWeight: 300, marginBottom: 8 }}>Style Board</h2>
      <p style={{ color: 'var(--gray-500)', fontSize: 13, marginBottom: 24 }}>Натисни на картку — згенерується аутфіт у тому стилі ↓</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {STYLE_BOARD.map((s, i) => (
          <motion.div key={s.name}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => handleCardClick(s)}
            style={{
              borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
              background: activeCard === s.name ? 'var(--black)' : 'var(--gray-100)',
              border: '2px solid ' + (activeCard === s.name ? 'var(--black)' : 'transparent'),
              transition: 'background 0.3s',
            }}
          >
            <div style={{ width: '100%', height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, background: activeCard === s.name ? '#1a1917' : 'var(--gray-200)' }}>
              {s.emoji}
            </div>
            <div style={{ padding: 16 }}>
              <h4 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 22, fontWeight: 300, marginBottom: 4, color: activeCard === s.name ? 'var(--white)' : 'var(--black)' }}>{s.name}</h4>
              <span style={{ fontSize: 12, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: 1 }}>{s.mood}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
