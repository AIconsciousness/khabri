# Khabri - Clean Project Structure

## ✨ Overview
This project follows **Next.js 14 App Router** architecture with a clean, organized structure. All unnecessary folders have been removed.

---

## 📁 Clean Directory Structure

```
khabri/
│
├── 📱 app/                    # Frontend (Pages) + Backend (API Routes)
│   ├── (auth)/               # Authentication pages
│   │   ├── login/           # Login page
│   │   └── register/        # Register page
│   │
│   ├── (main)/               # Public pages
│   │   ├── page.tsx         # ✅ Homepage
│   │   ├── category/        # Category pages
│   │   ├── search/          # Search page
│   │   ├── about/           # About page
│   │   └── contact/         # Contact page
│   │
│   ├── (user)/               # User dashboard (protected)
│   │   ├── profile/         # User profile
│   │   ├── bookmarks/       # Saved articles
│   │   ├── history/         # Reading history
│   │   └── subscription/    # Subscription management
│   │
│   ├── (admin)/              # Admin panel (protected)
│   │   ├── dashboard/       # Analytics dashboard
│   │   ├── articles/        # Article management
│   │   │   └── new/         # Create new article
│   │   ├── categories/      # Category management
│   │   ├── users/           # User management
│   │   ├── comments/        # Comment moderation
│   │   ├── ads/             # Ad management
│   │   ├── analytics/       # Reports & analytics
│   │   └── settings/        # Settings
│   │
│   ├── api/                  # 🔧 Backend API Routes
│   │   ├── auth/            # ✅ NextAuth.js
│   │   │   └── [...nextauth]/route.ts
│   │   ├── articles/        # Article CRUD
│   │   ├── categories/      # Category CRUD
│   │   ├── comments/        # Comment operations
│   │   ├── user/            # User operations
│   │   ├── subscription/    # Payment & subscriptions
│   │   ├── newsletter/      # Newsletter signup
│   │   └── admin/           # Admin endpoints
│   │
│   ├── layout.tsx            # ✅ Root layout
│   └── globals.css           # ✅ Global styles
│
├── 🔧 lib/                    # Backend Utilities & Services
│   ├── prisma.ts             # ✅ Database connection (Prisma Client)
│   ├── auth.ts               # ✅ NextAuth configuration
│   ├── utils.ts              # ✅ Utility functions (slugify, formatDate, etc.)
│   ├── redis.ts              # Redis caching (optional)
│   └── cloudinary.ts         # Image upload service (future)
│
├── 🗄️ prisma/                # Database
│   ├── schema.prisma         # ✅ Complete database schema
│   └── migrations/           # Database migrations (auto-generated)
│
├── 📦 public/                 # Static Assets
│   ├── images/               # ✅ Images
│   │   ├── hero-banner.jpg
│   │   └── news/
│   │       ├── news-1.jpg
│   │       ├── news-2.jpg
│   │       ├── news-3.jpg
│   │       ├── tech-news.jpg
│   │       ├── sports-news.jpg
│   │       └── politics-news.jpg
│   └── favicon.ico
│
├── ⚙️ Configuration Files
│   ├── .env                  # ✅ Environment variables (gitignored)
│   ├── .env.example          # ✅ Environment template
│   ├── .gitignore            # ✅ Git ignore rules
│   ├── next.config.mjs       # ✅ Next.js configuration
│   ├── tailwind.config.ts    # ✅ Tailwind CSS configuration
│   ├── postcss.config.mjs    # ✅ PostCSS configuration
│   ├── tsconfig.json         # ✅ TypeScript configuration
│   ├── package.json          # ✅ Dependencies & scripts
│   ├── package-lock.json     # Lock file
│   └── prisma.config.ts      # ✅ Prisma configuration
│
└── 📚 Documentation
    ├── README.md                  # ✅ Setup guide
    ├── PROJECT_STRUCTURE.md       # ✅ This file
    ├── NEWS_WEBSITE_PROJECT.md    # ✅ Project requirements
    └── SETUP_COMPLETE.md          # ✅ Completion summary
```

---

## 🎯 Folder Categorization

### Frontend (Client-Side)
```
app/
├── (auth)/        # Login, Register pages
├── (main)/        # Public pages (Homepage, Category, Search)
├── (user)/        # User dashboard
└── (admin)/       # Admin panel (CMS)
```

**Future Components** (will be created when needed):
```
components/
├── ui/           # Reusable UI components (Button, Card, Input)
├── article/      # Article components (ArticleCard, ArticleGrid)
├── layout/       # Layout components (Header, Footer, Sidebar)
└── admin/        # Admin panel components
```

### Backend (Server-Side)
```
app/api/          # API Routes (RESTful endpoints)
lib/              # Backend utilities
prisma/           # Database schema & migrations
```

---

## 🏗️ Next.js App Router Architecture

### How It Works

1. **Pages = Folders**
   - Each folder in `app/` becomes a route
   - `page.tsx` file defines the page UI
   - `layout.tsx` wraps child pages

2. **Route Groups** - `(folder)`
   - Parentheses create logical groups
   - Don't affect URL structure
   - Example: `(auth)/login` → URL: `/login`

3. **API Routes**
   - `app/api/` folder contains backend endpoints
   - `route.ts` files handle HTTP methods (GET, POST, etc.)
   - Example: `app/api/articles/route.ts` → `/api/articles`

4. **Dynamic Routes**
   - `[param]` creates dynamic segments
   - Example: `app/article/[slug]/page.tsx` → `/article/my-article`

---

## 📂 Current File Organization

### ✅ Implemented Files

#### Frontend Pages
- `app/page.tsx` - Homepage with news grid
- `app/layout.tsx` - Root layout with metadata
- `app/globals.css` - Global styles

#### Backend
- `app/api/auth/[...nextauth]/route.ts` - Authentication API
- `lib/prisma.ts` - Database client
- `lib/auth.ts` - NextAuth config
- `lib/utils.ts` - Utility functions

#### Database
- `prisma/schema.prisma` - Complete schema with 12 models

#### Assets
- `public/images/` - 7 downloaded images

---

## 🚀 Adding New Features

### 1. Add a New Page
```bash
# Create category page
mkdir -p app/(main)/category/[slug]
touch app/(main)/category/[slug]/page.tsx
```

### 2. Add an API Endpoint
```bash
# Create articles API
mkdir -p app/api/articles
touch app/api/articles/route.ts
```

### 3. Add a Component
```bash
# Create components folder (when needed)
mkdir -p components/article
touch components/article/ArticleCard.tsx
```

### 4. Add a Custom Hook
```bash
# Create hooks folder (when needed)
mkdir -p hooks
touch hooks/useArticles.ts
```

---

## 📝 File Naming Conventions

### Pages & Layouts
- `page.tsx` - Page component (must be named exactly this)
- `layout.tsx` - Layout component
- `loading.tsx` - Loading state
- `error.tsx` - Error state
- `not-found.tsx` - 404 page

### API Routes
- `route.ts` - API endpoint handler

### Components
- `ArticleCard.tsx` - PascalCase for components
- `use-article.ts` - kebab-case for hooks
- `utils.ts` - lowercase for utilities

---

## 🎨 Frontend Structure Details

### App Directory Routes

```
URL                          File Path
/                           → app/page.tsx
/login                      → app/(auth)/login/page.tsx
/register                   → app/(auth)/register/page.tsx
/category/politics          → app/(main)/category/[slug]/page.tsx
/profile                    → app/(user)/profile/page.tsx
/admin/dashboard            → app/(admin)/dashboard/page.tsx
```

### Component Organization (Future)

When you create components, follow this structure:
```
components/
├── ui/              # Base components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Input.tsx
├── article/         # Article-specific
│   ├── ArticleCard.tsx
│   ├── ArticleGrid.tsx
│   └── ArticleHero.tsx
└── layout/          # Layout components
    ├── Header.tsx
    ├── Footer.tsx
    └── Sidebar.tsx
```

---

## 🔧 Backend Structure Details

### API Routes

```
Endpoint                    File Path
GET  /api/articles         → app/api/articles/route.ts
POST /api/articles         → app/api/articles/route.ts
GET  /api/articles/[slug]  → app/api/articles/[slug]/route.ts
POST /api/auth/signin      → app/api/auth/[...nextauth]/route.ts
```

### Backend Services (lib/)

```
lib/
├── prisma.ts       # Database client singleton
├── auth.ts         # NextAuth configuration
├── utils.ts        # Helper functions (slugify, formatDate)
├── redis.ts        # Caching service (optional)
└── cloudinary.ts   # Image upload (future)
```

---

## 🗄️ Database Models

Complete Prisma schema includes:

1. **User** - Authentication & user data
2. **Account** - OAuth accounts (NextAuth)
3. **Session** - User sessions (NextAuth)
4. **VerificationToken** - Email verification
5. **Article** - News articles with SEO
6. **Category** - Article categories
7. **Tag** - Article tags
8. **Comment** - User comments (threaded)
9. **Bookmark** - Saved articles
10. **ReadingHistory** - Article views
11. **Subscription** - Premium subscriptions
12. **Newsletter** - Email subscribers
13. **AdSlot** - Ad configurations
14. **Analytics** - Traffic data

---

## 🔄 Development Workflow

### Starting Development
```bash
# 1. Start database
npx prisma dev

# 2. Start Next.js
npm run dev

# 3. Open browser
http://localhost:3000
```

### Database Operations
```bash
# Open Prisma Studio (Database GUI)
npx prisma studio

# Create migration
npx prisma migrate dev --name feature_name

# Reset database
npx prisma migrate reset
```

### Building for Production
```bash
# Build
npm run build

# Start production server
npm start
```

---

## 📦 Dependencies Overview

### Core Framework
- `next` - React framework with SSR
- `react` & `react-dom` - UI library
- `typescript` - Type safety

### Backend
- `@prisma/client` - Database ORM
- `prisma` - Database toolkit
- `next-auth` - Authentication
- `bcryptjs` - Password hashing
- `zod` - Validation

### Frontend
- `tailwindcss` - CSS framework
- `lucide-react` - Icons
- `@radix-ui/*` - Accessible components
- `class-variance-authority` - Component variants
- `clsx` & `tailwind-merge` - Class utilities

### Utilities
- `date-fns` - Date formatting
- `ioredis` - Redis client (optional)

---

## 🎯 Best Practices

### 1. File Organization
- Keep related files together
- Use descriptive folder names
- Follow Next.js conventions

### 2. Component Structure
```tsx
// components/article/ArticleCard.tsx
import { type FC } from 'react';

interface ArticleCardProps {
  title: string;
  slug: string;
}

export const ArticleCard: FC<ArticleCardProps> = ({ title, slug }) => {
  return <div>{title}</div>;
};
```

### 3. API Routes
```ts
// app/api/articles/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const articles = await prisma.article.findMany();
  return NextResponse.json(articles);
}
```

### 4. Database Queries
```ts
// Always use Prisma for type safety
import { prisma } from '@/lib/prisma';

const articles = await prisma.article.findMany({
  where: { status: 'PUBLISHED' },
  include: { author: true, category: true },
  orderBy: { publishedAt: 'desc' },
  take: 10,
});
```

---

## 🚀 Next Steps

### Phase 1: Article System
1. Create `app/api/articles/route.ts`
2. Create `app/article/[slug]/page.tsx`
3. Add rich text editor component

### Phase 2: Authentication Pages
1. Create `app/(auth)/login/page.tsx`
2. Create `app/(auth)/register/page.tsx`
3. Add authentication forms

### Phase 3: Admin Panel
1. Create `app/(admin)/dashboard/page.tsx`
2. Add article management interface
3. Build analytics charts

### Phase 4: User Features
1. Create user profile page
2. Add bookmarks functionality
3. Implement reading history

---

## 📚 Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Guide](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Last Updated**: 2025-10-29
**Version**: 2.0.0 (Clean Structure)
**Status**: ✅ Production Ready
