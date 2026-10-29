# Syed Muaviz ur Rehman — 3D Cosmos Portfolio

An immersive, gamified 3D solar system portfolio for **Syed Muaviz ur Rehman**, an AI Safety, Alignment, and Machine Learning Theory researcher from Pakistan.

In this portfolio, Syed stands as the "sun" on a glowing holographic pedestal at the centre of the cosmos, surrounded by his six research and applied projects orbiting him as custom-textured celestial bodies.

## Key Features

1. **Gamified 3D Solar System (Three.js & WebGL)**:
   - **Hero Scene**: Split layout with typography on the left and Syed standing in an arched dark emerald portal with neon green rim lighting (`#39FF14`), thin gold orbit arcs, and a floating pedestal on the right.
   - **Solar System Scene**: Dolly out into full planetary orbit view. Six planets orbit continuously on tilted elliptical paths with faint orbit lines.
   - **Planet Detail Scene**: Smooth camera fly-to and zoom into any selected planet. A glassmorphism HUD panel slides in with the research tagline, overview, key contributions, stack chips, and links.
   - **Overlays (About / Skills / Contact)**: Deep translucent modal panels that float over the drifting cosmos.
   - **Procedural Canvas Textures**: 100% self-contained procedural textures for all 6 planets (Cayley graph lattice, Azure pipeline tracks + gold ring, CATCH-VR navigation vectors, Ivory marble with gold inscribed equations & DOI, frosted statistical grain, terracotta elevation contours). Zero external 404 dependencies.
   - **Cosmic Synthesizer**: Web Audio API ambient drone and gentle UI chirps (off by default, toggleable in HUD).
   - **Accessible Classic Mode**: Accessible, high-contrast 2D card grid for users who prefer no 3D or when `prefers-reduced-motion` is active.

## Content Management (`lib/content.ts`)

All portfolio copy, links, highlights, skills, timeline events, and contact data are centralized in:
```bash
lib/content.ts
```
To update any text, paper DOI, or add missing URLs (e.g. replacing `[GitHub repo]` or `[Google Scholar profile]`), edit `lib/content.ts` directly without modifying component code.

## Architecture & Components

- `app/page.tsx`: Single-page orchestrator managing scene state (`hero`, `solar`, `planet`), active overlays, and view modes.
- `components/CosmicCanvas.tsx`: High-performance Three.js WebGL canvas with procedural stars, avatar portal pedestal, orbiting planets, and smooth camera damping.
- `components/HUD.tsx`: Research lab HUD header and controls (wordmark, nav, sound toggle, mode switch, return-to-hero button).
- `components/Hero.tsx`: Split layout hero with two-tone headline and CTAs.
- `components/DetailPanel.tsx`: Slide-in glassmorphic side panel with keyboard arrow navigation.
- `components/AboutOverlay.tsx`: Bio, Honhaar Scholar recognition, 4 research interest cards, and academic timeline.
- `components/SkillsOverlay.tsx`: Grouped constellations of skills and verified credentials badge row.
- `components/ContactOverlay.tsx`: Contact information, one-click email copy, and profile links.
- `components/ClassicView.tsx`: Accessible 2D fallback view.
- `lib/textures.ts`: High-fidelity procedural 2D canvas textures and shaders.
- `lib/audio.ts`: Web Audio API synthesizer.
- `lib/rules.ts` & `lib/rules.test.ts`: Decoupled orbital mechanics math and unit tests.

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run unit tests
npx --yes tsx --test lib/rules.test.ts

# 3. Start development server
npm run dev
```

Open `http://localhost:3000` to view the running app.

## Building for Production

```bash
npm run build
npm run start
```
Deploy-ready for Vercel, Netlify, or any standard Node.js hosting platform.
