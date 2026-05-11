// ── Category metadata ──────────────────────────────────────────────────────
export const CATEGORIES = [
  { id: 'all',         label: 'All' },
  { id: 'tops',        label: 'Tops' },
  { id: 'hoodies',     label: 'Hoodies' },
  { id: 'jackets',     label: 'Jackets' },
  { id: 'pants',       label: 'Pants' },
  { id: 'shoes',       label: 'Shoes' },
  { id: 'accessories', label: 'Accessories' },
]

export const CATEGORY_EMOJI = {
  tops:        '👕',
  hoodies:     '🧥',
  jackets:     '🧥',
  pants:       '👖',
  shoes:       '👟',
  accessories: '💍',
}

// ── Swatchable colors ──────────────────────────────────────────────────────
export const SWATCH_COLORS = [
  { hex: '#f5f4f2', name: 'White' },
  { hex: '#1a1917', name: 'Black' },
  { hex: '#8b7355', name: 'Tan' },
  { hex: '#4a5568', name: 'Grey' },
  { hex: '#9f7aea', name: 'Purple' },
  { hex: '#e53e3e', name: 'Red' },
  { hex: '#38a169', name: 'Green' },
  { hex: '#3182ce', name: 'Blue' },
  { hex: '#ed8936', name: 'Orange' },
  { hex: '#d53f8c', name: 'Pink' },
]

// ── Mood presets ───────────────────────────────────────────────────────────
export const MOODS = [
  { id: 'all',       label: 'All',        desc: 'Surprise yourself with something unexpected.' },
  { id: 'minimal',   label: 'Minimal',    desc: 'Clean lines, neutral tones, effortless restraint.' },
  { id: 'streetwear',label: 'Streetwear', desc: 'Bold silhouettes, graphic energy, downtown vibes.' },
  { id: 'archive',   label: 'Archive',    desc: 'Avant-garde cuts, deconstructed, collector\'s edition.' },
  { id: 'casual',    label: 'Casual',     desc: 'Easy-to-wear, relaxed, everyday luxury.' },
  { id: 'all black', label: 'All Black',  desc: 'Monochromatic darkness. The ultimate edit.' },
]

// ── Style board cards ──────────────────────────────────────────────────────
export const STYLE_BOARD = [
  { name: 'Tonal Dressing',  mood: 'minimal',    emoji: '🤍' },
  { name: 'Off-Duty Uniform',mood: 'casual',     emoji: '🖤' },
  { name: 'Graphic Statement',mood:'streetwear',  emoji: '🔳' },
  { name: 'Deconstructed',   mood: 'archive',    emoji: '📐' },
  { name: 'Shadow Mode',     mood: 'all black',  emoji: '🌑' },
  { name: 'Gallery Opening', mood: 'minimal',    emoji: '🏛️' },
  { name: 'City Explorer',   mood: 'streetwear', emoji: '🏙️' },
  { name: 'Late Night',      mood: 'all black',  emoji: '🌃' },
  { name: 'Soft Luxury',     mood: 'minimal',    emoji: '🕊️' },
  { name: 'Archive Hunt',    mood: 'archive',    emoji: '📦' },
  { name: 'Weekend Ease',    mood: 'casual',     emoji: '☀️' },
  { name: 'East Berlin',     mood: 'archive',    emoji: '🔩' },
]

// ── Style aesthetic tags (profile) ─────────────────────────────────────────
export const STYLE_TAGS = [
  'Minimalist', 'Monochromatic', 'Quiet Luxury', 'Streetwear',
  'Archive', 'Avant-garde', 'Normcore', 'Y2K',
]
