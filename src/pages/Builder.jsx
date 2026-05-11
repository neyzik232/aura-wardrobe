import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES, CATEGORY_EMOJI } from '../data/constants'
import OutfitCard from '../components/OutfitCard'

/**
 * Outfit Builder — drag clothing from sidebar onto the canvas,
 * name the outfit, and save it.
 */
export default function Builder({ wardrobe, outfits, onSaveOutfit, onToggleFav, onDeleteOutfit, toast }) {
  const [sidebarCat, setSidebarCat] = useState('all')
  const [canvas, setCanvas]         = useState([])
  const [outfitName, setOutfitName] = useState('')
  const [dragOver, setDragOver]     = useState(false)

  const sidebarItems = wardrobe.filter(i => sidebarCat === 'all' || i.category === sidebarCat)

  // ── Drag from sidebar ───────────────────────────────────────────────────
  function handleDragStart(e, id) {
    e.dataTransfer.setData('itemId', id)
    e.dataTransfer.effectAllowed = 'copy'
  }
  function handleDrop(e) {
    e.preventDefault(); setDragOver(false)
    const id = e.dataTransfer.getData('itemId')
    if (!id || canvas.find(i => i.id === id)) { toast('Already in outfit'); return }
    const item = wardrobe.find(i => i.id === id)
    if (item) setCanvas(prev => [...prev, item])
  }

  function removeFromCanvas(id) { setCanvas(prev => prev.filter(i => i.id !== id)) }

  function saveOutfit() {
    if (!canvas.length) { toast('Add some pieces first'); return }
    const name = outfitName.trim() || 'Outfit ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    onSaveOutfit({ name, items: canvas.map(i => i.id), favorited: false })
    toast('Outfit saved ✦')
    setCanvas([]); setOutfitName('')
  }

  function genRandom() {
    if (wardrobe.length < 2) { toast('Add more items first'); return }
    const cats = ['tops', 'pants', 'shoes']
    const picked = []
    cats.forEach(cat => {
      const pool = wardrobe.filter(i => i.category === cat)
      if (pool.length) picked.push(pool[Math.floor(Math.random() * pool.length)])
    })
    setCanvas(picked.length ? picked : [wardrobe[Math.floor(Math.random() * wardrobe.length)]])
    setOutfitName('Random Fit')
    toast('Random outfit generated ✦')
  }

  function loadOutfit(outfit) {
    setCanvas(outfit.items.map(id => wardrobe.find(i => i.id === id)).filter(Boolean))
    setOutfitName(outfit.name)
    window.scrollTo(0, 0)
    toast('Outfit loaded')
  }

  const chip = (active, onClick, label) => (
    <button onClick={onClick} style={{
      padding: '9px 16px', borderRadius: 100, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase',
      cursor: 'pointer', textAlign: 'left', fontFamily: '"DM Sans", sans-serif',
      background: active ? 'var(--black)' : 'transparent',
      color: active ? 'var(--white)' : 'var(--black)',
      border: '1.5px solid ' + (active ? 'var(--black)' : 'var(--gray-200)'), transition: 'all 0.2s',
    }}>{label}</button>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: 'calc(100vh - 80px)' }}>
      {/* Sidebar */}
      <div style={{ borderRight: '1px solid var(--gray-200)', padding: '32px 20px', overflowY: 'auto', height: 'calc(100vh - 80px)', position: 'sticky', top: 80 }}>
        <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 16 }}>Your Pieces</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
          {sidebarItems.length === 0 ? (
            <p style={{ color: 'var(--gray-500)', fontSize: 13, gridColumn: '1/-1' }}>No items.</p>
          ) : sidebarItems.map(item => (
            <div
              key={item.id} draggable
              onDragStart={e => handleDragStart(e, item.id)}
              style={{ borderRadius: 10, overflow: 'hidden', cursor: 'grab', border: '1.5px solid var(--gray-200)', transition: 'border-color 0.2s, transform 0.2s' }}
            >
              {item.img
                ? <img src={item.img} alt={item.name} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }} />
                : <div style={{ width: '100%', height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-200)', fontSize: 26 }}>{CATEGORY_EMOJI[item.category] || '👗'}</div>
              }
              <div style={{ fontSize: 11, padding: '8px 10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--gray-700)' }}>{item.name}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 12 }}>Filter</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {CATEGORIES.map(c => chip(sidebarCat === c.id, () => setSidebarCat(c.id), c.label))}
        </div>
      </div>

      {/* Canvas */}
      <div style={{ padding: '40px 60px' }}>
        <input
          value={outfitName} onChange={e => setOutfitName(e.target.value)}
          placeholder="Name this outfit..."
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 36, fontWeight: 300, border: 'none', outline: 'none', background: 'transparent', color: 'var(--black)', width: '100%', marginBottom: 28, borderBottom: '2px solid transparent', transition: 'border-color 0.2s' }}
          onFocus={e => e.target.style.borderBottomColor = 'var(--gray-300)'}
          onBlur={e => e.target.style.borderBottomColor = 'transparent'}
        />

        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            minHeight: 380, borderRadius: 16, border: `2px dashed ${dragOver ? 'var(--black)' : 'var(--gray-200)'}`,
            padding: 32, display: 'flex', flexWrap: 'wrap', gap: 20, alignContent: 'flex-start',
            background: dragOver ? 'var(--gray-100)' : 'transparent', transition: 'all 0.25s',
          }}
        >
          {canvas.length === 0 ? (
            <div style={{ width: '100%', textAlign: 'center', padding: '60px 0', color: 'var(--gray-500)', pointerEvents: 'none' }}>
              <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 28, fontWeight: 300, marginBottom: 8 }}>Drag pieces here</p>
              <span style={{ fontSize: 13 }}>Build your perfect outfit</span>
            </div>
          ) : (
            <AnimatePresence>
              {canvas.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  style={{ borderRadius: 10, overflow: 'hidden', width: 160, border: '1.5px solid var(--gray-200)', position: 'relative' }}
                >
                  {item.img
                    ? <img src={item.img} alt={item.name} style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
                    : <div style={{ width: '100%', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-200)', fontSize: 36 }}>{CATEGORY_EMOJI[item.category] || '👗'}</div>
                  }
                  <div style={{ padding: '10px 12px', fontSize: 12, color: 'var(--gray-700)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  <button
                    onClick={() => removeFromCanvas(item.id)}
                    style={{ position: 'absolute', top: 8, right: 8, width: 26, height: 26, borderRadius: '50%', background: 'var(--black)', color: 'var(--white)', border: 'none', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >×</button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          {[
            { label: 'Save Outfit', onClick: saveOutfit, primary: true },
            { label: 'Clear', onClick: () => { setCanvas([]); setOutfitName('') }, primary: false },
            { label: '⟳ Random', onClick: genRandom, primary: false },
          ].map(btn => (
            <button key={btn.label} onClick={btn.onClick} style={{
              padding: '12px 28px', borderRadius: 100, fontSize: 13, letterSpacing: btn.primary ? 2 : 0,
              textTransform: btn.primary ? 'uppercase' : 'none', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
              background: btn.primary ? 'var(--black)' : 'transparent',
              color: btn.primary ? 'var(--white)' : 'var(--black)',
              border: btn.primary ? 'none' : '1.5px solid var(--gray-200)',
              transition: 'all 0.2s',
            }}>{btn.label}</button>
          ))}
        </div>

        {/* Saved outfits */}
        <div style={{ marginTop: 60 }}>
          <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 36, fontWeight: 300, marginBottom: 24 }}>Saved Outfits</h3>
          {outfits.length === 0 ? (
            <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Build your first look above.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              <AnimatePresence>
                {outfits.map(o => (
                  <OutfitCard key={o.id} outfit={o} wardrobe={wardrobe} onLoad={loadOutfit} onToggleFav={onToggleFav} onDelete={id => { onDeleteOutfit(id); toast('Outfit deleted') }} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
