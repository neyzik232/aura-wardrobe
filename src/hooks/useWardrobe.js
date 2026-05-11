import { useState, useCallback } from 'react'

const LS_WARDROBE = 'aura_wardrobe'
const LS_OUTFITS  = 'aura_outfits'

function load(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') || [] }
  catch { return [] }
}

/**
 * Central state hook — wardrobe items + saved outfits.
 * All reads/writes go through here so localStorage stays in sync.
 */
export function useWardrobe() {
  const [wardrobe, setWardrobe] = useState(() => load(LS_WARDROBE))
  const [outfits,  setOutfits]  = useState(() => load(LS_OUTFITS))

  // ── Wardrobe ──────────────────────────────────────────────────────────────
  const addItem = useCallback((item) => {
    setWardrobe(prev => {
      const next = [...prev, { ...item, id: Date.now().toString(), createdAt: new Date().toISOString() }]
      localStorage.setItem(LS_WARDROBE, JSON.stringify(next))
      return next
    })
  }, [])

  const deleteItem = useCallback((id) => {
    setWardrobe(prev => {
      const next = prev.filter(i => i.id !== id)
      localStorage.setItem(LS_WARDROBE, JSON.stringify(next))
      return next
    })
  }, [])

  const updateItem = useCallback((id, patch) => {
    setWardrobe(prev => {
      const next = prev.map(i => i.id === id ? { ...i, ...patch } : i)
      localStorage.setItem(LS_WARDROBE, JSON.stringify(next))
      return next
    })
  }, [])

  // ── Outfits ───────────────────────────────────────────────────────────────
  const saveOutfit = useCallback((outfit) => {
    setOutfits(prev => {
      const next = [...prev, { ...outfit, id: Date.now().toString(), createdAt: new Date().toISOString() }]
      localStorage.setItem(LS_OUTFITS, JSON.stringify(next))
      return next
    })
  }, [])

  const toggleFavorite = useCallback((id) => {
    setOutfits(prev => {
      const next = prev.map(o => o.id === id ? { ...o, favorited: !o.favorited } : o)
      localStorage.setItem(LS_OUTFITS, JSON.stringify(next))
      return next
    })
  }, [])

  const deleteOutfit = useCallback((id) => {
    setOutfits(prev => {
      const next = prev.filter(o => o.id !== id)
      localStorage.setItem(LS_OUTFITS, JSON.stringify(next))
      return next
    })
  }, [])

  return { wardrobe, outfits, addItem, deleteItem, updateItem, saveOutfit, toggleFavorite, deleteOutfit }
}
