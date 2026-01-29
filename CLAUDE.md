# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

This is a Next.js 16 App Router project for Scrap Society Rotterdam, a craft community website. Uses React 19, Tailwind CSS 4, and Framer Motion for animations.

### Project Structure

- `app/` - Next.js App Router pages (home, about, events, contact)
- `components/` - React components organized by purpose:
  - `ui/` - Reusable UI components (Button, Card, WashiTape, CutoutText, PolaroidFrame)
  - `layout/` - Header and Footer
  - `sections/` - Page sections (Hero, EventCard)
  - `animations/` - Framer Motion variants
  - `splash/` - Splash screen overlay with dissolving animation
- `lib/` - Data and utilities (events data)
- `public/` - Static assets

### Design System

The site uses a scrapbook/craft aesthetic defined in `globals.css`:

**CSS Custom Properties:**
- Colors: `--cream`, `--kraft`, `--vintage-red`, `--mustard`, `--sage`, `--tape-yellow`, `--tape-pink`, `--tape-mint`
- Fonts: `--font-special-elite` (typewriter), `--font-karla` (body)

**Key CSS Classes:**
- `.washi-tape`, `.washi-tape-pink`, `.washi-tape-mint` - Decorative tape strips
- `.torn-edge-top`, `.torn-edge-bottom`, `.torn-edge-all` - Torn paper clip-paths
- `.polaroid` - Photo frame styling
- `.paper`, `.paper-kraft`, `.paper-lined` - Paper textures
- `.gingham`, `.gingham-sm`, `.gingham-lg` - Checkered patterns

### Animation System

All Framer Motion variants are centralized in `components/animations/variants.ts`:
- Entry: `fadeInUp`, `scaleIn`, `polaroidDrop`, `slideInLeft/Right`
- Hover: `wiggle`, `stickerPeel`, `cardTilt`, `paperFlutter`
- Looping: `float`, `gentleSway`, `confettiPiece`
- Container: `staggerContainer`, `tapeStick`
- Special: `paperScrapBurst` (splash page dissolution)

UI components apply these variants consistently - see Button (`stickerPeel`) and Card (`cardTilt`) for patterns.

### Path Aliases

`@/*` maps to project root (e.g., `@/components/ui/Button`).
