# FutureThink Edge - AI-Powered Adaptive Learning Platform

## Overview

FutureThink Edge is a comprehensive AI-powered adaptive learning platform designed specifically for students with ADHD and other learning differences. The platform provides personalized, gamified learning experiences with superhero personas, making education engaging and accessible.

**Status:** Development (January 2026)
**Quality Level:** Six Sigma 5.90 (CERTIFIED)
**TODO Version:** v9 - Research-Validated (842 items)

---

## Table of Contents

- [Documentation](#documentation)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [User Portals](#user-portals)
- [Test Accounts](#test-accounts)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [AI Integration](#ai-integration)
- [Research-Validated Approaches](#research-validated-approaches)
- [Platform Features](#platform-features)
- [Development](#development)
- [Testing](#testing)
- [Security and Compliance](#security-and-compliance)
- [Quality Metrics](#quality-metrics)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Support](#support)

---

## Documentation

**New to this project?**
1. Read this file (project overview)
2. Review [CLAUDE.md](CLAUDE.md) for detailed development guidelines and instructions
3. Check backend documentation in `/backend/docs/`

**Quick Start:**
```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload
```

---

## Features

### Core Learning Features
- **Gamified Learning** - Superhero personas, XP system, achievement badges, and streak tracking
- **ADHD-Optimized** - Designed for focus and engagement with adaptive pacing
- **AI-Powered Classroom** - Adaptive learning with multiple AI model routing
- **Brain Gym** - 39+ cognitive training games targeting different brain regions
- **Knowledge Tracing** - Research-validated ensemble model for tracking student mastery

### Multi-Role Support
- **Students** - Dashboard, AI Classroom, Brain Gym, assignments, notes, character customization
- **Teachers** - Class management, student analytics, assignment creation, grading
- **Parents** - Child progress monitoring, mental health insights, teacher communication
- **Admins** - User management, database management, platform analytics
- **Clinical** - Caseload management, interventions, crisis response
- **Board** - Strategic planning, budget oversight, compliance reporting

### Mental Health and Wellness
- **Emotion Detection** - Camera-assisted emotion tracking with ResNet-50 + CBAM
- **Wellness Check-ins** - Daily emotional state tracking with 8-instrument clinical suite
- **Mental Health Signal Detection** - Crisis keyword detection with 988 Lifeline integration
- **Personalized Anomaly Detection** - Against student baselines for early intervention

### Personalization
- **Deep Student Profiles** - 14 data source aggregation for learning behavior classification
- **Adaptive AI Tone** - 5 distinct tone profiles based on emotional state
- **Dynamic XP Engine** - Streak multipliers (1.0x to 2.5x) with break penalties

### Security and Compliance
- **JWT Authentication** - With role-based permissions and token rotation
- **GDPR Compliance** - Data export, deletion, and consent management
- **FERPA Compliance** - Parental consent workflows, PII audit trails
- **Crisis Response Integration** - 988 Suicide Prevention Lifeline API

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.3.2 | React framework with App Router |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | v4 | Utility-first styling |
| React Context API | - | State management |
| Vitest | - | Unit testing |
| React Testing Library | - | Component testing |
| Playwright | - | End-to-end testing |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | - | Python web framework |
| SQLAlchemy | - | ORM with async support |
| SQLite | - | Development database |
| PostgreSQL | - | Production database |
| Redis | - | Caching layer |
| JWT | - | Authentication tokens |
| pytest | - | Testing framework |

### AI Integration
| Model | Use Case | Why |
|-------|----------|-----|
| Gemini 3 Pro | Bootstrap (0-5K students) | 1501 Elo, 100 req/day free tier |
| DeepSeek R1 | Math (40% traffic) | 91.6% MATH accuracy, $2.19/1M tokens |
| Gemini 3 Pro | Science (30%) | 90.8% GPQA, multimodal support |
| Claude 4.5 Sonnet / Grok 4.1 | Code (20%) | Best accuracy or best value |
| Grok 4.1 | General (10%) | $0.50/1M tokens, 2M context |

---

## Project Structure

```
project-edge/
├── frontend/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/                 # App router pages and layouts
│   │   │   ├── (auth)/          # Authentication pages (login, signup)
│   │   │   ├── (portal)/        # Protected portal pages
│   │   │   │   ├── student/     # Student dashboard, AI classroom, brain gym
│   │   │   │   ├── teacher/     # Teacher dashboard, classes, students
│   │   │   │   ├── parent/      # Parent dashboard, child progress
│   │   │   │   ├── admin/       # Admin dashboard, user management
│   │   │   │   ├── clinical/    # Clinical dashboard, interventions
│   │   │   │   └── board/       # Board dashboard, analytics
│   │   │   └── global-components/  # Reusable component library
│   │   │       ├── buttons/     # Button components
│   │   │       ├── cards/       # Card components
│   │   │       ├── forms/       # Form components
│   │   │       ├── typography/  # Text components
│   │   │       ├── layouts/     # Layout components
│   │   │       ├── animations/  # Animation components
│   │   │       └── notifications/ # Notification components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── contexts/            # React Context providers
│   │   ├── services/            # API services
│   │   ├── utils/               # Utility functions
│   │   ├── types/               # TypeScript type definitions
│   │   └── components/          # Shared components
│   │       └── error-handling/  # Error boundary, hooks, HOCs
│   ├── e2e/                     # Playwright E2E tests (550+ tests)
│   ├── public/                  # Static assets
│   └── package.json
│
├── backend/                     # FastAPI backend application
│   ├── app/
│   │   ├── models/              # Database models (57 models)
│   │   ├── routers/             # API endpoints (86 routers)
│   │   ├── services/            # Business logic (177 services)
│   │   │   ├── ai_service.py    # AI classroom integration
│   │   │   ├── xp_service.py    # XP and gamification
│   │   │   ├── streak_service.py # Streak tracking
│   │   │   ├── emotion_learning_service.py # Emotion calibration
│   │   │   ├── mental_health_signal_detection_service.py # Crisis detection
│   │   │   ├── deep_student_profile_service.py # Student profiling
│   │   │   └── enhanced_emotion_detection.py # Facial emotion AI
│   │   ├── core/                # Core configurations
│   │   │   ├── auth.py          # JWT authentication
│   │   │   ├── validators.py    # Input validation
│   │   │   ├── audit.py         # Audit logging
│   │   │   ├── pkce.py          # OAuth PKCE support
│   │   │   └── data_retention.py # Data retention policies
│   │   ├── middleware/          # Request middleware
│   │   ├── exceptions/          # Custom exception classes
│   │   └── main.py              # Application entry point
│   ├── migrations/              # Database migrations (65 files)
│   ├── tests/                   # pytest test suites
│   │   ├── unit/                # Unit tests (341 tests)
│   │   ├── integration/         # Integration tests (16 tests)
│   │   └── regression/          # Regression tests (21 tests)
│   ├── load_tests/              # k6 load testing scripts
│   ├── docs/                    # Backend documentation
│   │   ├── API_REFERENCE.md     # Complete API documentation
│   │   ├── ARCHITECTURE.md      # System architecture
│   │   ├── DEVELOPER_ONBOARDING.md # Getting started guide
│   │   └── deployment/          # Deployment runbooks
│   └── requirements.txt
│
├── .github/
│   ├── workflows/
│   │   └── quality.yml          # CI/CD pipeline (6 stages)
│   └── dependabot.yml           # Automated dependency updates
│
├── scripts/                     # Deployment scripts
├── README.md                    # This file
├── CLAUDE.md                    # Development guidelines
└── SECURITY.md                  # Security documentation
```

---

## Quick Start

### Prerequisites
- **Node.js 18+** and npm
- **Python 3.10+**
- **Git**
- **Redis** (optional, for caching)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file with:
# DATABASE_URL=sqlite:///./edge_learning.db
# SECRET_KEY=your-secure-key-at-least-32-chars
# GROQ_API_KEY=your-groq-key (optional)
# REDIS_URL=redis://localhost:6379 (optional)

# Run database migrations
cd migrations && python runner.py && cd ..

# Start server
uvicorn app.main:app --reload --port 8000
```

**Backend:** http://localhost:8000
**API Docs:** http://localhost:8000/docs

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local with:
# NEXT_PUBLIC_API_URL=http://localhost:8000

# Start development server
npm run dev
```

**Frontend:** http://localhost:3000

---

## User Portals

| Portal | Path | Features |
|--------|------|----------|
| **Student** | `/student/*` | Dashboard, AI Classroom, Brain Gym (39+ games), Assignments, Notes, Character customization, Wellness check-ins |
| **Teacher** | `/teacher/*` | Class management, Student analytics, Assignment creation, Grading, Progress reports |
| **Parent** | `/parent/*` | Child progress monitoring, Mental health insights, Teacher communication, Activity logs |
| **Admin** | `/admin/*` | User management, Database management, Platform analytics, System configuration |
| **Clinical** | `/clinical/*` | Caseload management, Interventions, Crisis response, Mental health assessments |
| **Board** | `/board/*` | Strategic planning, Budget oversight, Compliance reporting, District analytics |

---

## Test Accounts

All test accounts use password: `futurethinkhub`

| Email | Role | Description |
|-------|------|-------------|
| brandon@student.com | STUDENT | Full student portal access |
| brandon@teacher.com | TEACHER | Teacher portal access |
| brandon@parent.com | PARENT | Parent portal access |
| brandon@admin.com | ADMIN | Admin portal access |

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | User registration (returns JWT) |
| POST | `/login` | User authentication (returns JWT) |
| POST | `/logout` | User logout |
| POST | `/api/auth/rotate-token` | Refresh token rotation |

### Student Portal
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/student/dashboard` | Dashboard data |
| GET | `/api/student/profile` | Student profile |
| POST | `/api/learning/chat` | AI classroom interaction |
| GET | `/api/brain-gym/games` | Available brain gym games |
| POST | `/api/brain-gym/score` | Submit game score |
| GET | `/api/student/xp` | XP and streak data |
| POST | `/api/student/wellness-checkin` | Submit wellness check-in |

### Teacher Portal
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/teacher/classes` | Teacher's classes |
| GET | `/api/teacher/students` | Student list |
| POST | `/api/teacher/assignments` | Create assignments |
| GET | `/api/teacher/analytics` | Class analytics |

### Organization Portal
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/organization/teachers` | Organization teachers |
| GET | `/api/organization/classes` | Organization classes |
| POST | `/api/organization/teachers` | Add new teacher |

### Admin Portal
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | User management |
| PUT | `/api/admin/users/{id}` | Update user |
| DELETE | `/api/admin/users/{id}` | Delete user |

### Compliance (GDPR/FERPA)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gdpr/export/me` | Export user data |
| DELETE | `/api/gdpr/delete/me` | Delete user data |
| GET | `/api/gdpr/consent` | Get consent status |
| POST | `/api/gdpr/consent` | Update consent |

For complete API documentation, see `/backend/docs/API_REFERENCE.md` or visit http://localhost:8000/docs when running.

---

## Database Schema

### Core Tables

| Table | Description |
|-------|-------------|
| `users` | User authentication and basic info |
| `student_profiles` | Student-specific data (learning preferences, ADHD accommodations) |
| `teacher_profiles` | Teacher-specific data |
| `parent_profiles` | Parent-specific data |
| `ai_characters` | Student's AI character/superhero data |
| `organizations` | Organization/school data |
| `classrooms` | Class information |
| `classroom_students` | Student-classroom relationships |

### Learning Tables

| Table | Description |
|-------|-------------|
| `chat_messages` | AI classroom interaction history |
| `assignments` | Teacher-created assignments |
| `submissions` | Student assignment submissions |
| `brain_gym_scores` | Game scores and cognitive progress |
| `learning_sessions` | Session tracking for analytics |

### Gamification Tables

| Table | Description |
|-------|-------------|
| `xp_transactions` | XP awards and deductions |
| `achievements` | Achievement definitions |
| `user_achievements` | Unlocked achievements per user |
| `streaks` | Daily login/activity streaks |
| `leaderboard_entries` | Leaderboard rankings |

### Wellness Tables

| Table | Description |
|-------|-------------|
| `wellness_checkins` | Daily emotional check-ins |
| `emotion_readings` | Facial emotion detection history |
| `mental_health_signals` | Detected mental health indicators |
| `parental_consents` | FERPA consent records |

---

## AI Integration

### Research-Validated Model Selection

Based on 23 research documents, we use intelligent model routing:

| Use Case | Model | Reasoning |
|----------|-------|-----------|
| **Bootstrap (0-5K students)** | Gemini 3 Pro FREE tier | 1501 Elo rating, 100 requests/day free |
| **Math Problems (40% traffic)** | DeepSeek R1 | 91.6% MATH benchmark, MIT license, $2.19/1M tokens |
| **Science Content (30%)** | Gemini 3 Pro | 90.8% GPQA accuracy, multimodal support |
| **Code Assistance (20%)** | Claude 4.5 Sonnet or Grok 4.1 | Best accuracy vs best value tradeoff |
| **General Queries (10%)** | Grok 4.1 | $0.50/1M tokens, 2M context window |

### AI Tone Adaptation

The AI adapts its communication style based on student emotional state:

| Emotional State | AI Tone | Characteristics |
|-----------------|---------|-----------------|
| Excited | Enthusiastic | High energy, quick pace, celebrate achievements |
| Happy | Warm | Friendly, encouraging, positive reinforcement |
| Balanced | Calm | Professional, structured, clear explanations |
| Focused | Direct | Concise, efficient, task-oriented |
| Tired | Gentle | Patient, supportive, simplified content |

### What to Avoid

- **Llama models** - 700M MAU license terminates at scale
- **GPT-4o fine-tuning** - Inference costs increase 32%
- **Self-hosting before 15K students** - Negative ROI
- **Bare DeepFace** - Unreliable with webcams
- **Specialized 7B education models** - Underperform general 70B by 10-20%
- **Single premium LLM** - No routing = 50-70% cost waste
- **AI as autonomous mental health assessor** - Must flag for human review

---

## Research-Validated Approaches

### Knowledge Tracing (Target: 92-94% AUC)

Optimal ensemble model:
- BKT (5%) + AKT (20%) + simpleKT (20%) + QIKT (25%) + DKT2 (30%)
- Plus: sparseKT noise filter for ADHD students

### Mental Health Detection

**Text Analysis:**
- RoBERTa + DeBERTa ensemble (99.6% accuracy)
- Target: <5% false positive rate

**Clinical Instruments (8-instrument suite):**
- PHQ-9 (Depression)
- GAD-7 (Anxiety)
- SCARED (Child anxiety)
- Conners-3 (ADHD)
- ACEs (Adverse childhood experiences)
- C-SSRS (Suicide risk)
- SDQ (Strengths and difficulties)
- ASRS (Adult ADHD self-report)

### Voice Synthesis (70% cost savings)

| Tier | Percentage | Provider |
|------|------------|----------|
| Premium | 10% | ElevenLabs |
| Standard | 40% | Fish Audio |
| Self-Hosted | 50% | Chatterbox (MIT) |

### Emotion Detection

- **Model:** ResNet-50 + CBAM (95.57% FER2013 accuracy)
- **Validation:** 3+ consecutive frames required
- **Fallback:** Override extreme negative emotions (>95% confidence) to neutral

---

## Platform Features

### 1. Emotional State System

**Daily Check-In:**
- Students select current emotional state (Excited, Happy, Balanced, Focused, Tired)
- Visual feedback with animated confirmation
- Persists across sessions

**Files:**
- `frontend/src/contexts/EmotionalStateContext.tsx`
- `frontend/src/app/(portal)/student/dashboard/components/EmotionalStateCard.tsx`

### 2. Dynamic XP Engine

**Streak Multipliers:**
| Streak Days | Multiplier |
|-------------|------------|
| 1-2 days | 1.0x |
| 3-6 days | 1.2x |
| 7-13 days | 1.5x |
| 14-29 days | 1.8x |
| 30+ days | 2.5x |

**Streak Break Penalty:**
- 50% XP reduction for 3 days after breaking a 7+ day streak

**Files:**
- `backend/app/services/xp_service.py`
- `backend/app/services/streak_service.py`

### 3. Brain Visualization

**Features:**
- SVG-based anatomically accurate brain rendering
- 6 brain regions: Frontal, Parietal, Temporal, Occipital, Cerebellum, Brain Stem
- Interactive tooltips showing region functions
- Animated pulsing effects based on activity
- Games-to-brain-region mapping

**Files:**
- `frontend/src/app/(portal)/student/brain-gym/components/BrainVisualization.tsx`

### 4. Mental Health Signal Detection

**Signal Categories:**
- CRISIS (immediate 988 integration)
- ANXIETY
- DEPRESSION
- STRESS
- DISENGAGEMENT
- FRUSTRATION
- FATIGUE
- RESILIENCE (positive)
- GROWTH (positive)

**Detection Methods:**
- Crisis keyword detection (suicide, self-harm)
- Depression/anxiety indicator analysis
- Facial emotion history analysis
- Engagement pattern analysis
- Time-of-day pattern analysis (late-night study detection)

**Files:**
- `backend/app/services/mental_health_signal_detection_service.py`

### 5. Deep Student Profile Engine

**Data Sources (14 aggregated):**
- Behavioral patterns (response times, speed-accuracy trade-offs)
- Engagement trajectories (flow state detection)
- Learning behavior classification (hint-seeking, error recovery)
- Confidence calibration / metacognition
- Retention profiles for spaced repetition
- Mental health insights integration
- Growth analytics (skill velocity, mastery estimation)

**Files:**
- `backend/app/services/deep_student_profile_service.py`

---

## Development

### Commands

#### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check
npm run test         # Run unit tests
npm run test:coverage # Run tests with coverage
```

#### Backend
```bash
cd backend
pip install -r requirements.txt              # Install dependencies
uvicorn app.main:app --reload               # Start dev server (http://localhost:8000)
python -c "from app.main import app"        # Validate imports
pytest tests/ -v                            # Run all tests
pytest tests/ --cov=app --cov-report=html   # Tests with coverage
```

### Code Quality Standards

1. **No emojis in code** - Use plain ASCII text only
2. **Standard Python logging** - Always use `logging.getLogger(__name__)`
3. **TypeScript strict mode** - No `any` types (currently 0)
4. **ESLint compliance** - 0 errors required
5. **Pre-commit validation** - Run `python -c "from app.main import app"` before commits

### Import Patterns

```python
# Logging - ALWAYS use this pattern
import logging
logger = logging.getLogger(__name__)

# Database session
from app.database import get_db

# Models
from app.models.user import User

# Services
from app.services.some_service import SomeService

# Authentication
from app.core.auth import get_current_user
```

### Development Workflow

1. **Before Starting**
   - Pull latest changes from main branch
   - Check for new migrations in `/backend/migrations/`
   - Ensure environment variables are up to date

2. **During Development**
   - Run linter frequently to catch issues early
   - Test API changes using FastAPI docs
   - Check browser console for frontend errors

3. **Before Committing**
   - Run `npm run lint` in frontend
   - Run `npx tsc --noEmit` for type checking
   - Run `python -c "from app.main import app"` for backend
   - Test critical user flows manually

---

## Testing

### Frontend Testing

```bash
cd frontend

# Unit tests with Vitest
npm run test              # Watch mode
npm run test:run          # Single run
npm run test:coverage     # With coverage report

# E2E tests with Playwright
npx playwright test       # Run all E2E tests
npx playwright test --ui  # Interactive UI mode
```

**Test Suites:**
- 446 unit tests across 26 files
- 550+ E2E tests covering all portals

### Backend Testing

```bash
cd backend

# Run all tests (877 total)
pytest tests/ -v --tb=short

# Unit tests (341 tests)
pytest tests/unit/ -v

# Integration tests (16 tests)
pytest tests/integration/ -v

# Regression tests (21 tests) - Run before deployment
pytest tests/regression/ -m regression -v

# With coverage
pytest tests/ --cov=app --cov-report=term-missing
```

**Key Test Files:**
| Suite | File | Tests | Coverage |
|-------|------|-------|----------|
| Unit | `tests/unit/test_auth.py` | 15 | JWT, password, RBAC |
| Unit | `tests/unit/test_xp_service.py` | 9 | XP, streaks, achievements |
| Unit | `tests/unit/test_streak_service.py` | 19 | Streak tracking, milestones |
| Unit | `tests/unit/test_emotion_learning_service.py` | 37 | Emotion calibration |
| Unit | `tests/unit/test_leaderboard_service.py` | 23 | Privacy, rankings |
| Unit | `tests/unit/test_crisis_response_service.py` | 46 | 988 integration, escalation |
| Integration | `tests/integration/test_emotion_learning_flow.py` | 16 | Emotion service E2E |
| Regression | `tests/regression/test_critical_paths.py` | 21 | Critical imports |

### Load Testing

```bash
cd backend/load_tests

# Smoke test (verify system works)
k6 run smoke_test.js

# Load test (normal traffic)
k6 run load_test.js

# Stress test (find breaking point)
k6 run stress_test.js

# Spike test (sudden traffic)
k6 run spike_test.js

# Soak test (extended duration)
k6 run soak_test.js
```

**Performance Targets:**
- 50K concurrent users
- P95 latency < 200ms

---

## Security and Compliance

### Authentication

- **JWT Tokens** - 60-minute expiration
- **Token Rotation** - Refresh tokens with rotation
- **Device Fingerprinting** - Session validation
- **Account Lockout** - After failed attempts
- **Token Blacklisting** - For logout and rotation

### Input Validation

- Pydantic validators for all API inputs
- Request size limits
- SQL injection scanning
- Path traversal detection

### GDPR Compliance

- **Data Export** - `/api/gdpr/export/me`
- **Data Deletion** - `/api/gdpr/delete/me`
- **Consent Management** - 7 consent endpoints
- **Data Retention Policies** - Automated enforcement

### FERPA Compliance

- **Parental Consent Workflow** - For mental health monitoring
- **PII Audit Trails** - All access logged
- **Crisis Response Integration** - 988 Suicide Prevention Lifeline

### Security Scanning

- npm audit in CI pipeline (blocks high/critical)
- pip-audit for Python dependencies
- Dependabot for automated updates

---

## Quality Metrics

### Current Status (January 2026)

| Metric | Status |
|--------|--------|
| Six Sigma Level | 5.90 (CERTIFIED) |
| TypeScript Errors | 0 |
| ESLint Errors | 0 |
| `any` Type Usage | 0 |
| Bare Exceptions | 0 |
| Console.log Count | 0 active |
| High Complexity Functions | 0 |
| Service Docstrings | 93/93 (100%) |
| Frontend Tests | 446 tests |
| Backend Tests | 877 tests |
| E2E Tests | 550+ tests |

### Quality Gates (CI/CD)

1. **Backend Quality** - Ruff linting, import validation
2. **Frontend Quality** - TypeScript, ESLint, build
3. **Backend Tests** - pytest with coverage minimum
4. **Frontend Tests** - Vitest
5. **Security Scan** - npm audit, pip-audit
6. **Quality Gate Summary** - All must pass

---

## Deployment

### Frontend (Vercel)

The frontend is optimized for Vercel deployment:

```bash
cd frontend
npm run build
# Deploy via Vercel CLI or GitHub integration
```

### Backend (Render)

The backend is optimized for Render deployment:

```bash
cd backend
# Ensure requirements.txt is up to date
# Configure environment variables in Render dashboard
# Deploy via GitHub integration
```

### Environment Variables

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

**Backend (.env):**
```
DATABASE_URL=postgresql://user:pass@host:5432/db
SECRET_KEY=your-secure-key-at-least-32-chars
GROQ_API_KEY=your-groq-key
REDIS_URL=redis://host:6379
```

### Database Migrations

```bash
cd backend/migrations
python runner.py  # Run all pending migrations
```

---

## Contributing

1. Review [CLAUDE.md](CLAUDE.md) for detailed development guidelines
2. Follow the code quality standards
3. Run all tests before submitting PRs
4. Ensure CI/CD pipeline passes

---

## Support

- Review [CLAUDE.md](CLAUDE.md) for development guidelines
- Check API docs at http://localhost:8000/docs when running
- Backend documentation in `/backend/docs/`
- Report issues at the project repository

---

## License

This project is proprietary software. All rights reserved.

---

**Built with care for students who learn differently.**
