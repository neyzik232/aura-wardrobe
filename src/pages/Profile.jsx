import { motion } from 'framer-motion'
import { STYLE_TAGS, CATEGORY_EMOJI } from '../data/constants'
import OutfitCard from '../components/OutfitCard'
import ClothingCard from '../components/ClothingCard'

/**
 * Profile page — wardrobe stats, favourite outfits, all items.
 */
export default function Profile({ wardrobe, outfits, onToggleFav }) {
  const favOutfits = outfits.filter(o => o.favorited)
  const categories = [...new Set(wardrobe.map(i => i.category))]

  const stats = [
    { num: wardrobe.length, label: 'Total Items' },
    { num: outfits.length,  label: 'Outfits Saved' },
    { num: favOutfits.length, label: 'Favourited' },
    { num: categories.length, label: 'Categories' },
  ]

  return (
    <div style={{ padding: '40px 60px 80px' }}>
      {/* Profile header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 40, marginBottom: 60, paddingBottom: 60, borderBottom: '1px solid var(--gray-200)', flexWrap: 'wrap' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 48, fontWeight: 300, color: 'var(--white)', flexShrink: 0 }}
        >
          A
        </motion.div>
        <div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 56, fontWeight: 300, letterSpacing: -1, lineHeight: 1 }}>My Aura</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: 14, marginTop: 8 }}>Personal style dashboard</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 60 }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ background: 'var(--gray-100)', borderRadius: 16, padding: 32 }}
          >
            <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 52, fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gray-500)', marginTop: 8 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Style aesthetic */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 36, fontWeight: 300, marginBottom: 24 }}>Style Aesthetic</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {STYLE_TAGS.map(tag => (
            <span key={tag} style={{ padding: '10px 20px', borderRadius: 100, border: '1.5px solid var(--gray-200)', fontSize: 13, color: 'var(--gray-700)', cursor: 'default', transition: 'border-color 0.2s' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Favourite outfits */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 36, fontWeight: 300, marginBottom: 24 }}>Favourite Outfits</h2>
        {favOutfits.length === 0 ? (
          <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Favourite an outfit to see it here.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {favOutfits.map(o => <OutfitCard key={o.id} outfit={o} wardrobe={wardrobe} onToggleFav={onToggleFav} />)}
          </div>
        )}
      </div>

      {/* All items */}
      <div>
        <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 36, fontWeight: 300, marginBottom: 24 }}>All Items</h2>
        {wardrobe.length === 0 ? (
          <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Your wardrobe is empty.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {wardrobe.map(item => <ClothingCard key={item.id} item={item} draggable={false} />)}
          </div>
        )}
      </div>
    </div>
  )
}
