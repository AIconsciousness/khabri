# Frontend Structure

This folder contains frontend-specific code and will be populated as the project grows.

## Current Frontend Files (Located at Root for Next.js Compatibility)

### Pages & UI
- `app/` - All page components and layouts
  - `app/(auth)/` - Login, Register pages
  - `app/(main)/` - Public pages (Homepage, Categories, Search)
  - `app/(user)/` - User dashboard pages
  - `app/(admin)/` - Admin CMS pages
  - `app/layout.tsx` - Root layout
  - `app/page.tsx` - Homepage
  - `app/globals.css` - Global styles

### Static Assets
- `public/` - Images, fonts, icons, etc.
  - `public/images/news/` - News article images
  - `public/images/hero-banner.jpg` - Hero banner

## Future Frontend Code (Will be added here)

### Components
```
frontend/components/
├── ui/           # Base UI components (Button, Card, Input)
├── article/      # Article-related components
├── layout/       # Header, Footer, Sidebar
└── admin/        # Admin panel components
```

### Custom Hooks
```
frontend/hooks/
├── useAuth.ts
├── useArticles.ts
└── useDebounce.ts
```

### TypeScript Types
```
frontend/types/
├── article.ts
├── user.ts
└── common.ts
```

### Utilities
```
frontend/utils/
├── formatters.ts
├── validators.ts
└── helpers.ts
```

## Accessing Backend

Import backend utilities using path aliases:
```typescript
import { prisma } from '@/lib/prisma';  // → backend/lib/prisma.ts
import { authOptions } from '@/lib/auth';  // → backend/lib/auth.ts
```

---

**Note**: The `app/` and `public/` folders are at the root level due to Next.js requirements, but they contain frontend code. Think of them as part of the frontend architecture.
