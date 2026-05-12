# AURA — Virtual Wardrobe & Outfit Planner

> *Your style, elevated.*

A premium fashion tech app to curate your wardrobe, build outfits, and discover style inspiration.

---

## ✦ Features

- **Virtual Wardrobe** — Upload clothing items with photos, organize by category and color
- **Outfit Builder** — Drag & drop interface to compose and save outfits
- **Inspiration** — Mood-based outfit generation (Minimal, Streetwear, Archive, Casual, All Black)
- **Profile** — Wardrobe stats, favourite outfits, style aesthetic tags
- **Dark Mode** — Full dark/light toggle
- **Persistent storage** — Everything saved to `localStorage`

---

## 🛠 Tech Stack

- **React 18** + **Vite**
- **Framer Motion** — page transitions, card animations, micro-interactions
- **Tailwind CSS** — utility classes + custom design tokens
- **CSS custom properties** — full dark mode theming

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Folder Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── ToastStack.jsx
│   ├── AddItemModal.jsx
│   ├── ClothingCard.jsx
│   └── OutfitCard.jsx
├── pages/            # Full page views
│   ├── Landing.jsx
│   ├── Wardrobe.jsx
│   ├── Builder.jsx
│   ├── Inspiration.jsx
│   └── Profile.jsx
├── hooks/            # Custom React hooks
│   ├── useWardrobe.js   # All wardrobe/outfit state + localStorage
│   └── useToast.js      # Toast notification system
├── data/             # Static constants & config
│   └── constants.js
├── styles/           # Global CSS & design tokens
│   └── globals.css
├── App.jsx           # Root shell — routing, dark mode, shared state
└── main.jsx          # Entry point
```

---

## 🌐 Deploy to GitHub Pages

```bash
# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Add to package.json:
#    "homepage": "https://<your-username>.github.io/aura-wardrobe",
#    "predeploy": "npm run build",
#    "deploy": "gh-pages -d dist"

# 3. Add base to vite.config.js:
#    base: '/aura-wardrobe/'

# 4. Deploy
npm run deploy
```

---

## 📄 License

MIT — neyzik232, 2026. gmail: neyzikhokage@gmail.com

---

## Author

GitHub: https://github.com/neyzik232
