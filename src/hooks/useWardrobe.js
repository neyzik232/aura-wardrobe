import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useWardrobe(user) {
  const [wardrobe, setWardrobe] = useState([])
  const [outfits, setOutfits]   = useState([])

  // Завантажуємо дані з Supabase коли юзер залогінений
  useEffect(() => {
    if (!user) return
    fetchWardrobe()
    fetchOutfits()
  }, [user])

  async function fetchWardrobe() {
    const { data } = await supabase.from('wardrobe').select('*').order('created_at', { ascending: false })
    if (data) setWardrobe(data)
  }

  async function fetchOutfits() {
    const { data } = await supabase.from('outfits').select('*').order('created_at', { ascending: false })
    if (data) setOutfits(data)
  }

  const addItem = useCallback(async (item) => {
    const { data, error } = await supabase.from('wardrobe').insert([{
      ...item, user_id: user.id
    }]).select()
    if (!error && data) setWardrobe(prev => [data[0], ...prev])
  }, [user])

  const deleteItem = useCallback(async (id) => {
    await supabase.from('wardrobe').delete().eq('id', id)
    setWardrobe(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateItem = useCallback(async (id, patch) => {
    await supabase.from('wardrobe').update(patch).eq('id', id)
    setWardrobe(prev => prev.map(i => i.id === id ? { ...i, ...patch } : i))
  }, [])

  const saveOutfit = useCallback(async (outfit) => {
    const { data, error } = await supabase.from('outfits').insert([{
      ...outfit, user_id: user.id
    }]).select()
    if (!error && data) setOutfits(prev => [data[0], ...prev])
  }, [user])

  const toggleFavorite = useCallback(async (id) => {
    const outfit = outfits.find(o => o.id === id)
    if (!outfit) return
    await supabase.from('outfits').update({ favorited: !outfit.favorited }).eq('id', id)
    setOutfits(prev => prev.map(o => o.id === id ? { ...o, favorited: !o.favorited } : o))
  }, [outfits])

  const deleteOutfit = useCallback(async (id) => {
    await supabase.from('outfits').delete().eq('id', id)
    setOutfits(prev => prev.filter(o => o.id !== id))
  }, [])

  return { wardrobe, outfits, addItem, deleteItem, updateItem, saveOutfit, toggleFavorite, deleteOutfit }
}