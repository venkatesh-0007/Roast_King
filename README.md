# 🌌 Roast King

> *Got a big ego? We'll bring it back to Earth. Because in the grand scheme of the universe, you're still a nobody.*

**Roast King** is a cosmic-themed flex roasting web app. Submit your achievements, flexes, or CGPA and watch the AntiGravity engine tear them apart with gravity-defying burns across three intensity modes.

---

## ✨ Features

- **🔥 Three Roast Intensity Modes**
  - 🌊 **Gentle Orbit** — light-hearted cosmic jabs
  - ☄️ **Meteor Strike** — fiery burns that leave craters
  - 🕳️ **Black Hole** — ego-annihilating devastation

- **🪐 Interactive Gravity Animations**
  - Mouse-reactive planet with spacetime grid warping
  - Framer Motion physics-based transitions
  - Accretion disk, orbiting meteors, and gravitational lensing effects

- **🧊 Liquid Glass UI**
  - iOS-inspired frosted glass panels with backdrop blur
  - Smooth crossfade transitions between modes (no glitches)

- **⭐ Star & Save**
  - Star your favorite roasts to save them in history
  - Persistent localStorage-backed starred history

- **🎵 Cosmic Sound Effects**
  - Web Audio API synthesized sounds for interactions
  - Mute/unmute toggle

- **📊 Roast Analytics**
  - Gravity score gauge with animated progress
  - Burn metrics and ego damage breakdown

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/venkatesh/roast-king.git
cd roast-king

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 🏗️ Project Structure

```
roast-king/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages CI/CD
├── public/
│   ├── favicon.svg             # App favicon
│   └── icons.svg               # Icon sprites
├── src/
│   ├── assets/                 # Static images
│   ├── components/
│   │   ├── CosmicBackground.jsx    # Animated starfield canvas
│   │   ├── HistoryDrawer.jsx       # Starred roasts drawer
│   │   ├── InteractivePlanet.jsx   # Mouse-reactive gravity planet
│   │   ├── RoastForm.jsx           # Flex input form + intensity selector
│   │   ├── RoastResults.jsx        # Roast output with score gauge
│   │   └── TrendingFlexes.jsx      # Pre-populated example flexes
│   ├── services/
│   │   ├── audio.js                # Web Audio API sound manager
│   │   └── roastEngine.js          # Roast generation logic
│   ├── App.jsx                     # Main app shell & state
│   ├── App.css                     # App-specific styles
│   ├── index.css                   # Global styles, design tokens, liquid glass
│   └── main.jsx                    # React entry point
├── index.html                  # HTML entry point
├── vite.config.js              # Vite + Tailwind configuration
├── eslint.config.js            # ESLint configuration
├── package.json
├── LICENSE
└── README.md
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Physics-based animations |
| **Lucide React** | Icon library |
| **Canvas Confetti** | Celebration effects |
| **Web Audio API** | Synthesized sound effects |

---

## 🌐 Deployment

### GitHub Pages (Automatic)

This project includes a GitHub Actions workflow that auto-deploys to GitHub Pages on every push to `main`.

**Setup:**

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source** and select **GitHub Actions**
3. Push to `main` — the site deploys automatically

> **Note:** Update the `base` value in [vite.config.js](./vite.config.js) to match your GitHub repo name.

### Vercel / Netlify (Alternative)

For Vercel or Netlify deployment:

1. Remove or comment out the `base` line in `vite.config.js`
2. Connect your GitHub repo to Vercel/Netlify
3. Set build command: `npm run build`
4. Set output directory: `dist`

---

## 📝 License

This project is licensed under the [MIT License](./LICENSE).

---

<p align="center">
  🌌 Built with React 19 + Vite + Tailwind CSS v4<br>
  <em>No cookies or gravity fields were harmed in the making.</em>
</p>
