import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Article } from '@/backend/models';

// GET /api/articles/[id] - Get single article
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const article = await Article.findById(params.id)
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .populate('tags', 'name slug');

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Increment views
    await Article.findByIdAndUpdate(params.id, { $inc: { views: 1 } });

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}

// PUT /api/articles/[id] - Update article
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      category,
      tags,
    } = body;

    // Check if article exists
    const existingArticle = await Article.findById(params.id);
    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // If slug is being updated, check it's not already taken
    if (slug && slug !== existingArticle.slug) {
      const slugExists = await Article.findOne({ slug });
      if (slugExists) {
        return NextResponse.json(
          { error: 'Article with this slug already exists' },
          { status: 409 }
        );
      }
    }

    const updateData: any = {
      ...(title && { title }),
      ...(slug && { slug }),
      ...(content && { content }),
      ...(excerpt !== undefined && { excerpt }),
      ...(featuredImage !== undefined && { featuredImage }),
      ...(status && { status }),
      ...(isPremium !== undefined && { isPremium }),
      ...(metaDescription !== undefined && { metaDescription }),
      ...(metaKeywords !== undefined && { metaKeywords }),
      ...(canonicalUrl !== undefined && { canonicalUrl }),
      ...(category && { category }),
      ...(tags && { tags }),
    };

    // Set publishedAt if status is being changed to PUBLISHED
    if (status === 'PUBLISHED' && existingArticle.status !== 'PUBLISHED') {
      updateData.publishedAt = publishedAt || new Date();
    }

    const article = await Article.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .populate('tags', 'name slug');

    return NextResponse.json({ article });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[id] - Delete article
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const article = await Article.findByIdAndDelete(params.id);

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
}
