import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Article } from '@/backend/models';

// GET /api/articles - Get all articles with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const isPremium = searchParams.get('isPremium');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (isPremium) query.isPremium = isPremium === 'true';
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const articles = await Article.find(query)
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Article.countDocuments(query);

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

// POST /api/articles - Create new article
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      status,
      isPremium,
      publishedAt,
      metaDescription,
      metaKeywords,
      canonicalUrl,
      author,
      category,
      tags,
    } = body;

    // Validation
    if (!title || !slug || !content || !author || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingArticle = await Article.findOne({ slug });
    if (existingArticle) {
      return NextResponse.json(
        { error: 'Article with this slug already exists' },
        { status: 409 }
      );
    }

    const article = await Article.create({
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      status: status || 'DRAFT',
      isPremium: isPremium || false,
      publishedAt: status === 'PUBLISHED' ? publishedAt || new Date() : publishedAt,
      metaDescription,
      metaKeywords,
      canonicalUrl,
      author,
      category,
      tags: tags || [],
    });

    const populatedArticle = await Article.findById(article._id)
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .populate('tags', 'name slug');

    return NextResponse.json(
      { article: populatedArticle },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}
