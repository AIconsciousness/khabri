# Complete News Website - Full Stack Project Documentation

## Project Overview
Build a **professional news publishing platform** similar to ABP News, BBC News with modern features, ad revenue system, and premium subscription model.

---

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API / Zustand
- **Image Optimization**: Next.js Image component
- **SEO**: next-seo, metadata API
- **Analytics**: Google Analytics 4

### Backend
- **Framework**: Next.js API Routes / Node.js + Express
- **Database**: PostgreSQL (primary) + Redis (caching)
- **ORM**: Prisma
- **Authentication**: NextAuth.js (JWT + Session)
- **File Storage**: AWS S3 / Cloudinary
- **Payment**: Razorpay / Stripe
- **Email**: Resend / SendGrid

### DevOps
- **Hosting**: Vercel (Frontend) / Railway (Backend)
- **CDN**: Cloudflare
- **Monitoring**: Sentry

---

## Core Features

### 1. User-Facing Features

#### A. Homepage
- **Hero Section**: Breaking news carousel (auto-slide)
- **Category Wise News Grid**: Politics, Sports, Entertainment, Technology, Business
- **Trending News Sidebar**: Most viewed in last 24 hours
- **Video News Section**: Embedded YouTube/video player
- **Live News Ticker**: Top of page, real-time updates
- **Ad Slots**: Header banner (728x90), sidebar (300x250), in-feed native ads
- **Newsletter Signup**: Email capture form
- **Infinite Scroll**: Load more news on scroll

#### B. News Article Page
- **Rich Text Content**: Formatted article with images, videos, quotes
- **Author Info**: Name, photo, bio, social links
- **Publish Date & Last Updated**: Timestamp
- **Reading Time**: Estimated minutes
- **Social Sharing**: WhatsApp, Facebook, Twitter, LinkedIn, Copy Link
- **Related Articles**: AI/tag-based recommendations (4-6 articles)
- **Comments Section**: Threaded comments (logged-in users)
- **Ad Placements**: 
  - Top banner (728x90)
  - Mid-article (native ad)
  - Sidebar (300x600)
  - Bottom (728x90)
- **Tags & Categories**: Clickable navigation
- **Breadcrumbs**: Navigation trail
- **Table of Contents**: For long articles (jump links)
- **Premium Badge**: If article is premium content

#### C. Category Pages
- **News Filtering**: By category, date, popularity
- **Pagination**: 20 articles per page
- **Grid/List View Toggle**
- **Ad Slots**: After every 5 articles

#### D. Search Functionality
- **Full-Text Search**: Elasticsearch or PostgreSQL full-text
- **Filters**: Category, date range, author
- **Autocomplete**: Suggested searches
- **Recent Searches**: For logged-in users

#### E. User Authentication
- **Registration**: Email/password, Google OAuth, Facebook Login
- **Login/Logout**
- **Profile Page**: Edit name, photo, bio, password
- **Bookmarks**: Save articles for later
- **Reading History**: Last 50 articles viewed
- **Comment History**: View own comments

#### F. Premium Subscription
- **Free Tier**: 5 premium articles/month
- **Premium Plans**:
  - Monthly: ₹99/month
  - Yearly: ₹999/year (2 months free)
- **Payment Gateway**: Razorpay integration
- **Subscription Management**: Cancel, upgrade, invoice download
- **Premium Content Badge**: On articles and listings

#### G. Responsive Design
- **Mobile First**: Optimized for phones (90% traffic)
- **Tablet Layout**: Adjusted grid
- **Desktop**: Full-featured experience
- **PWA**: Installable, offline reading (cached articles)

---

### 2. Admin Panel (CMS)

#### A. Dashboard
- **Analytics Overview**:
  - Total articles published
  - Today's views, weekly views, monthly views
  - Revenue: Ads + Subscriptions
  - Active subscribers count
  - Top performing articles (last 7 days)
- **Charts**: Line graph (traffic), pie chart (category distribution)

#### B. Article Management
- **Create Article**:
  - Rich Text Editor (TinyMCE / Tiptap)
  - Title (SEO optimized)
  - Slug (auto-generated, editable)
  - Featured Image upload (crop tool)
  - Category selection (dropdown)
  - Tags (multi-select or create new)
  - Author assignment
  - Publish Status: Draft / Scheduled / Published
  - Premium toggle (yes/no)
  - Meta Description (SEO)
  - Meta Keywords
  - Canonical URL
- **Edit Article**: Full CRUD operations
- **Bulk Actions**: Publish, unpublish, delete multiple
- **Article List View**:
  - Filter: Status, category, author, date
  - Sort: Date, views, comments
  - Search by title
  - Pagination

#### C. Category Management
- **Create/Edit/Delete** categories
- **Category Icon**: Upload custom icon
- **Display Order**: Drag & drop reordering
- **SEO Settings**: Meta title, description per category

#### D. User Management
- **User List**: All registered users
- **Filter**: Free users, premium subscribers, authors, admins
- **Actions**: Ban/unban, delete, promote to author
- **User Details**: Registration date, subscription status, activity

#### E. Comments Moderation
- **Pending Comments**: Approve/reject queue
- **Flagged Comments**: User-reported comments
- **Bulk Actions**: Approve, delete, ban user

#### F. Ads Management
- **Ad Slot Configuration**:
  - Header banner (728x90)
  - Sidebar (300x250, 300x600)
  - In-feed native ads
  - Popup/interstitial
- **Ad Networks**: Google AdSense, direct ad code input
- **A/B Testing**: Show different ads to test performance
- **Ad Schedule**: Date range for campaigns

#### G. Subscription Management
- **Active Subscribers List**
- **Revenue Reports**: Daily, weekly, monthly
- **Refund Management**
- **Subscription Plans**: Edit pricing, features

#### H. Analytics & Reports
- **Traffic Analytics**:
  - Page views (daily, weekly, monthly)
  - Unique visitors
  - Bounce rate
  - Average session duration
  - Top referrers
- **Revenue Reports**:
  - Ad revenue (from AdSense API)
  - Subscription revenue
  - Total revenue breakdown
- **Content Analytics**:
  - Most viewed articles
  - Most commented articles
  - Category performance
  - Author performance

#### I. SEO Tools
- **Sitemap Generator**: Auto-generate XML sitemap
- **Robots.txt Editor**
- **Meta Tags Manager**: Global defaults
- **Schema Markup**: Auto-generate JSON-LD
- **Canonical URLs**: Automatic management

#### J. Settings
- **Site Settings**:
  - Site name, logo, favicon
  - Contact info, social links
  - Timezone
- **Email Settings**: SMTP configuration
- **Payment Settings**: Razorpay API keys
- **Security Settings**: Rate limiting, CORS

---

## Database Schema (Prisma)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User Model
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // Hashed
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  accounts      Account[]
  sessions      Session[]
  articles      Article[] @relation("AuthorArticles")
  comments      Comment[]
  bookmarks     Bookmark[]
  subscription  Subscription?
  readingHistory ReadingHistory[]
}

enum Role {
  USER
  AUTHOR
  ADMIN
}

// NextAuth Models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// Article Model
model Article {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String   @db.Text
  excerpt     String?  @db.Text
  featuredImage String?
  status      ArticleStatus @default(DRAFT)
  isPremium   Boolean  @default(false)
  views       Int      @default(0)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // SEO
  metaDescription String?
  metaKeywords    String?
  canonicalUrl    String?
  
  // Relations
  authorId    String
  author      User     @relation("AuthorArticles", fields: [authorId], references: [id])
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  tags        Tag[]    @relation("ArticleTags")
  comments    Comment[]
  bookmarks   Bookmark[]
  readingHistory ReadingHistory[]
  
  @@index([slug])
  @@index([publishedAt])
  @@index([categoryId])
}

enum ArticleStatus {
  DRAFT
  PUBLISHED
  SCHEDULED
  ARCHIVED
}

// Category Model
model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String?
  icon        String?
  displayOrder Int      @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // SEO
  metaTitle       String?
  metaDescription String?
  
  articles    Article[]
}

// Tag Model
model Tag {
  id        String    @id @default(cuid())
  name      String    @unique
  slug      String    @unique
  createdAt DateTime  @default(now())
  
  articles  Article[] @relation("ArticleTags")
}

// Comment Model
model Comment {
  id        String   @id @default(cuid())
  content   String   @db.Text
  status    CommentStatus @default(PENDING)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  articleId String
  article   Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  
  // Thread support
  parentId  String?
  parent    Comment? @relation("CommentThread", fields: [parentId], references: [id])
  replies   Comment[] @relation("CommentThread")
  
  @@index([articleId])
  @@index([userId])
}

enum CommentStatus {
  PENDING
  APPROVED
  REJECTED
}

// Bookmark Model
model Bookmark {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  articleId String
  article   Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  
  @@unique([userId, articleId])
}

// Reading History Model
model ReadingHistory {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  articleId String
  article   Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  
  @@unique([userId, articleId])
  @@index([userId, createdAt])
}

// Subscription Model
model Subscription {
  id              String   @id @default(cuid())
  status          SubscriptionStatus @default(INACTIVE)
  plan            SubscriptionPlan
  startDate       DateTime
  endDate         DateTime
  autoRenew       Boolean  @default(true)
  razorpayOrderId String?
  razorpayPaymentId String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId, status])
}

enum SubscriptionStatus {
  ACTIVE
  INACTIVE
  CANCELLED
  EXPIRED
}

enum SubscriptionPlan {
  MONTHLY
  YEARLY
}

// Newsletter Subscription
model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
}

// Ad Configuration
model AdSlot {
  id          String   @id @default(cuid())
  name        String   @unique
  position    String   // header, sidebar, infeed, popup
  size        String   // 728x90, 300x250, etc.
  adCode      String   @db.Text
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Analytics
model Analytics {
  id          String   @id @default(cuid())
  date        DateTime @default(now()) @db.Date
  pageViews   Int      @default(0)
  uniqueVisitors Int   @default(0)
  articleId   String?
  
  @@unique([date, articleId])
  @@index([date])
}
```

---

## API Endpoints

### Public APIs

#### Articles
- `GET /api/articles` - Get all published articles (paginated, filtered)
  - Query params: `page`, `limit`, `category`, `tag`, `sort`, `search`
- `GET /api/articles/[slug]` - Get single article by slug
- `GET /api/articles/trending` - Get trending articles (most viewed 24h)
- `GET /api/articles/related/[id]` - Get related articles

#### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/[slug]` - Get category with articles

#### Search
- `GET /api/search?q={query}` - Full-text search

#### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### Authenticated APIs

#### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/bookmarks` - Get bookmarked articles
- `POST /api/user/bookmarks` - Bookmark article
- `DELETE /api/user/bookmarks/[id]` - Remove bookmark
- `GET /api/user/history` - Get reading history

#### Comments
- `POST /api/comments` - Create comment
- `PUT /api/comments/[id]` - Edit comment
- `DELETE /api/comments/[id]` - Delete comment

#### Subscription
- `POST /api/subscription/create` - Create subscription order
- `POST /api/subscription/verify` - Verify payment
- `GET /api/subscription/status` - Check subscription status
- `POST /api/subscription/cancel` - Cancel subscription

### Admin APIs

#### Article Management
- `POST /api/admin/articles` - Create article
- `PUT /api/admin/articles/[id]` - Update article
- `DELETE /api/admin/articles/[id]` - Delete article
- `POST /api/admin/articles/[id]/publish` - Publish article

#### Category Management
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/[id]` - Update category
- `DELETE /api/admin/categories/[id]` - Delete category

#### User Management
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/[id]/role` - Update user role
- `DELETE /api/admin/users/[id]` - Delete user

#### Comments Moderation
- `GET /api/admin/comments/pending` - Get pending comments
- `PUT /api/admin/comments/[id]/approve` - Approve comment
- `PUT /api/admin/comments/[id]/reject` - Reject comment

#### Analytics
- `GET /api/admin/analytics/dashboard` - Dashboard stats
- `GET /api/admin/analytics/traffic` - Traffic data
- `GET /api/admin/analytics/revenue` - Revenue data

#### Ads
- `GET /api/admin/ads` - Get all ad slots
- `POST /api/admin/ads` - Create ad slot
- `PUT /api/admin/ads/[id]` - Update ad slot
- `DELETE /api/admin/ads/[id]` - Delete ad slot

---

## Frontend Structure

```
/app
  /(auth)
    /login
      page.tsx
    /register
      page.tsx
  /(main)
    /layout.tsx          # Main layout with header, footer
    /page.tsx            # Homepage
    /[category]/[slug]   # Article detail page
    /category/[slug]     # Category page
    /search              # Search results
    /about
    /contact
    /privacy-policy
    /terms-of-service
  /(user)
    /profile
    /bookmarks
    /history
    /subscription
  /(admin)
    /dashboard
    /articles
      /new
      /[id]/edit
    /categories
    /users
    /comments
    /ads
    /analytics
    /settings
  /api
    /auth/[...nextauth]
    /articles
    /categories
    /comments
    /subscription
    /admin
/components
  /ui                    # shadcn components
  /article
    ArticleCard.tsx
    ArticleGrid.tsx
    ArticleHero.tsx
    RelatedArticles.tsx
  /layout
    Header.tsx
    Footer.tsx
    Sidebar.tsx
    AdSlot.tsx
  /editor
    RichTextEditor.tsx
  /admin
    Dashboard.tsx
    AnalyticsChart.tsx
/lib
  /prisma.ts
  /auth.ts
  /utils.ts
  /redis.ts
/hooks
  useAuth.ts
  useArticles.ts
/styles
  globals.css
```

---

## Key Implementation Details

### 1. SEO Optimization

**Article Pages:**
```typescript
// app/[category]/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  
  return {
    title: article.title,
    description: article.metaDescription || article.excerpt,
    keywords: article.metaKeywords,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
      type: 'article',
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
    },
    alternates: {
      canonical: article.canonicalUrl || `https://yoursite.com/${article.slug}`,
    },
  };
}
```

**Structured Data (JSON-LD):**
```typescript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: article.title,
  image: article.featuredImage,
  datePublished: article.publishedAt,
  dateModified: article.updatedAt,
  author: {
    '@type': 'Person',
    name: article.author.name,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Your News Site',
    logo: {
      '@type': 'ImageObject',
      url: 'https://yoursite.com/logo.png',
    },
  },
  description: article.excerpt,
};
```

### 2. Caching Strategy (Redis)

```typescript
// lib/cache.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Cache trending articles (5 min)
export async function getTrendingArticles() {
  const cached = await redis.get('trending:articles');
  if (cached) return JSON.parse(cached);
  
  const articles = await prisma.article.findMany({
    where: { publishedAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
    orderBy: { views: 'desc' },
    take: 10,
  });
  
  await redis.setex('trending:articles', 300, JSON.stringify(articles));
  return articles;
}

// Cache individual article (10 min)
export async function getArticleBySlug(slug: string) {
  const cacheKey = `article:${slug}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  const article = await prisma.article.findUnique({ where: { slug } });
  await redis.setex(cacheKey, 600, JSON.stringify(article));
  return article;
}
```

### 3. Ad Integration

**Google AdSense:**
```typescript
// components/AdSlot.tsx
'use client';

import { useEffect } from 'react';

export default function AdSlot({ slot }: { slot: string }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Ad error:', err);
    }
  }, []);

  return (
    <div className="ad-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
```

### 4. Premium Content Gate

```typescript
// components/PremiumGate.tsx
'use client';

export default function PremiumGate({ article, user }) {
  const hasAccess = user?.subscription?.status === 'ACTIVE' || !article.isPremium;
  
  if (!hasAccess) {
    return (
      <div className="premium-gate">
        <h3>🔒 Premium Content</h3>
        <p>Subscribe to read this article</p>
        <Button href="/subscription">Subscribe Now</Button>
      </div>
    );
  }
  
  return <ArticleContent content={article.content} />;
}
```

### 5. Razorpay Payment Integration

```typescript
// app/api/subscription/create/route.ts
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const { plan } = await req.json(); // 'MONTHLY' or 'YEARLY'
  
  const amount = plan === 'MONTHLY' ? 9900 : 99900; // in paise
  
  const order = await razorpay.orders.create({
    amount,
    currency: 'INR',
    receipt: `sub_${Date.now()}`,
  });
  
  return Response.json({ orderId: order.id, amount });
}

// Verify payment
export async function POST(req: Request) {
  const { orderId, paymentId, signature } = await req.json();
  
  // Verify signature
  const isValid = verifyRazorpaySignature(orderId, paymentId, signature);
  
  if (isValid) {
    // Create/update subscription in DB
    await prisma.subscription.create({
      data: {
        userId: user.id,
        plan,
        status: 'ACTIVE',
        startDate: new Date(),
        endDate: new Date(Date.now() + (plan === 'MONTHLY' ? 30 : 365) * 24 * 60 * 60 * 1000),
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
      },
    });
  }
  
  return Response.json({ success: isValid });
}
```

### 6. Analytics Tracking

```typescript
// Track page view
export async function trackPageView(articleId: string) {
  const today = new Date().toISOString().split('T')[0];
  
  await prisma.analytics.upsert({
    where: {
      date_articleId: {
        date: new Date(today),
        articleId,
      },
    },
    update: {
      pageViews: { increment: 1 },
    },
    create: {
      date: new Date(today),
      articleId,
      pageViews: 1,
    },
  });
  
  // Increment article views
  await prisma.article.update({
    where: { id: articleId },
    data: { views: { increment: 1 } },
  });
}
```

### 7. Image Upload (Cloudinary)

```typescript
// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File) {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  
  const result = await cloudinary.uploader.upload(
    `data:${file.type};base64,${base64}`,
    {
      folder: 'news-articles',
      transformation: [
        { width: 1200, height: 630, crop: 'fill' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    }
  );
  
  return result.secure_url;
}
```

---

## Performance Optimization

### 1. Image Optimization
- Use Next.js `<Image>` component
- WebP format with fallback
- Lazy loading
- Responsive images

### 2. Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting (automatic in Next.js)

### 3. Database Optimization
- Indexes on frequently queried fields
- Connection pooling
- Query optimization with Prisma

### 4. CDN
- Static assets via Cloudflare CDN
- Edge caching for API responses

### 5. Lighthouse Score Targets
- Performance: 90+
- Accessibility: 95+
- SEO: 100
- Best Practices: 95+

---

## Security

### 1. Authentication
- JWT tokens with httpOnly cookies
- CSRF protection
- Rate limiting (10 req/min for auth endpoints)

### 2. API Security
- API key authentication for admin routes
- Input validation with Zod
- SQL injection prevention (Prisma)
- XSS protection (sanitize HTML content)

### 3. CORS Configuration
```typescript
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
};
```

---

## Deployment Checklist

### Environment Variables
```bash
# Database
DATABASE_URL="postgresql://..."
REDIS_URL="redis://..."

# Auth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://yoursite.com"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Payment
RAZORPAY_KEY_ID="..."
RAZORPAY_KEY_SECRET="..."

# Storage
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Email
RESEND_API_KEY="..."

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Ads
NEXT_PUBLIC_ADSENSE_ID="ca-pub-XXXXXXXXXX"
```

### Build Process
1. Run Prisma migrations: `npx prisma migrate deploy`
2. Generate Prisma client: `npx prisma generate`
3. Build Next.js: `npm run build`
4. Run production: `npm start`

### Post-Deployment
- Submit sitemap to Google Search Console
- Set up Google Analytics
- Configure AdSense
- Set up monitoring (Sentry)
- Enable CDN caching
- Test payment flow
- Load testing

---

## Monetization Strategy

### Ad Revenue (Primary)
- **Google AdSense**: Auto-optimized ads
- **Placements**: Header, sidebar, in-feed (every 5 articles), mid-article
- **Expected**: ₹0.50-2 per 1000 views (India traffic)
- **Target**: 1 lakh views/day = ₹1,500-6,000/day

### Premium Subscriptions (Secondary)
- **Conversion Rate**: 1-3% of free users
- **Monthly Plan**: ₹99 (target: 1000 subscribers = ₹99,000/month)
- **Yearly Plan**: ₹999 (better margins)

### Additional Revenue
- **Sponsored Content**: ₹5,000-20,000 per article
- **Newsletter Sponsorships**: ₹10,000-30,000 per edition
- **Affiliate Links**: In tech/product reviews

---

## Growth Strategy

### Traffic Acquisition
1. **SEO**: Target long-tail keywords (low competition)
2. **Social Media**: 
   - Facebook page (share articles)
   - Twitter/X (breaking news)
   - Instagram (visual stories)
   - WhatsApp groups
3. **Push Notifications**: Re-engage users
4. **Newsletter**: Weekly digest
5. **Google Discover**: Optimize for Discover feed

### Viral Content
- Trending topics immediate coverage
- Breaking news alerts
- Controversial opinions (but fact-checked)
- Video content (embedded YouTube)
- Infographics

### Retention
- Personalized recommendations
- Email notifications for favorite categories
- Push notifications for breaking news
- Comment engagement

---

## Launch Timeline

### Week 1-2: Core Setup
- Set up Next.js project
- Database schema + Prisma
- Authentication (NextAuth)
- Basic UI components

### Week 3-4: Article System
- Rich text editor
- Article CRUD
- Category management
- Tag system
- Image upload

### Week 5: User Features
- Article listing pages
- Article detail page
- Search functionality
- Comments system

### Week 6: Premium & Ads
- Razorpay integration
- Subscription management
- Ad slots integration
- Premium content gating

### Week 7: Admin Panel
- Dashboard with analytics
- User management
- Comment moderation
- Ad management

### Week 8: Polish & Launch
- SEO optimization
- Performance optimization
- Mobile responsiveness
- Testing
- Deployment

---

## Success Metrics (6 Months)

### Traffic
- Month 1: 10,000 views
- Month 3: 50,000 views
- Month 6: 2,00,000 views

### Revenue
- Month 1: ₹3,000-5,000
- Month 3: ₹20,000-30,000
- Month 6: ₹80,000-1,50,000

### Users
- Month 1: 500 registered users
- Month 3: 3,000 registered users
- Month 6: 15,000 registered users
- Premium: 100-300 subscribers by month 6

---

## Final Notes

This is a **production-ready** blueprint. Implementation should be iterative:

1. **MVP First** (Weeks 1-4): Basic article publishing + ads
2. **User Features** (Weeks 5-6): Authentication, comments, bookmarks
3. **Monetization** (Week 6): Premium subscriptions
4. **Scale** (Week 7-8): Admin panel, analytics, optimization

**Critical Success Factors:**
- Content quality & consistency (publish 10-20 articles daily)
- SEO optimization (rank for trending keywords)
- Fast loading (< 2 seconds)
- Mobile optimization (90% traffic is mobile in India)
- Viral social sharing

**Start building today! 🚀**
