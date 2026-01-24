# FutureThink Hub

A comprehensive web platform for a Baltimore-based 501(c)(3) nonprofit organization dedicated to transforming lives through food security, workforce development, and economic mobility.

## About

FutureThink Hub serves the Baltimore community with programs focused on:
- **Food Security** - Grocery giveaways, community fridges, and holiday food drives
- **Workforce Development** - Culinary sponsorships and job training
- **Economic Mobility** - AI education platform (FutureThink Edge)
- **Community Outreach** - Haitian community support, back-to-school drives, and more

### Impact

- 29,000+ families served
- 20+ million pounds of food distributed
- 20,000+ families reached during holiday seasons

## Tech Stack

- **Framework:** Next.js 15.5.9 with App Router
- **Language:** TypeScript 5.0
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion 11.0
- **CRM Integration:** GoHighLevel API v2
- **Deployment:** Render.com

## Project Structure

```
Futurethink-Hub/
├── nextjs/                     # Main Next.js application
│   ├── app/                    # App Router pages and API routes
│   │   ├── api/ghl/            # GoHighLevel API endpoints
│   │   ├── about/              # About page
│   │   ├── causes/             # Initiatives listing
│   │   ├── donate/             # Donation page
│   │   ├── contact/            # Contact form
│   │   ├── volunteer/          # Volunteer sign-up
│   │   ├── events/             # Events listing
│   │   ├── blog/               # Blog pages
│   │   ├── store/              # eBay store integration
│   │   ├── media/              # Photo gallery
│   │   └── [initiative]/       # Dynamic initiative pages
│   ├── components/             # Reusable React components
│   │   ├── animations/         # Animation components
│   │   ├── forms/              # Form components
│   │   ├── layout/             # Header, Footer, etc.
│   │   ├── sections/           # Page section components
│   │   └── ui/                 # UI primitives (Button, Badge, etc.)
│   ├── lib/                    # Utilities and API clients
│   │   ├── gohighlevel.ts      # GoHighLevel API client
│   │   ├── blog-data.ts        # Blog content
│   │   └── utils.ts            # Helper functions
│   └── public/                 # Static assets (images, videos)
└── render.yaml                 # Deployment configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to the Next.js application
cd nextjs

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the `nextjs` directory with the following variables:

```env
# GoHighLevel API Configuration
GHL_API_KEY=your_private_integration_token
GHL_LOCATION_ID=your_location_id
GHL_API_BASE_URL=https://services.leadconnectorhq.com

# Payment Links - One-Time Donations
NEXT_PUBLIC_GHL_ONETIME_25=https://info.futurethinkhub.org/payment-link/...
NEXT_PUBLIC_GHL_ONETIME_50=https://info.futurethinkhub.org/payment-link/...
NEXT_PUBLIC_GHL_ONETIME_100=https://info.futurethinkhub.org/payment-link/...
NEXT_PUBLIC_GHL_ONETIME_250=https://info.futurethinkhub.org/payment-link/...

# Payment Links - Monthly Recurring Donations
NEXT_PUBLIC_GHL_MONTHLY_25=https://info.futurethinkhub.org/payment-link/...
NEXT_PUBLIC_GHL_MONTHLY_50=https://info.futurethinkhub.org/payment-link/...
NEXT_PUBLIC_GHL_MONTHLY_100=https://info.futurethinkhub.org/payment-link/...
NEXT_PUBLIC_GHL_MONTHLY_250=https://info.futurethinkhub.org/payment-link/...
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

The development server runs at [http://localhost:3000](http://localhost:3000).

## Key Features

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, statistics, initiatives, testimonials |
| About | `/about` | Founder story and mission |
| Causes | `/causes` | All initiatives and programs |
| Donate | `/donate` | Donation form with amount/frequency options |
| Volunteer | `/volunteer` | Volunteer registration |
| Contact | `/contact` | Contact form |
| Events | `/events` | Upcoming events and registration |
| Blog | `/blog` | Impact stories and articles |
| Media | `/media` | Photo gallery with pagination |
| Store | `/store` | eBay store integration |

### Initiatives

- Grocery Giveaway Saturdays
- FutureThink Edge (AI Education)
- Haitian Community Outreach
- Christmas Drive
- Thanksgiving Giveaway
- Breast Cancer Awareness
- Back to School
- Community Fridge
- Workforce Development / Culinary Sponsorship

### Integrations

**GoHighLevel CRM**
- Contact management with upsert behavior
- Form submissions (donation, contact, volunteer, in-kind)
- Tag-based organization
- Payment link integration for donations
- Calendar/booking for events

**eBay Store**
- Embedded store on `/store` page

## Deployment

The project is configured for deployment on Render.com using `render.yaml`:

```yaml
services:
  - type: web
    runtime: node
    region: oregon
    plan: starter
    buildCommand: cd nextjs && npm install && npm run build
    startCommand: cd nextjs && npm start
    healthCheckPath: /
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
```

## Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary | `#0A0A0A` | Dark backgrounds, text |
| Accent | `#FE6462` | CTAs, highlights |
| Success | `#94D96B` | Success states |
| Muted | `#666666` | Secondary text |
| Body | `#F5F5F5` | Page background |

### Typography

- **Font:** Inter (Google Fonts)
- Responsive typography scale via Tailwind

## License

This project is proprietary software for FutureThink Hub, a 501(c)(3) nonprofit organization.

## Contact

**FutureThink Hub**
Baltimore, Maryland

- Website: [futurethinkhub.org](https://futurethinkhub.org)
- Founder: Brandon M. Phillips, Executive Director
