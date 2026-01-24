# GearFolio

**Discover, Build, and Showcase Portfolios with AI Assistance**

GearFolio is an AI-powered portfolio creation and discovery platform designed for CIT-U (Cebu Institute of Technology - University) students. It enables students to create professional portfolios, discover peers' work, and receive AI-driven career recommendations.

## Features

### Portfolio Creation & Discovery
- Create and customize professional portfolios
- Discover and explore other students' portfolios
- Search functionality for finding portfolios by skills or keywords

### AI-Powered Career Recommendations
- Input your skills, interests, and career goals
- Receive personalized career path suggestions
- Skill level assessment (Beginner, Intermediate, Advanced)

### Job & Career Discovery
- Browse job listings with detailed information
- Filter by job type (Full-time, Part-time, Remote, On-site)
- Sort by relevance, distance, rating, or date
- Map view for geographical job visualization

### User Settings & Profile
- Manage account information and profile picture
- Security settings with password management
- Theme selection (Dark, Light, System Default)
- Portfolio privacy controls (Public, Private, Only Me)
- Connect social accounts (LinkedIn, Facebook, GitHub, Instagram, Microsoft)

### Help & Support
- FAQ section with expandable questions
- Tutorials for getting started, portfolio creation, and AI recommendations

## Tech Stack

### Frontend
- **Next.js 15.3.1** - React framework with App Router
- **React 19.0.0** - UI library
- **Tailwind CSS 4.1.5** - Utility-first CSS framework
- **TypeScript/JavaScript** - Primary languages

### Backend & Services
- **Firebase** - Authentication and Firestore database
- **Appwrite** - Backend-as-a-service for sessions
- **External AI API** - Career recommendation engine

### Development Tools
- **ESLint 9** - Code linting
- **PostCSS & Autoprefixer** - CSS processing

## Project Structure

```
GearFolio/
├── src/
│   ├── app/
│   │   ├── (routes)/                # Route group for pages
│   │   │   ├── landing-page/        # Public landing page
│   │   │   ├── dashboard/           # User dashboard
│   │   │   ├── AIRecommendation-1/  # AI recommendation form
│   │   │   ├── AIRecommFindCareer/  # Job/career discovery
│   │   │   ├── portfoliocreation/   # Portfolio builder
│   │   │   ├── porfolio_preview/    # Portfolio preview
│   │   │   ├── profile/             # User profile
│   │   │   ├── settings/            # User settings
│   │   │   ├── help-support/        # FAQ and tutorials
│   │   │   └── login_signup/        # Auth pages
│   │   ├── api/                     # API routes
│   │   │   ├── auth/                # Authentication endpoints
│   │   │   └── users/               # User data endpoints
│   │   └── firebase/                # Firebase configuration
│   ├── components/
│   │   ├── features/                # Feature-specific components
│   │   ├── layout/                  # Layout components (Header, Footer, Sidebar)
│   │   └── landing-page/            # Landing page components
│   ├── appwrite/                    # Appwrite integration
│   ├── lib/
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── services/                # API and auth services
│   │   └── utils.js                 # Utility functions
│   └── styles/                      # Global and module CSS
├── public/
│   └── image/                       # Static assets
├── package.json
├── next.config.mjs
├── tailwind.config.js
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ICPEP-SE-CITU/GearFolio.git
cd GearFolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables by creating a `.env.local` file:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Team

Developed by **ICPEP-SE-CITU** team.

## License

This project is developed for educational purposes at CIT-U.

---

Built with Next.js and Firebase
