import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar      from './components/Navbar'
import ToastStack  from './components/ToastStack'
import Landing     from './pages/Landing'
import Wardrobe    from './pages/Wardrobe'
import Builder     from './pages/Builder'
import Inspiration from './pages/Inspiration'
import Profile     from './pages/Profile'

import { useWardrobe } from './hooks/useWardrobe'
import { useToast }    from './hooks/useToast'

const PAGE_TRANSITION = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0 },
  exit:     { opacity: 0, y: -12 },
  transition: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] },
}

/**
 * Root application shell.
 * Manages: active page, dark mode, shared wardrobe state, toasts.
 */
export default function App() {
  const [page, setPage]       = useState('landing')
  const [darkMode, setDark]   = useState(() => localStorage.getItem('aura_dark') === 'true')

  const { wardrobe, outfits, addItem, deleteItem, saveOutfit, toggleFavorite, deleteOutfit } = useWardrobe()
  const { toasts, toast } = useToast()

  // Sync dark mode to <html> class and localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    document.body.classList.toggle('dark', darkMode)
    localStorage.setItem('aura_dark', darkMode)
  }, [darkMode])

  function navigate(id) {
    setPage(id)
    window.scrollTo(0, 0)
  }

  const pages = {
    landing:     <Landing     onNavigate={navigate} />,
    wardrobe:    <Wardrobe    wardrobe={wardrobe} onAdd={addItem} onDelete={deleteItem} toast={toast} />,
    builder:     <Builder     wardrobe={wardrobe} outfits={outfits} onSaveOutfit={saveOutfit} onToggleFav={toggleFavorite} onDeleteOutfit={deleteOutfit} toast={toast} />,
    inspiration: <Inspiration wardrobe={wardrobe} onNavigate={navigate} toast={toast} />,
    profile:     <Profile     wardrobe={wardrobe} outfits={outfits} onToggleFav={toggleFavorite} />,
  }

  return (
    <>
      <Navbar activePage={page} onNavigate={navigate} darkMode={darkMode} onToggleDark={() => setDark(d => !d)} />

      <main style={{ paddingTop: 80 }}>
        <AnimatePresence mode="wait">
          <motion.div key={page} {...PAGE_TRANSITION}>
            {pages[page] || pages.landing}
          </motion.div>
        </AnimatePresence>
      </main>

      <ToastStack toasts={toasts} />
    </>
  )
}
