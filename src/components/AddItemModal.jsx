import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SWATCH_COLORS, CATEGORIES } from '../data/constants'

/**
 * Modal for adding a new clothing item to the wardrobe.
 * Handles image upload → base64, category, color swatch selection.
 */
export default function AddItemModal({ open, onClose, onSave }) {
  const [name, setName]       = useState('')
  const [category, setCategory] = useState('tops')
  const [color, setColor]     = useState('#f5f4f2')
  const [imgData, setImgData] = useState(null)

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setImgData(ev.target.result)
    reader.readAsDataURL(file)
  }

  function handleSave() {
    if (!name.trim()) { alert('Please name this piece.'); return }
    onSave({ name: name.trim(), category, color, img: imgData })
    // Reset state
    setName(''); setCategory('tops'); setColor('#f5f4f2'); setImgData(null)
    onClose()
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    border: '1.5px solid var(--gray-200)', borderRadius: 10,
    fontSize: 14, fontFamily: '"DM Sans", sans-serif',
    outline: 'none', background: 'var(--white)', color: 'var(--black)',
    transition: 'border-color 0.2s',
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
          }}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--white)', borderRadius: 24, padding: 48,
              width: '100%', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto',
            }}
          >
            <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 42, fontWeight: 300, marginBottom: 32 }}>
              Add Piece
            </h2>

            {/* Image upload */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 10 }}>Photo</label>
              {imgData ? (
                <div style={{ position: 'relative' }}>
                  <img src={imgData} alt="preview" style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 10, display: 'block' }} />
                  <button onClick={() => setImgData(null)} style={{ position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: '50%', background: 'var(--black)', color: 'var(--white)', border: 'none', cursor: 'pointer', fontSize: 16 }}>×</button>
                </div>
              ) : (
                <label htmlFor="img-input" style={{ display: 'block', border: '2px dashed var(--gray-300)', borderRadius: 12, padding: 40, textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📸</div>
                  <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Tap to upload image</p>
                  <input id="img-input" type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                </label>
              )}
            </div>

            {/* Name */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 10 }}>Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. White linen shirt" style={inputStyle} onKeyDown={e => e.key === 'Enter' && handleSave()} />
            </div>

            {/* Category */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 10 }}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Color swatches */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 10 }}>Color</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {SWATCH_COLORS.map(s => (
                  <div
                    key={s.hex} title={s.name}
                    onClick={() => setColor(s.hex)}
                    style={{
                      width: 36, height: 36, borderRadius: '50%', background: s.hex,
                      cursor: 'pointer', border: `3px solid ${color === s.hex ? 'var(--black)' : 'transparent'}`,
                      outline: s.hex === '#f5f4f2' ? '1px solid var(--gray-300)' : 'none',
                      transform: color === s.hex ? 'scale(1.15)' : 'scale(1)',
                      transition: 'transform 0.2s, border-color 0.2s',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={onClose} style={{ padding: '16px 24px', borderRadius: 100, border: '1.5px solid var(--gray-200)', background: 'transparent', cursor: 'pointer', fontSize: 13, letterSpacing: 1, color: 'var(--black)', fontFamily: '"DM Sans", sans-serif' }}>
                Cancel
              </button>
              <button onClick={handleSave} style={{ flex: 1, background: 'var(--black)', color: 'var(--white)', padding: 16, borderRadius: 100, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', border: 'none', fontFamily: '"DM Sans", sans-serif', transition: 'transform 0.2s' }}>
                Add to Wardrobe
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
