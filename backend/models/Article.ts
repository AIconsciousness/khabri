import mongoose, { Schema, Model } from 'mongoose';

export interface IArticle {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'ARCHIVED';
  isPremium: boolean;
  views: number;
  publishedAt?: Date;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  author: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    featuredImage: { type: String },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED'],
      default: 'DRAFT',
    },
    isPremium: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    publishedAt: { type: Date },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    canonicalUrl: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
ArticleSchema.index({ slug: 1 });
ArticleSchema.index({ publishedAt: -1 });
ArticleSchema.index({ category: 1 });
ArticleSchema.index({ status: 1 });

const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
