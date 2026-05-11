import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES } from '../data/constants'
import ClothingCard from '../components/ClothingCard'
import AddItemModal from '../components/AddItemModal'

/**
 * Virtual Wardrobe page — grid of uploaded clothing items.
 * Supports search, category filter, and adding/deleting items.
 */
export default function Wardrobe({ wardrobe, onAdd, onDelete, toast }) {
  const [search, setSearch]   = useState('')
  const [category, setCategory] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = wardrobe.filter(i => {
    const catOk = category === 'all' || i.category === category
    const qOk   = !search || i.name.toLowerCase().includes(search.toLowerCase())
    return catOk && qOk
  })

  function handleSave(item) {
    onAdd(item)
    toast('Added to wardrobe ✦')
  }

  return (
    <>
      {/* Header */}
      <div style={{ padding: '40px 60px 0' }}>
        <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 56, fontWeight: 300, letterSpacing: -1 }}>My Wardrobe</h1>
        <p style={{ color: 'var(--gray-700)', fontSize: 14, marginTop: 8 }}>{wardrobe.length} item{wardrobe.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '28px 60px', flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: 200, maxWidth: 360 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search pieces..."
            style={{ width: '100%', padding: '12px 16px 12px 40px', border: '1.5px solid var(--gray-200)', borderRadius: 100, fontSize: 14, fontFamily: '"DM Sans", sans-serif', outline: 'none', background: 'var(--white)', color: 'var(--black)' }}
          />
        </div>

        {/* Category chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button
              key={c.id} onClick={() => setCategory(c.id)}
              style={{
                padding: '9px 18px', borderRadius: 100, fontSize: 12, letterSpacing: 1,
                textTransform: 'uppercase', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif',
                background: category === c.id ? 'var(--black)' : 'var(--white)',
                color: category === c.id ? 'var(--white)' : 'var(--black)',
                border: '1.5px solid ' + (category === c.id ? 'var(--black)' : 'var(--gray-200)'),
                transition: 'all 0.2s',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Add button */}
        <button
          onClick={() => setModalOpen(true)}
          style={{ background: 'var(--black)', color: 'var(--white)', padding: '11px 24px', borderRadius: 100, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', border: 'none', whiteSpace: 'nowrap', fontFamily: '"DM Sans", sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          + Add Item
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20, padding: '0 60px 80px' }}>
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 40px' }}>
              <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 42, fontWeight: 300, marginBottom: 12 }}>Nothing here yet.</h3>
              <p style={{ color: 'var(--gray-500)', fontSize: 14, marginBottom: 32 }}>Start building your wardrobe — add your first piece.</p>
              <button onClick={() => setModalOpen(true)} style={{ background: 'var(--black)', color: 'var(--white)', padding: '16px 36px', borderRadius: 100, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}>
                Add First Item
              </button>
            </motion.div>
          ) : (
            filtered.map(item => (
              <ClothingCard key={item.id} item={item} onDelete={id => { onDelete(id); toast('Item removed') }} />
            ))
          )}
        </AnimatePresence>
      </div>

      <AddItemModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} />
    </>
  )
}
