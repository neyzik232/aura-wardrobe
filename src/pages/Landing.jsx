import { motion } from 'framer-motion'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.12 } } }

/**
 * Cinematic landing / hero page.
 */
export default function Landing({ onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px', position: 'relative', overflow: 'hidden' }}>
        {/* Floating decorative circles */}
        <div className="animate-float" style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'var(--gray-200)', opacity: 0.5, top: -150, right: -100, pointerEvents: 'none' }} />
        <div className="animate-float-slow" style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'var(--gray-200)', opacity: 0.4, bottom: -100, left: -80, pointerEvents: 'none' }} />

        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p variants={fadeUp} style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 32 }}>
            Virtual Wardrobe · Outfit Planner · Style OS
          </motion.p>
          <motion.h1 variants={fadeUp} style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(64px, 10vw, 140px)', fontWeight: 300, lineHeight: 0.9, letterSpacing: -2, marginBottom: 40 }}>
            Your <em style={{ fontStyle: 'italic', color: 'var(--gray-500)' }}>style,</em><br />elevated.
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 16, color: 'var(--gray-700)', maxWidth: 400, lineHeight: 1.7, marginBottom: 52, margin: '0 auto 52px', fontWeight: 300 }}>
            A virtual wardrobe for those who treat fashion as art. Curate, build, and own your aesthetic.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('wardrobe')} style={{ background: 'var(--black)', color: 'var(--white)', padding: '16px 36px', borderRadius: 100, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', border: 'none', transition: 'transform 0.2s' }}>
              Start Building →
            </button>
            <button onClick={() => onNavigate('inspiration')} style={{ background: 'transparent', color: 'var(--black)', padding: '16px 36px', borderRadius: 100, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', border: '1.5px solid var(--gray-300)', transition: 'border-color 0.2s' }}>
              Get Inspired
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="landing-features" style={{ padding: '100px 60px', background: 'var(--gray-100)' }}>
        <p style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 16 }}>Everything you need</p>
        <h2 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 300, lineHeight: 1, marginBottom: 60 }}>
          Your fashion,<br />all in one place.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{ background: 'var(--white)', borderRadius: 16, padding: 36 }}
            >
              <div style={{ fontSize: 36, marginBottom: 24 }}>{f.icon}</div>
              <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 28, fontWeight: 300, marginBottom: 12 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.7 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <div className="landing-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--gray-200)' }}>
        {STATS.map(s => (
          <div key={s.num} style={{ background: 'var(--white)', padding: '60px 40px', textAlign: 'center' }}>
            <div style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 72, fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gray-500)', marginTop: 8 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const FEATURES = [
  { icon: '📦', title: 'Virtual Wardrobe',  desc: 'Upload every piece you own. Organize by category, color, and season with a beautiful grid interface.' },
  { icon: '🎨', title: 'Outfit Builder',    desc: 'Drag and drop your pieces together. Build, name, and save outfits. Favourite the ones you love most.' },
  { icon: '⚡', title: 'Daily Inspiration', desc: 'Generate mood-based outfit ideas. From minimal to streetwear — get your fit in seconds.' },
  { icon: '👤', title: 'Style Profile',     desc: 'Track your wardrobe stats, favourite pieces, and see how your personal aesthetic evolves over time.' },
]
const STATS = [
  { num: '12K+', label: 'Items Catalogued' },
  { num: '4.8K', label: 'Outfits Created' },
  { num: '98%',  label: 'Satisfaction' },
  { num: '∞',    label: 'Style Possibilities' },
]
