import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '@/frontend/components';
import { connectDB } from '@/lib/mongodb';
import { Article, User, Category, Tag } from '@/backend/models';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

async function getArticle(slug: string) {
  try {
    await connectDB();

    const article = await Article.findOne({ slug, status: 'PUBLISHED' })
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .lean();

    if (!article) {
      return null;
    }

    // Convert MongoDB objects to plain objects
    return JSON.parse(JSON.stringify(article));
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

async function getRelatedArticles(categoryId: string, currentArticleId: string) {
  try {
    await connectDB();

    const articles = await Article.find({
      category: categoryId,
      status: 'PUBLISHED',
      _id: { $ne: currentArticleId },
    })
      .limit(3)
      .sort({ publishedAt: -1 })
      .select('title slug featuredImage excerpt category')
      .populate('category', 'name slug')
      .lean();

    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.category._id, article._id);

  return (
    <>
      <Header />

      <main className="bg-gray-50 min-h-screen">
        {/* Article Header */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <Link href={`/category/${article.category.slug}`} className="hover:text-blue-600">
                {article.category.name}
              </Link>
              <span>/</span>
              <span className="text-gray-900">{article.title}</span>
            </nav>

            {/* Category Badge */}
            <Link
              href={`/category/${article.category.slug}`}
              className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 hover:bg-blue-700 transition-colors"
            >
              {article.category.name}
            </Link>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {article.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-b border-gray-200 py-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {article.author?.name?.[0] || article.author?.email?.[0] || 'A'}
                </div>
                <span className="font-medium text-gray-900">
                  {article.author?.name || article.author?.email}
                </span>
              </div>
              <span>•</span>
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{article.views || 0} views</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <article
              className="article-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag: any) => (
                    <Link
                      key={tag._id}
                      href={`/tag/${tag.slug}`}
                      className="inline-block bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Share this article:</h3>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                  Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle: any) => (
                <Link
                  key={relatedArticle._id}
                  href={`/article/${relatedArticle.slug}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {relatedArticle.featuredImage && (
                    <div className="relative w-full h-48">
                      <Image
                        src={relatedArticle.featuredImage}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mb-2">
                      {relatedArticle.category.name}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
