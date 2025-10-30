import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer, ArticleCard } from '@/frontend/components';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const categoryData: Record<string, { name: string; image: string; description: string }> = {
  politics: {
    name: 'Politics',
    image: '/images/politics-banner.jpg',
    description: 'Stay updated with the latest political news, government policies, and elections coverage.',
  },
  business: {
    name: 'Business',
    image: '/images/business-banner.jpg',
    description: 'Get insights on markets, economy, startups, and business trends from around the world.',
  },
  technology: {
    name: 'Technology',
    image: '/images/technology-banner.jpg',
    description: 'Discover the latest in tech innovation, gadgets, AI, and digital transformation.',
  },
  sports: {
    name: 'Sports',
    image: '/images/sports-banner.jpg',
    description: 'Follow live scores, match updates, and breaking news from the world of sports.',
  },
  entertainment: {
    name: 'Entertainment',
    image: '/images/entertainment-banner.jpg',
    description: 'Catch up on movies, music, celebrities, and the latest entertainment buzz.',
  },
  world: {
    name: 'World',
    image: '/images/world-banner.jpg',
    description: 'Global news coverage from every corner of the world, bringing you closer to international events.',
  },
  health: {
    name: 'Health',
    image: '/images/health-banner.jpg',
    description: 'Health tips, medical breakthroughs, and wellness advice to keep you informed and healthy.',
  },
};

// Sample articles for demonstration
const sampleArticles = [
  {
    id: 1,
    image: '/images/news/news-1.jpg',
    category: 'Featured',
    title: 'Breaking: Major Development in Industry',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    author: 'John Doe',
    readTime: '5 min read',
    categorySlug: 'business',
  },
  {
    id: 2,
    image: '/images/news/news-2.jpg',
    category: 'Trending',
    title: 'Expert Analysis on Recent Events',
    excerpt: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
    author: 'Jane Smith',
    readTime: '4 min read',
    categorySlug: 'politics',
  },
  {
    id: 3,
    image: '/images/news/news-3.jpg',
    category: 'Popular',
    title: 'What You Need to Know Today',
    excerpt: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
    author: 'Mike Johnson',
    readTime: '6 min read',
    categorySlug: 'technology',
  },
  {
    id: 4,
    image: '/images/tech-news.jpg',
    category: 'Latest',
    title: 'Industry Leaders Share Insights',
    excerpt: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.',
    author: 'Sarah Williams',
    readTime: '7 min read',
    categorySlug: 'business',
  },
  {
    id: 5,
    image: '/images/sports-news.jpg',
    category: 'Update',
    title: 'Comprehensive Coverage of Today\'s Events',
    excerpt: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.',
    author: 'Tom Anderson',
    readTime: '5 min read',
    categorySlug: 'sports',
  },
  {
    id: 6,
    image: '/images/politics-news.jpg',
    category: 'Analysis',
    title: 'Deep Dive into Current Affairs',
    excerpt: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
    author: 'Emily Davis',
    readTime: '8 min read',
    categorySlug: 'politics',
  },
];

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categoryData[params.slug];

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="bg-gray-50 min-h-screen">
        {/* Category Banner */}
        <div className="relative h-[400px] w-full overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">{category.name}</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </nav>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 overflow-x-auto py-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium whitespace-nowrap">
                Latest
              </button>
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full font-medium whitespace-nowrap transition-colors">
                Trending
              </button>
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full font-medium whitespace-nowrap transition-colors">
                Popular
              </button>
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full font-medium whitespace-nowrap transition-colors">
                Most Viewed
              </button>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              Load More Articles
            </button>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-blue-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Never Miss an Update
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Subscribe to get the latest {category.name.toLowerCase()} news delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
