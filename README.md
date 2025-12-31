# 🎸 GuitArt - Modern Guitar Learning Platform

<div align="center">

![GuitArt Banner](https://img.shields.io/badge/GuitArt-Guitar%20Learning%20Platform-10b981?style=for-the-badge&logo=guitar&logoColor=white)

**A premium, modern web application for guitarists to learn, practice, and master their craft.**

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748?style=flat-square&logo=prisma)](https://www.prisma.io/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Deployment](#-deployment-guide) • [License](#-license)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Deployment Guide](#-deployment-guide)
- [Environment Variables](#-environment-variables)
- [Credits](#-credits)

---

## 🌟 Overview

**GuitArt** is a cutting-edge guitar learning platform designed with a premium "Apple Keynote" aesthetic. Built with Next.js 16, React, TypeScript, and Prisma, it combines modern web technologies with an intuitive UI/UX to provide guitarists with an immersive learning experience.

### Why GuitArt?

- **🎯 Interactive Practice Tools**: Focus mode, metronome, backing tracks
- **📚 Comprehensive Theory**: Scales, modes, chord progressions
- **🎵 Song Library**: Searchable collection with tabs and audio
- **📊 Progress Tracking**: Detailed practice statistics and goals
- **✨ Premium Design**: "Apple Keynote" inspired aesthetic with glassmorphism

---

## ✨ Features

### 🏠 **Landing Page**
- **Premium Glassmorphism Design** with smooth scroll animations
- **Flowing Menu** - GSAP-powered interactive navigation
- **Chroma Grid** - Showcasing legendary guitarists (Hendrix, Gilmour, Page, Mayer, etc.)
- **Hero Sections** with parallax effects and dynamic content
- **Fully Responsive** across all devices (mobile-first design)

### 📊 **Dashboard**
- **Real-time Practice Statistics** (daily, weekly, monthly)
- **Dynamic Greetings** based on time of day
- **Quick Actions**: Start Practice, Explore Theory, Browse Songs
- **Daily Goal Tracker** with visual progress bars
- **Recent Sessions Overview** with focus type and duration

### 🎸 **Practice Engine** (`/practice`)
- **Focus Mode** 
  - Distraction-free environment
  - Keyboard shortcuts (F11 to toggle)
  - Exit confirmation guard
- **Interactive Fretboard**
  - Visualize scales, modes, and patterns
  - Custom pattern overlays
  - Real-time note positions
- **Metronome** 
  - Adjustable BPM (40-240)
  - Visual beat indicator
  - Accent on downbeat
- **Backing Tracks Player**
  - Practice with accompaniment
  - Filter by genre
  - Favorite tracks
- **Session Tracking**
  - Automatic time logging
  - Focus type categorization
  - Historical session data
- **Song Integration**
  - Practice specific songs
  - Synced key and scale suggestions
  - Tab/sheet music links

### 📖 **Music Theory** (`/dashboard/theory`)
- **Scale Explanations**
  - Major, Minor, Pentatonic, Blues
  - Harmonic/Melodic Minor variants
- **Mode Breakdowns**
  - Ionian, Dorian, Phrygian, Lydian
  - Mixolydian, Aeolian, Locrian
- **Interactive Visualizations**
- **"Try on Fretboard" Integration**

### 🎵 **Song Library** (`/songs`)
- **Search & Filter** by title, artist, difficulty, genre
- **Difficulty Ratings**: Beginner, Intermediate, Advanced
- **Save/Unsave** songs to personal collection
- **Practice Integration**: Direct links to practice mode with song context
- **Metadata**: BPM, key, genre, tab/audio URLs

### 👤 **User Profile** (`/profile`)
- **Apple Music Inspired Aesthetic**
- **Editable User Information** (name, email)
- **Saved Songs Collection** with quick access
- **Favorite Backing Tracks** with player
- **Practice Statistics Overview**
  - Total practice time
  - Favorite scales/keys
  - Achievement milestones

### 🔐 **Authentication**
- **Email/Password Login** with validation
- **Google OAuth Integration** (NextAuth.js)
- **Secure Session Management**
- **Responsive Auth Pages** with staggered entrance animations
- **Clean, Minimalist Design** (no distracting icons)

---

## 🛠️ Tech Stack

### **Frontend**

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.10 | React framework with App Router & Turbopack |
| **React** | 18+ | UI library with hooks |
| **TypeScript** | 5+ | Type safety and developer experience |
| **Tailwind CSS** | 3+ | Utility-first CSS framework |
| **Framer Motion** | 11+ | Declarative animations & page transitions |
| **GSAP** | 3+ | Advanced landing page animations |

### **Backend & Database**

| Technology | Purpose |
|------------|---------|
| **Prisma** | Type-safe ORM for database management |
| **PostgreSQL** | Relational database (via Supabase) |
| **NextAuth.js** | Authentication & session management |

### **Infrastructure**

| Service | Purpose |
|---------|---------|
| **Vercel** | Hosting & Deployment (serverless) |
| **Supabase** | PostgreSQL database hosting (recommended) |
| **GitHub** | Version control & CI/CD integration |

### **Development Tools**

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control
- **npm** - Package management

---

## 📁 Project Structure

```
fe/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── login/page.tsx            # Login page
│   ├── signup/page.tsx           # Signup page
│   ├── dashboard/                # Dashboard & subpages
│   │   ├── page.tsx              # Main dashboard
│   │   └── theory/page.tsx       # Music theory section
│   ├── practice/page.tsx         # Practice engine (MAIN FEATURE)
│   ├── songs/                    # Song library
│   │   ├── page.tsx              # Song list
│   │   └── [id]/page.tsx         # Song detail
│   ├── profile/page.tsx          # User profile
│   └── api/                      # API routes
│       ├── auth/                 # NextAuth.js routes
│       │   ├── [...nextauth]/
│       │   └── signup/
│       ├── user/                 # User stats & profile
│       │   ├── stats/
│       │   └── profile/
│       ├── songs/                # Song CRUD
│       │   ├── route.ts
│       │   └── saved/
│       ├── backing-tracks/       # Backing track management
│       │   ├── route.ts
│       │   └── favorite/
│       ├── practice/sessions/    # Practice session logging
│       ├── favorites/            # Favorite scales/modes
│       └── seed/                 # Development seed data
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── GlassPanel.tsx        # Glassmorphism container
│   │   ├── FlowingMenu.tsx       # GSAP animated menu
│   │   ├── ChromaGrid.tsx        # Guitarist showcase grid
│   │   ├── ScrollFloat.tsx       # Scroll-based animations
│   │   └── AnimatedDropdown.tsx  # Dropdown with animations
│   ├── fretboard/                # Fretboard visualization
│   │   ├── Fretboard.tsx
│   │   └── ...
│   ├── metronome/                # Metronome component
│   ├── player/                   # Music player
│   └── ...
├── lib/
│   ├── db/
│   │   └── prisma.ts             # Prisma client
│   ├── auth.ts                   # NextAuth configuration
│   └── music/                    # Music theory utilities
│       ├── scales.ts             # Scale definitions
│       ├── fretboard.ts          # Fretboard mapping
│       └── patterns/             # Pattern logic
├── hooks/                        # Custom React hooks
│   ├── useUserStats.ts           # Fetch user statistics
│   ├── usePracticeTracker.ts     # Track practice sessions
│   ├── useSongs.ts               # Song data management
│   ├── useTuner.ts               # Guitar tuner hook
│   └── usePracticeGuard.ts       # Prevent accidental exit
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Database seeding script
├── public/                       # Static assets
│   └── guitarist/                # Guitarist images (Hendrix, Page, etc.)
├── tailwind.config.ts            # Tailwind configuration
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** database (Supabase recommended)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jayykioh/Guitar-Kit-Website.git
   cd Guitar-Kit-Website/fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `fe/` directory:
   
   ```env
   # Database (Supabase connection string)
   DATABASE_URL="postgresql://user:password@host:port/database?pgbouncer=true"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key-here-generate-with-openssl"
   
   # Google OAuth (optional but recommended)
   GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Initialize the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # (Optional) Seed with sample data
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment Guide

### ✅ **Prerequisites**

Before deploying, ensure you have:
- ✅ **PostgreSQL database** (Supabase recommended)
- ✅ **GitHub repository** with your code pushed
- ✅ **Vercel account** (free tier available)
- ✅ **Google OAuth credentials** (if using Google login)

---

### 📦 **Deployment to Vercel (Recommended)**

Vercel is the easiest and most optimized platform for Next.js applications, offering:
- ⚡ **Instant deployment** from GitHub
- 🔄 **Automatic builds** on every push
- 🌍 **Global CDN** for fast loading
- 📊 **Built-in analytics** and monitoring

---

#### **Step 1: Set Up Supabase Database**

1. **Create a Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization, name, region, and password

2. **Get the connection string**
   - In your Supabase dashboard, go to **Settings** → **Database**
   - Copy the **Connection Pooling** string (for production)
   - It looks like: `postgresql://postgres.xxx:[PASSWORD]@aws-xxx.pooler.supabase.com:5432/postgres`

3. **Configure Supabase for Prisma**
   - Add `?pgbouncer=true` to the end of your connection string
   - Example: `postgresql://postgres.xxx:[PASSWORD]@aws-xxx.pooler.supabase.com:5432/postgres?pgbouncer=true`

---

#### **Step 2: Push Code to GitHub**

```bash
# If not already done
git add .
git commit -m "Ready for production deployment"
git push origin main
```

✅ **Your code is already pushed** (commit: `sprint 4 : done ready to v1 production ; )`)

---

#### **Step 3: Deploy to Vercel**

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click **"Add New"** → **"Project"**

2. **Import GitHub Repository**
   - Click **"Import Git Repository"**
   - Select: `jayykioh/Guitar-Kit-Website`
   - If not visible, click "Adjust GitHub App Permissions"

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `fe/` ⚠️ **IMPORTANT: Set this to `fe/`**
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables**
   
   Click **"Environment Variables"** and add:
   
   | Name | Value | Description |
   |------|-------|-------------|
   | `DATABASE_URL` | Your Supabase connection string | PostgreSQL connection (with `?pgbouncer=true`) |
   | `NEXTAUTH_URL` | `https://your-app.vercel.app` | Your Vercel deployment URL |
   | `NEXTAUTH_SECRET` | Generate with: `openssl rand -base64 32` | Session encryption secret |
   | `GOOGLE_CLIENT_ID` | From Google Cloud Console | Google OAuth Client ID |
   | `GOOGLE_CLIENT_SECRET` | From Google Cloud Console | Google OAuth Client Secret |
   
   > **Tip:** To generate `NEXTAUTH_SECRET`:
   > ```bash
   > openssl rand -base64 32
   > # Or use online generator: https://generate-secret.now.sh/32
   > ```

5. **Deploy**
   - Click **"Deploy"**
   - Vercel will:
     1. Clone your repository
     2. Install dependencies
     3. Run build (`npm run build`)
     4. Deploy to production
   - ⏱️ **Build time**: ~2-3 minutes

6. **Wait for Deployment**
   - Watch the build logs in real-time
   - ✅ **Success**: You'll see "Your project has been deployed"
   - Your app will be live at: `https://your-app.vercel.app`

---

#### **Step 4: Initialize Production Database**

After **first deployment**, you need to sync your database schema:

1. **Option A: Use Vercel Terminal** (recommended)
   - Go to your Vercel project → **Settings** → **Functions**
   - Open a terminal/console
   - Run:
     ```bash
     npx prisma db push
     ```

2. **Option B: Run Locally** (with production DATABASE_URL)
   ```bash
   # Temporarily set production DATABASE_URL in terminal
   DATABASE_URL="your-production-connection-string" npx prisma db push
   ```

3. **Verify Database**
   - Go to Supabase dashboard → **Table Editor**
   - You should see tables: `User`, `Song`, `PracticeSession`, etc.

---

#### **Step 5: Configure Google OAuth** (If using Google Login)

1. **Go to Google Cloud Console**
   - Visit [console.cloud.google.com](https://console.cloud.google.com)
   - Select your project (or create new)

2. **Configure OAuth Consent Screen**
   - Navigate to: **APIs & Services** → **OAuth consent screen**
   - Add your Vercel domain to **Authorized domains**

3. **Update Authorized Redirect URIs**
   - Navigate to: **Credentials** → Your OAuth 2.0 Client ID
   - Add to **Authorized redirect URIs**:
     ```
     https://your-app.vercel.app/api/auth/callback/google
     ```
   - Click **Save**

4. **Test Google Login**
   - Visit your deployed app
   - Click "Continue with Google"
   - Verify login works

---

#### **Step 6: Custom Domain (Optional)**

1. **Go to Vercel Project Settings** → **Domains**
2. **Add your domain** (e.g., `guitart.com`)
3. **Update DNS records** with your domain provider
4. **Update Environment Variables**:
   - Change `NEXTAUTH_URL` to `https://guitart.com`
   - Update Google OAuth redirect URIs

---

### 🔄 **Continuous Deployment**

Vercel automatically deploys on every `git push`:
- **Main branch** → Production deployment
- **Other branches** → Preview deployments
- **Pull requests** → Automatic preview URLs

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically deploys in ~2 minutes
```

---

### 🐛 **Troubleshooting**

#### Build Fails

```bash
# Check build logs in Vercel dashboard
# Common issues:
# 1. Missing environment variables
# 2. Root directory not set to "fe/"
# 3. DATABASE_URL incorrect format
```

#### Database Connection Errors

```
Error: Can't reach database server
```

**Solution:**
- Verify `DATABASE_URL` has `?pgbouncer=true`
- Check Supabase project is active (not paused)
- Ensure IP restrictions are disabled (or add Vercel IPs)

#### Google OAuth Fails

```
Error: redirect_uri_mismatch
```

**Solution:**
- Add exact Vercel URL to Google Cloud Console
- Format: `https://your-app.vercel.app/api/auth/callback/google`
- No trailing slash

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db?pgbouncer=true` |
| `NEXTAUTH_URL` | Base URL of your app | `https://guitart.vercel.app` |
| `NEXTAUTH_SECRET` | Secret for session encryption | Generated via `openssl rand -base64 32` |

### Optional Variables

| Variable | Description | When to use |
|----------|-------------|-------------|
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | If enabling Google login |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | If enabling Google login |

### How to Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Enable **Google+ API**
4. Navigate to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-app.vercel.app/api/auth/callback/google`
7. Copy **Client ID** and **Client Secret**

---

## 📊 Database Schema

<details>
<summary><b>Click to view Prisma schema</b></summary>

```prisma
model User {
  id               String            @id @default(cuid())
  email            String            @unique
  name             String?
  emailVerified    DateTime?
  image            String?
  password         String?

  accounts         Account[]
  favorites        Favorite[]
  practiceSessions PracticeSession[]
  savedSongs       SavedSong[]
  savedBackingTracks SavedBackingTrack[]

  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
}

model PracticeSession {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  duration  Int      // Minutes
  focusType String   // "SCALES", "SONGS", "TECHNIQUE", "FREE"
  songId    String?
  song      Song?    @relation(fields: [songId], references: [id])
  notes     String?
  createdAt DateTime @default(now())
}

model Song {
  id            String   @id @default(cuid())
  title         String
  artist        String
  difficulty    String?  // "Beginner", "Intermediate", "Advanced"
  genre         String?
  key           String?
  bpm           Int?
  audioUrl      String?
  tabUrl        String?

  backingTracks    BackingTrack[]
  savedBy          SavedSong[]
  practiceSessions PracticeSession[]
}

model SavedSong {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  songId    String
  song      Song     @relation(fields: [songId], references: [id])
  
  @@unique([userId, songId])
}

model BackingTrack {
  id        String   @id @default(cuid())
  songId    String?
  song      Song?    @relation(fields: [songId], references: [id])
  name      String
  bpm       Int?
  genre     String?
  key       String?
  audioUrl  String

  favoritedBy SavedBackingTrack[]
}

model SavedBackingTrack {
  id              String       @id @default(cuid())
  userId          String
  user            User         @relation(fields: [userId], references: [id])
  backingTrackId  String
  backingTrack    BackingTrack @relation(fields: [backingTrackId], references: [id])
  
  @@unique([userId, backingTrackId])
}
```

</details>

---

## 🎨 Design Philosophy

GuitArt follows an **"Apple Keynote"** design aesthetic:

- **Minimalism**: Clean layouts, ample whitespace, focus on content
- **Glassmorphism**: Frosted glass panels with backdrop blur
- **Premium Animations**: Smooth, purposeful motion (Framer Motion, GSAP)
- **Dark Mode First**: Optimized for extended practice sessions
- **Responsive**: Seamless experience across desktop, tablet, mobile
- **Accessibility**: Keyboard shortcuts, high contrast, semantic HTML

---

## 🧪 Testing

### Local Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

### Production Checklist

- [ ] ✅ Build succeeds (`npm run build`)
- [ ] ✅ TypeScript compiles (`npx tsc --noEmit`)
- [ ] ✅ Database migrations run (`npx prisma db push`)
- [ ] ✅ Environment variables configured
- [ ] ✅ Google OAuth redirect URIs updated
- [ ] ✅ NEXTAUTH_URL matches deployment URL
- [ ] ✅ Test login/signup flows
- [ ] ✅ Test practice session tracking
- [ ] ✅ Test song save/unsave
- [ ] ✅ Test backing track favorites

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Credits

**Created by**: Doan Luc  
**GitHub**: [@jayykioh](https://github.com/jayykioh)  
**Repository**: [Guitar-Kit-Website](https://github.com/jayykioh/Guitar-Kit-Website)  
**Year**: 2024-2025  

### Special Thanks

- **Next.js Team** - For the amazing framework
- **Vercel** - For seamless deployment
- **Supabase** - For PostgreSQL hosting
- **Framer Motion** - For smooth animations
- **GSAP** - For advanced animations
- **Prisma** - For type-safe database access

---

## 📞 Support

For issues, questions, or feature requests:
- 🐛 **Open an issue**: [GitHub Issues](https://github.com/jayykioh/Guitar-Kit-Website/issues)
- 📧 **Email**: doanluc@example.com
- 💬 **Discussions**: [GitHub Discussions](https://github.com/jayykioh/Guitar-Kit-Website/discussions)

---

<div align="center">

**Made with ❤️ and 🎸 by Doan Luc**

[![GitHub stars](https://img.shields.io/github/stars/jayykioh/Guitar-Kit-Website?style=social)](https://github.com/jayykioh/Guitar-Kit-Website)
[![GitHub forks](https://img.shields.io/github/forks/jayykioh/Guitar-Kit-Website?style=social)](https://github.com/jayykioh/Guitar-Kit-Website/fork)

**⭐ Star this repo if you find it helpful!**

</div>
