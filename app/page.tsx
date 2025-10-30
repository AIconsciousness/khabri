import Link from "next/link";
import Image from "next/image";
import {
  Header,
  Footer,
  BreakingNewsTicker,
  ArticleGrid,
  FeaturedArticle,
  CategoryCard,
} from "@/frontend/components";

export default function HomePage() {
  const newsArticles = [
    {
      id: 1,
      image: "/images/news/news-1.jpg",
      category: "BREAKING NEWS",
      title: "Global Economic Summit Concludes with Major Trade Agreements",
      excerpt: "World leaders reach consensus on climate action and digital economy frameworks in historic three-day summit.",
      author: "Rajesh Kumar",
      readTime: "5 min read",
      categorySlug: "politics"
    },
    {
      id: 2,
      image: "/images/news/news-2.jpg",
      category: "TECHNOLOGY",
      title: "AI Revolution: New Breakthrough in Machine Learning",
      excerpt: "Researchers unveil groundbreaking AI model that can understand complex human emotions and context.",
      author: "Priya Sharma",
      readTime: "4 min read",
      categorySlug: "technology"
    },
    {
      id: 3,
      image: "/images/news/news-3.jpg",
      category: "BUSINESS",
      title: "Stock Markets Hit Record Highs Amid Tech Rally",
      excerpt: "Major indices surge as tech stocks lead unprecedented market growth across global exchanges.",
      author: "Amit Patel",
      readTime: "6 min read",
      categorySlug: "business"
    },
    {
      id: 4,
      image: "/images/tech-news.jpg",
      category: "TECHNOLOGY",
      title: "Next-Gen Smartphones Set New Standards",
      excerpt: "Latest flagship devices showcase revolutionary features including holographic displays and 7-day battery life.",
      author: "Neha Kapoor",
      readTime: "5 min read",
      categorySlug: "technology"
    },
    {
      id: 5,
      image: "/images/sports-news.jpg",
      category: "SPORTS",
      title: "Historic Victory in International Championship",
      excerpt: "Underdog team claims title in thrilling finale, marking one of the greatest comebacks in sports history.",
      author: "Vikram Singh",
      readTime: "4 min read",
      categorySlug: "sports"
    },
    {
      id: 6,
      image: "/images/politics-news.jpg",
      category: "POLITICS",
      title: "New Policy Reforms Announced for Digital Economy",
      excerpt: "Government unveils comprehensive framework to boost startup ecosystem and digital infrastructure.",
      author: "Anjali Mehta",
      readTime: "7 min read",
      categorySlug: "politics"
    }
  ];

  const trendingArticles = [
    {
      id: 1,
      title: "Climate Change Summit Reaches Historic Agreement",
      image: "/images/trending-news.jpg",
      category: "World",
      views: "45.2K"
    },
    {
      id: 2,
      title: "Tech Giants Announce Merger Deal Worth Billions",
      image: "/images/business-banner.jpg",
      category: "Business",
      views: "38.5K"
    },
    {
      id: 3,
      title: "Sports Legend Announces Retirement",
      image: "/images/sports-banner.jpg",
      category: "Sports",
      views: "52.1K"
    }
  ];

  const opinionArticles = [
    {
      id: 1,
      title: "The Future of Sustainable Energy: A Critical Analysis",
      author: "Dr. Arvind Kumar",
      image: "/images/opinion-section.jpg",
      excerpt: "As we face unprecedented climate challenges, the shift to renewable energy is no longer optional—it's imperative.",
      readTime: "10 min read"
    },
    {
      id: 2,
      title: "Digital Privacy in the Age of AI",
      author: "Sanjana Gupta",
      image: "/images/technology-banner.jpg",
      excerpt: "The rapid advancement of artificial intelligence raises critical questions about data protection and personal privacy.",
      readTime: "8 min read"
    }
  ];

  const categories = [
    { name: "Politics", slug: "politics", icon: "🏛️" },
    { name: "Business", slug: "business", icon: "📊" },
    { name: "Technology", slug: "technology", icon: "💻" },
    { name: "Sports", slug: "sports", icon: "⚽" },
    { name: "Entertainment", slug: "entertainment", icon: "🎬" },
    { name: "World", slug: "world", icon: "🌍" },
    { name: "Health", slug: "health", icon: "🏥" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Breaking News Ticker */}
      <BreakingNewsTicker />

      {/* Hero Section with Featured News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main Featured Article */}
          <FeaturedArticle
            title="Major Breakthrough in Climate Technology Could Change Everything"
            excerpt="Scientists unveil revolutionary carbon capture system with 95% efficiency rate, offering new hope in fight against climate change."
            image="/images/hero-banner.jpg"
            author="Sarah Johnson"
            timeAgo="2 hours ago"
            readTime="8 min read"
          />

          {/* Side Featured Articles */}
          <div className="space-y-6">
            {newsArticles.slice(0, 2).map((article) => (
              <Link href={`/category/${article.categorySlug}`} key={article.id}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group">
                  <div className="flex">
                    <div className="relative w-48 h-32 flex-shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <span className="text-xs font-semibold text-primary">{article.category}</span>
                      <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2 line-clamp-2 group-hover:text-primary transition">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{article.author}</span>
                        <span className="mx-2">•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} {...category} />
          ))}
        </div>
      </section>

      {/* Latest News Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
          <Link href="/news" className="text-blue-600 font-semibold hover:underline">
            View All →
          </Link>
        </div>

        <ArticleGrid articles={newsArticles} columns={3} />
      </section>

      {/* Trending Now Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
              🔥 TRENDING
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Most Popular Stories</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trendingArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/category/${article.category.toLowerCase()}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-64">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    #{index + 1}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full mb-2">
                      {article.category}
                    </span>
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{article.views} views</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Opinion & Analysis Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Opinion & Analysis</h2>
            <p className="text-gray-600 mt-2">Expert perspectives on today's biggest stories</p>
          </div>
          <Link href="/category/opinion" className="text-blue-600 font-semibold hover:underline">
            More Opinions →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {opinionArticles.map((article) => (
            <div key={article.id} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-600">
              <div className="flex items-start gap-6">
                <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.author}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 2H3c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                    </svg>
                    <span className="text-sm font-semibold text-blue-600 uppercase">Opinion</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition cursor-pointer">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {article.author[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{article.author}</p>
                        <p className="text-sm text-gray-500">{article.readTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video News Section */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Video News</h2>
              <p className="text-gray-400 mt-2">Watch the latest news coverage</p>
            </div>
            <Link href="/videos" className="text-blue-400 font-semibold hover:underline">
              View All Videos →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative h-48 bg-gray-800 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={`/images/news/news-${item}.jpg`}
                    alt="Video thumbnail"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    3:45
                  </div>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition">
                  Breaking: Major Development in International Relations
                </h3>
                <p className="text-sm text-gray-400">2 hours ago • 125K views</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Stories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Popular Stories This Week</h2>
          <Link href="/popular" className="text-blue-600 font-semibold hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="relative h-80">
              <Image
                src="/images/popular-stories.jpg"
                alt="Popular story"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
                  ⭐ MOST READ
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  The Story Everyone's Talking About
                </h3>
                <p className="text-white/90 mb-3">
                  An in-depth investigation that reveals shocking truths about modern society.
                </p>
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <span>Sarah Chen</span>
                  <span>•</span>
                  <span>156K reads</span>
                  <span>•</span>
                  <span>12 min read</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow flex gap-4 cursor-pointer group">
                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={`/images/news/news-${item}.jpg`}
                    alt="Story thumbnail"
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-500">#{item}</span>
                    <span className="text-xs text-gray-500">• Technology</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition">
                    Revolutionary Discovery Could Change Everything We Know
                  </h4>
                  <p className="text-xs text-gray-500">89K reads • 5 min</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with Khabri</h2>
          <p className="text-blue-100 mb-8 text-lg">Get the latest news delivered straight to your inbox every morning</p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary px-8 py-4 rounded-r-lg hover:bg-gray-100 transition font-semibold">
              Subscribe
            </button>
          </div>
          <p className="text-blue-100 text-xs mt-4">Join 50,000+ readers who start their day with Khabri</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
