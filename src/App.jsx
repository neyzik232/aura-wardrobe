import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar      from './components/Navbar'
import ToastStack  from './components/ToastStack'
import Landing     from './pages/Landing'
import Wardrobe    from './pages/Wardrobe'
import Builder     from './pages/Builder'
import Inspiration from './pages/Inspiration'
import Profile     from './pages/Profile'
import Auth        from './pages/Auth'

import { useWardrobe } from './hooks/useWardrobe'
import { useToast }    from './hooks/useToast'
import { supabase }    from './lib/supabase'
import Onboarding      from './components/Onboarding'

const PAGE_TRANSITION = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0 },
  exit:     { opacity: 0, y: -12 },
  transition: { duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] },
}

const PROTECTED = ['wardrobe', 'builder', 'profile']

export default function App() {
  const [page, setPage]         = useState('landing')
  const [darkMode, setDark]     = useState(() => localStorage.getItem('aura_dark') === 'true')
  const [user, setUser]         = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [showAuth, setShowAuth]           = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  const { wardrobe, outfits, addItem, deleteItem, saveOutfit, toggleFavorite, deleteOutfit } = useWardrobe(user)
  const { toasts, toast } = useToast()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    document.body.classList.toggle('dark', darkMode)
    localStorage.setItem('aura_dark', darkMode)
  }, [darkMode])

  function navigate(id) {
    // Якщо сторінка захищена і юзер не залогінений — показуємо попап
    if (PROTECTED.includes(id) && !user) {
      setShowAuth(true)
      return
    }
    setPage(id)
    window.scrollTo(0, 0)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    setPage('landing')
    toast('Вийшли з акаунту')
  }

  function handleLogin(u) {
    setUser(u)
    setShowAuth(false)
    const isNew = !localStorage.getItem('aura_onboarded')
    if (isNew) {
      setShowOnboarding(true)
    } else {
      toast('Ласкаво просимо ✦')
      setPage('wardrobe')
    }
  }

  if (authLoading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 48, fontWeight: 300, letterSpacing: 8 }}>AURA</p>
    </div>
  )

  const pages = {
    landing:     <Landing     onNavigate={navigate} />,
    wardrobe:    <Wardrobe    wardrobe={wardrobe} onAdd={addItem} onDelete={deleteItem} toast={toast} />,
    builder:     <Builder     wardrobe={wardrobe} outfits={outfits} onSaveOutfit={saveOutfit} onToggleFav={toggleFavorite} onDeleteOutfit={deleteOutfit} toast={toast} />,
    inspiration: <Inspiration wardrobe={wardrobe} onNavigate={navigate} toast={toast} />,
    profile:     <Profile     wardrobe={wardrobe} outfits={outfits} onToggleFav={toggleFavorite} user={user} onLogout={handleLogout} />,
  }

  return (
    <>
      <Navbar activePage={page} onNavigate={navigate} darkMode={darkMode} onToggleDark={() => setDark(d => !d)} user={user} onLogout={handleLogout} onOpenAuth={() => setShowAuth(true)} />

      <main style={{ paddingTop: 80 }}>
        <AnimatePresence mode="wait">
          <motion.div key={page} {...PAGE_TRANSITION}>
            {pages[page] || pages.landing}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Auth попап */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowAuth(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          >
            <div onClick={e => e.stopPropagation()}>
              <Auth onLogin={handleLogin} onClose={() => setShowAuth(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOnboarding && (
          <Onboarding onComplete={() => { setShowOnboarding(false); toast('Ласкаво просимо ✦'); setPage('wardrobe') }} />
        )}
      </AnimatePresence>

      <ToastStack toasts={toasts} />
    </>
  )
}