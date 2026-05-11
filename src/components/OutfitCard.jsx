import { motion } from 'framer-motion'
import { CATEGORY_EMOJI } from '../data/constants'

/**
 * Compact card showing a saved outfit's thumbnail strip, name, and piece count.
 * Favorite button lives top-right.
 */
export default function OutfitCard({ outfit, wardrobe, onLoad, onToggleFav, onDelete }) {
  const items = outfit.items.map(id => wardrobe.find(i => i.id === id)).filter(Boolean)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      onClick={() => onLoad && onLoad(outfit)}
      style={{ background: 'var(--gray-100)', borderRadius: 16, padding: 24, cursor: onLoad ? 'pointer' : 'default', position: 'relative' }}
    >
      {/* Thumbnail strip */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {items.slice(0, 4).map(item => (
          <div key={item.id} style={{ width: 60, height: 70, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'var(--gray-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            {item.img ? <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : CATEGORY_EMOJI[item.category] || '👗'}
          </div>
        ))}
        {items.length > 4 && (
          <div style={{ width: 60, height: 70, borderRadius: 8, background: 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--gray-500)' }}>
            +{items.length - 4}
          </div>
        )}
      </div>

      {/* Name + count */}
      <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 24, fontWeight: 300, marginBottom: 4 }}>{outfit.name}</div>
      <div style={{ fontSize: 12, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: 1 }}>
        {items.length} piece{items.length !== 1 ? 's' : ''}
      </div>

      {/* Favorite */}
      {onToggleFav && (
        <button
          onClick={e => { e.stopPropagation(); onToggleFav(outfit.id) }}
          style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, transition: 'transform 0.2s' }}
          title={outfit.favorited ? 'Unfavourite' : 'Favourite'}
        >
          {outfit.favorited ? '♥' : '♡'}
        </button>
      )}
      {onDelete && (
        <button
          onClick={e => { e.stopPropagation(); onDelete(outfit.id) }}
          style={{ position: 'absolute', bottom: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--gray-500)' }}
          title="Delete"
        >
          🗑
        </button>
      )}
    </motion.div>
  )
}
