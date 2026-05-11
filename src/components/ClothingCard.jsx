import { useState } from 'react'
import { motion } from 'framer-motion'
import { CATEGORY_EMOJI } from '../data/constants'

/**
 * Single clothing item card for the wardrobe grid.
 * Shows image or emoji placeholder, hover actions (delete).
 * Draggable for the outfit builder.
 */
export default function ClothingCard({ item, onDelete, draggable = true }) {
  const [hovered, setHovered] = useState(false)

  function handleDragStart(e) {
    e.dataTransfer.setData('itemId', item.id)
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      draggable={draggable}
      onDragStart={handleDragStart}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16, overflow: 'hidden', background: 'var(--gray-100)',
        cursor: draggable ? 'grab' : 'default', position: 'relative',
        transition: 'box-shadow 0.3s',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.1)' : '0 0 0 rgba(0,0,0,0)',
      }}
    >
      {/* Image / placeholder */}
      {item.img ? (
        <img src={item.img} alt={item.name} style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{ width: '100%', height: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-200)', fontSize: 48 }}>
          {CATEGORY_EMOJI[item.category] || '👗'}
        </div>
      )}

      {/* Info row */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
        <div style={{ fontSize: 12, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          {item.category}
          {item.color && <span style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, display: 'inline-block', border: '1px solid rgba(0,0,0,0.1)' }} />}
        </div>
      </div>

      {/* Hover actions */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: hovered ? 1 : 0 }}
        style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}
      >
        {onDelete && (
          <button
            onClick={e => { e.stopPropagation(); onDelete(item.id) }}
            style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--white)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'background 0.2s' }}
            title="Remove"
          >
            🗑
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
