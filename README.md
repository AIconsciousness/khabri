# Khabri - Professional News Publishing Platform

A full-stack news website similar to ABP News and BBC News, built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## Features

- 📰 **Article Management** - Rich text editor for creating and managing news articles
- 👥 **User Authentication** - NextAuth.js with email/password and Google OAuth
- 💳 **Premium Subscriptions** - Razorpay payment integration for premium content
- 📊 **Admin Dashboard** - Complete CMS with analytics and content moderation
- 🔍 **Search Functionality** - Full-text search across articles
- 💬 **Comments System** - Threaded comments with moderation
- 📱 **Responsive Design** - Mobile-first design with PWA support
- 🎯 **Ad Management** - Google AdSense and custom ad slots
- 📈 **Analytics** - Traffic and revenue tracking
- 🏷️ **Categories & Tags** - Organized content taxonomy

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Context / Hooks

### Backend
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL (via Prisma Postgres)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Caching**: Redis (optional)

### External Services
- **Payment**: Razorpay
- **Storage**: Cloudinary
- **Email**: Resend
- **Analytics**: Google Analytics 4

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or use Prisma Postgres)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd khabri
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Required environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)

4. **Set up the database**

   The project uses Prisma Postgres (local development database). To start it:
   ```bash
   npx prisma dev
   ```

   This will automatically:
   - Start a local PostgreSQL server
   - Create the database schema
   - Generate the Prisma Client

   Alternatively, if you have your own PostgreSQL database:
   ```bash
   # Run migrations
   npx prisma migrate dev --name init

   # Generate Prisma Client
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
khabri/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Auth routes (login, register)
│   ├── (main)/              # Main public routes
│   ├── (user)/              # User dashboard routes
│   ├── (admin)/             # Admin panel routes
│   ├── api/                 # API routes
│   │   ├── auth/           # NextAuth endpoints
│   │   ├── articles/       # Article APIs
│   │   ├── categories/     # Category APIs
│   │   └── ...
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/              # React components
│   ├── ui/                 # Reusable UI components
│   ├── article/            # Article-related components
│   ├── layout/             # Layout components
│   ├── editor/             # Rich text editor
│   └── admin/              # Admin panel components
├── lib/                     # Utility libraries
│   ├── prisma.ts           # Prisma client
│   ├── auth.ts             # NextAuth configuration
│   └── utils.ts            # Utility functions
├── hooks/                   # Custom React hooks
├── prisma/                  # Prisma schema and migrations
│   └── schema.prisma       # Database schema
├── public/                  # Static files
├── .env                     # Environment variables (not in git)
├── .env.example            # Environment variables template
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## Database Schema

The application uses a comprehensive schema including:
- Users (with roles: USER, AUTHOR, ADMIN)
- Articles (with status: DRAFT, PUBLISHED, SCHEDULED, ARCHIVED)
- Categories
- Tags
- Comments (with moderation)
- Bookmarks
- Reading History
- Subscriptions (MONTHLY, YEARLY)
- Newsletter
- Ad Slots
- Analytics

See `prisma/schema.prisma` for the complete schema.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma generate` - Generate Prisma Client

## Next Steps

### Phase 1: Core Features (Week 1-2)
- [ ] Create article CRUD operations
- [ ] Build admin dashboard layout
- [ ] Implement category management
- [ ] Set up image upload with Cloudinary

### Phase 2: User Features (Week 3-4)
- [ ] Complete authentication pages (login, register)
- [ ] Build article listing and detail pages
- [ ] Implement search functionality
- [ ] Add comments system

### Phase 3: Premium & Monetization (Week 5-6)
- [ ] Integrate Razorpay payments
- [ ] Build subscription management
- [ ] Implement premium content gating
- [ ] Set up ad slots and Google AdSense

### Phase 4: Admin & Analytics (Week 7-8)
- [ ] Build complete admin dashboard
- [ ] Add analytics and reporting
- [ ] Implement comment moderation
- [ ] Create user management interface

## Environment Configuration

### Development
The project is pre-configured with Prisma Postgres for local development. Simply run `npx prisma dev` to get started.

### Production
For production, update the following in `.env`:
1. Use a production PostgreSQL database URL
2. Set a secure `NEXTAUTH_SECRET`
3. Configure all third-party API keys
4. Set `NEXTAUTH_URL` to your production domain

## Contributing

This is a learning/portfolio project. Feel free to fork and customize for your needs.

## License

ISC

## Support

For issues and questions, please refer to the project documentation in `NEWS_WEBSITE_PROJECT.md`.

---

**Built with ❤️ using Next.js 14, TypeScript, and Prisma**
