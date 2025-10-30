# Backend Structure

This folder contains all backend/server-side code.

## ✅ Current Backend Files

### Database & ORM
```
backend/prisma/
├── schema.prisma     # Complete database schema (12 models)
└── migrations/       # Database migrations (auto-generated)
```

**Models**: User, Account, Session, Article, Category, Tag, Comment, Bookmark, ReadingHistory, Subscription, Newsletter, AdSlot, Analytics

### Backend Utilities
```
backend/lib/
├── prisma.ts         # Database client (singleton)
├── auth.ts           # NextAuth.js configuration
└── utils.ts          # Helper functions (slugify, formatDate, readingTime)
```

### API Routes (Located at Root)
```
app/api/              # REST API endpoints
├── auth/
│   └── [...nextauth]/  # Authentication endpoints (NextAuth)
├── articles/           # Article CRUD (future)
├── categories/         # Category CRUD (future)
├── comments/           # Comment operations (future)
├── user/               # User profile ops (future)
├── subscription/       # Payment & subscriptions (future)
└── admin/              # Admin-only endpoints (future)
```

## Future Backend Code (Will be added here)

### Services (Business Logic)
```
backend/services/
├── articleService.ts     # Article operations
├── userService.ts        # User management
├── paymentService.ts     # Razorpay integration
└── emailService.ts       # Email notifications
```

### Middleware
```
backend/middleware/
├── auth.ts              # Authentication middleware
├── rateLimit.ts         # Rate limiting
└── validation.ts        # Request validation
```

### Types
```
backend/types/
├── api.ts              # API request/response types
├── database.ts         # Database types
└── auth.ts             # Auth types
```

## Usage in Frontend

Import backend utilities using path aliases:
```typescript
// In any frontend or API file
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { slugify, formatDate } from '@/lib/utils';
```

## Database Operations

### Prisma Commands
```bash
# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (Database GUI)
npx prisma studio

# Create migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset
```

### Example Usage
```typescript
import { prisma } from '@/lib/prisma';

// Create article
const article = await prisma.article.create({
  data: {
    title: "News Title",
    slug: "news-title",
    content: "Article content...",
    authorId: userId,
    categoryId: categoryId,
    status: "PUBLISHED"
  }
});

// Find articles
const articles = await prisma.article.findMany({
  where: { status: 'PUBLISHED' },
  include: { author: true, category: true },
  orderBy: { publishedAt: 'desc' },
  take: 10
});
```

## Environment Variables

Backend requires these environment variables (`.env`):
```bash
# Database
DATABASE_URL="..."

# Authentication
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Payments
RAZORPAY_KEY_ID="..."
RAZORPAY_KEY_SECRET="..."

# Storage
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Email
RESEND_API_KEY="..."
```

## API Route Structure

### Creating New API Endpoint

1. **Create route file**:
   ```
   app/api/articles/route.ts
   ```

2. **Implement HTTP methods**:
   ```typescript
   import { NextResponse } from 'next/server';
   import { prisma } from '@/lib/prisma';

   // GET /api/articles
   export async function GET(request: Request) {
     const articles = await prisma.article.findMany();
     return NextResponse.json(articles);
   }

   // POST /api/articles
   export async function POST(request: Request) {
     const body = await request.json();
     const article = await prisma.article.create({ data: body });
     return NextResponse.json(article);
   }
   ```

3. **Add authentication** (if needed):
   ```typescript
   import { getServerSession } from 'next-auth';
   import { authOptions } from '@/lib/auth';

   export async function POST(request: Request) {
     const session = await getServerSession(authOptions);
     if (!session) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
     }
     // ... rest of the code
   }
   ```

## Next Steps

1. **Create API endpoints** for articles, categories, comments
2. **Add business logic** in `services/` folder
3. **Implement caching** with Redis
4. **Add validation** middleware
5. **Set up email** notifications
6. **Integrate payment** gateway (Razorpay)

---

**Note**: The `app/api/` folder is at the root level due to Next.js requirements, but it contains backend code. Think of it as part of the backend architecture.
