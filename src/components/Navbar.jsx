import { motion } from 'framer-motion'

const LINKS = [
  { id: 'landing',     label: 'Home' },
  { id: 'wardrobe',    label: 'Wardrobe' },
  { id: 'builder',     label: 'Outfits' },
  { id: 'inspiration', label: 'Inspiration' },
  { id: 'profile',     label: 'Profile' },
]

export default function Navbar({ activePage, onNavigate, darkMode, onToggleDark, user, onLogout, onOpenAuth }) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        padding: '20px 40px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(250,250,250,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--gray-200)',
      }}
    >
      {/* Logo */}
      <button onClick={() => onNavigate('landing')} style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 24, fontWeight: 300, letterSpacing: 6, textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--black)' }}>
        AURA
      </button>

      {/* Links */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {LINKS.map(link => (
          <button key={link.id} onClick={() => onNavigate(link.id)} style={{
            fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
            color: activePage === link.id ? 'var(--black)' : 'var(--gray-700)',
            border: 'none', background: 'none', padding: '4px 0',
            borderBottom: activePage === link.id ? '1px solid var(--black)' : '1px solid transparent',
            transition: 'color 0.2s',
          }}>
            {link.label}
          </button>
        ))}

        {/* Dark mode */}
        <button onClick={onToggleDark} style={{ background: 'none', border: '1.5px solid var(--gray-200)', borderRadius: 100, padding: '8px 16px', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--black)' }}>
          {darkMode ? '☀️' : '🌙'} Mode
        </button>

        {/* Auth */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--gray-500)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.email}
            </span>
            <button onClick={onLogout} style={{ background: 'transparent', color: 'var(--black)', padding: '10px 22px', borderRadius: 100, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', border: '1.5px solid var(--gray-200)', transition: 'all 0.2s' }}>
              Sign Out
            </button>
          </div>
        ) : (
          <button onClick={onOpenAuth} style={{ background: 'var(--black)', color: 'var(--white)', padding: '10px 22px', borderRadius: 100, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', border: 'none', transition: 'all 0.2s' }}>
            Sign In
          </button>
        )}
      </div>
    </motion.nav>
  )
}