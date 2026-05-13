import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { id: 'landing',     label: 'Home' },
  { id: 'wardrobe',    label: 'Wardrobe' },
  { id: 'builder',     label: 'Outfits' },
  { id: 'inspiration', label: 'Inspiration' },
  { id: 'profile',     label: 'Profile' },
]

export default function Navbar({ activePage, onNavigate, darkMode, onToggleDark, user, onLogout, onOpenAuth }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function nav(id) {
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
          padding: '16px 24px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(250,250,250,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--gray-200)',
        }}
      >
        {/* Logo */}
        <button onClick={() => nav('landing')} style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 24, fontWeight: 300, letterSpacing: 6, textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--black)' }}>
          AURA
        </button>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {LINKS.map(link => (
            <button key={link.id} onClick={() => nav(link.id)} style={{
              fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
              color: activePage === link.id ? 'var(--black)' : 'var(--gray-700)',
              border: 'none', background: 'none', padding: '4px 0',
              borderBottom: activePage === link.id ? '1px solid var(--black)' : '1px solid transparent',
              transition: 'color 0.2s',
            }}>
              {link.label}
            </button>
          ))}
          <button onClick={onToggleDark} style={{ background: 'none', border: '1.5px solid var(--gray-200)', borderRadius: 100, padding: '8px 16px', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--black)' }}>
            {darkMode ? '☀️' : '🌙'} Mode
          </button>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, color: 'var(--gray-500)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</span>
              <button onClick={onLogout} style={{ background: 'transparent', color: 'var(--black)', padding: '10px 22px', borderRadius: 100, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', border: '1.5px solid var(--gray-200)' }}>
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={onOpenAuth} style={{ background: 'var(--black)', color: 'var(--white)', padding: '10px 22px', borderRadius: 100, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}>
              Sign In
            </button>
          )}
        </div>

        {/* Mobile right side */}
        <div className="nav-mobile" style={{ display: 'none', alignItems: 'center', gap: 12 }}>
          <button onClick={onToggleDark} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', padding: 4 }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--black)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--black)', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: 'var(--black)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 998,
              background: 'var(--white)', borderBottom: '1px solid var(--gray-200)',
              padding: '16px 24px 24px',
            }}
          >
            {LINKS.map(link => (
              <button key={link.id} onClick={() => nav(link.id)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '14px 0', fontSize: 13, letterSpacing: 2,
                textTransform: 'uppercase', cursor: 'pointer',
                color: activePage === link.id ? 'var(--black)' : 'var(--gray-700)',
                border: 'none', borderBottom: '1px solid var(--gray-200)',
                background: 'none', fontFamily: '"DM Sans", sans-serif',
                fontWeight: activePage === link.id ? 600 : 400,
              }}>
                {link.label}
              </button>
            ))}
            <div style={{ marginTop: 16 }}>
              {user ? (
                <div>
                  <p style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 12 }}>{user.email}</p>
                  <button onClick={() => { onLogout(); setMenuOpen(false) }} style={{ width: '100%', padding: '14px', background: 'transparent', color: 'var(--black)', borderRadius: 100, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', border: '1.5px solid var(--gray-200)' }}>
                    Sign Out
                  </button>
                </div>
              ) : (
                <button onClick={() => { onOpenAuth(); setMenuOpen(false) }} style={{ width: '100%', padding: '14px', background: 'var(--black)', color: 'var(--white)', borderRadius: 100, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}>
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
