# 🚀 Quick Start - Frontend Components

## Import Kaise Karein

```tsx
import {
  // UI Components
  Button,
  Card,
  Input,

  // Layout
  Header,
  Footer,
  BreakingNewsTicker,

  // Article Components
  ArticleCard,
  ArticleGrid,
  FeaturedArticle,
  CategoryCard,
} from '@/frontend/components';

// Hooks
import { useAuth } from '@/frontend/hooks';
```

---

## Component Examples

### Button
```tsx
<Button variant="primary" size="lg" onClick={() => alert('Clicked!')}>
  Click Me
</Button>
```

### Card
```tsx
<Card hover>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

### Input
```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
/>
```

### Article Grid
```tsx
const articles = [
  {
    id: 1,
    image: "/images/news-1.jpg",
    category: "TECH",
    title: "Article Title",
    excerpt: "Short description",
    author: "Author Name",
    readTime: "5 min",
    categorySlug: "technology"
  }
];

<ArticleGrid articles={articles} columns={3} />
```

---

## Page Template

```tsx
import { Header, Footer } from '@/frontend/components';

export default function MyPage() {
  return (
    <div>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Your content */}
      </main>

      <Footer />
    </div>
  );
}
```

---

## useAuth Hook

```tsx
'use client';

import { useAuth } from '@/frontend/hooks';

export default function Component() {
  const { isAuthenticated, isAdmin, user } = useAuth();

  if (!isAuthenticated) return <div>Please login</div>;

  return <div>Welcome {user?.name}</div>;
}
```

---

## File Locations

- **UI**: `frontend/components/ui/`
- **Layout**: `frontend/components/layout/`
- **Article**: `frontend/components/article/`
- **Hooks**: `frontend/hooks/`

---

## Development

```bash
npm run dev  # Start server
# Open: http://localhost:3000
```

---

**Happy Coding! 🎉**
