# Bash Hibachi

A modern, premium web application for a street food hibachi restaurant business. Built with Next.js 16, featuring sophisticated animations, responsive design, and a mobile-first approach.

## Overview

Bash Hibachi is a sleek, animated website showcasing a teppanyaki/hibachi food truck service that specializes in live fire cooking, catering, and private events. The site features parallax scrolling, GSAP-powered animations, and a premium dark aesthetic.

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **Language:** TypeScript 5.0
- **Styling:** Tailwind CSS 3.4
- **Animations:**
  - Framer Motion 11.0 - React animations and scroll interactions
  - GSAP 3.14 - Advanced scroll-triggered animations
  - Lenis 1.3 - Smooth scroll (prepared but disabled for CSS sticky support)
- **Icons:** lucide-react
- **Fonts:** Google Fonts (Playfair Display, Inter)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout with fonts & metadata
│   ├── globals.css        # Global styles & CSS variables
│   ├── menu/              # Menu page
│   ├── about/             # About/Story page
│   └── contact/           # Contact & booking form
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Page sections (Hero, Menu, Features, etc.)
│   ├── animations/        # Reveal, ParallaxText components
│   ├── providers/         # SmoothScrollProvider
│   └── ui/                # Reusable UI components (Button, Image)
└── lib/
    └── utils.ts           # Utility functions (cn helper)
```

## Features

### Homepage
- **Hero Section** - Parallax background with animated title and floating particles
- **Marquee Section** - Scrolling text banner
- **Story Section** - Sticky text with parallax image
- **Menu Showcase** - GSAP-powered stacking card animation
- **Features Grid** - 3-column feature cards with hover effects
- **Catering Section** - Call-to-action with parallax background
- **Social Feed** - Instagram-style grid layout

### Menu Page
- Three categories: Signature Entrees, Combo Plates, Sides
- 9 menu items with images, descriptions, and prices
- Responsive grid layout with hover animations

### About Page
- "Our Story" narrative section
- 4 core values showcase
- Statistics display (customers, events, experience)

### Contact Page
- Contact information cards
- Comprehensive booking form
- Event type selection
- Guest count and date inputs

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Bash-Hibachi.git

# Navigate to project directory
cd Bash-Hibachi

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

## Design System

### Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--background` | `#0D0D0D` | Deep black background |
| `--off-white` | `#F5F5F0` | Cream white text |
| `--burnt-orange` | `#C65D07` | Accent color |

### Typography

- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

## Configuration

### Next.js Image Domains

The following remote image sources are configured:
- `static.wixstatic.com` - Menu/product images
- `storage.googleapis.com` - Team/truck photos

### TypeScript

- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`

## Key Components

### Animations

- **Reveal** - Scroll-triggered fade-in with customizable delay
- **ParallaxText** - Continuous scrolling marquee text
- **Menu Card Stack** - GSAP ScrollTrigger-powered stacking animation

### Layout

- **Header** - Sticky navigation with mobile hamburger menu
- **Footer** - Brand info, social links, contact details

## Deployment

Optimized for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project - All rights reserved.

---

Built with Next.js and deployed on Vercel.
