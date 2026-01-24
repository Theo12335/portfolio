# La Chow

A full-stack web platform for **La Chow** - a premier shared commercial kitchen space and event venue located in downtown Baltimore, Maryland.

**Live Site:** [https://www.thelachow.com](https://www.thelachow.com)

## About

La Chow provides flexible kitchen rentals, event spaces, and office spaces for food entrepreneurs, caterers, and businesses. This monorepo contains two applications:

- **`/web`** - Customer-facing website
- **`/admin`** - Admin dashboard for content and business management

## Features

### Customer Website (`/web`)
- Commercial kitchen rental information and booking
- Event spaces and wedding venue booking
- Office space rentals
- Package builder for custom rental plans
- Blog and magazine content
- Online ordering with Stripe payments
- Contact forms and tour booking
- Newsletter subscription
- SEO optimized with structured data

### Admin Dashboard (`/admin`)
- Dashboard overview
- Blog post management
- Events management
- Google Analytics integration

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** Supabase
- **Payments:** Stripe
- **Animations:** Framer Motion
- **Analytics:** Google Analytics, Vercel Analytics
- **Icons:** Lucide React, React Icons

## Project Structure

```
lachow/
├── web/                    # Customer-facing website
│   ├── src/
│   │   ├── app/
│   │   │   ├── (pages)/    # Route groups
│   │   │   ├── api/        # API routes
│   │   │   └── components/ # React components
│   │   └── ...
│   └── package.json
├── admin/                  # Admin dashboard
│   ├── src/
│   │   ├── app/
│   │   │   ├── analytics/
│   │   │   ├── blog/
│   │   │   ├── dashboard/
│   │   │   └── events/
│   │   └── ...
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Environment Variables

#### Web (`/web/.env`)
```bash
NEXT_PUBLIC_ADMIN_URL=http://localhost:4000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
GHL_WEBHOOK_URL=your_webhook_url
```

#### Admin (`/admin/.env`)
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

```bash
# Install web dependencies
cd web
npm install

# Install admin dependencies
cd ../admin
npm install
```

### Development

```bash
# Run web app (port 3000)
cd web
npm run dev

# Run admin app (port 4000)
cd admin
npm run dev
```

Open:
- Web: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:4000](http://localhost:4000)

### Build

```bash
# Build web
cd web
npm run build

# Build admin
cd admin
npm run build
```

## Deployment

Both applications are optimized for deployment on [Vercel](https://vercel.com).

## Contact

- **Website:** [https://www.thelachow.com](https://www.thelachow.com)
- **Email:** info@thelachow.com
- **Phone:** +1 (443) 332-3392
- **Address:** 210 S Central Ave, Baltimore, MD 21202

## License

Private - All rights reserved.
    