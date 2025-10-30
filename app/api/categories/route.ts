import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Category } from '@/backend/models';

// GET /api/categories - Get all categories
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const categories = await Category.find()
      .sort({ displayOrder: 1 })
      .lean();

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create new category
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      name,
      slug,
      icon,
      displayOrder,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = body;

    // Validation
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 409 }
      );
    }

    const category = await Category.create({
      name,
      slug,
      icon,
      displayOrder: displayOrder || 0,
      metaTitle,
      metaDescription,
      metaKeywords,
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
