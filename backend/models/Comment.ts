import mongoose, { Schema, Model } from 'mongoose';

export interface IComment {
  _id: string;
  content: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  user: mongoose.Types.ObjectId;
  article: mongoose.Types.ObjectId;
  parent?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
  },
  {
    timestamps: true,
  }
);

// Indexes
CommentSchema.index({ article: 1 });
CommentSchema.index({ user: 1 });
CommentSchema.index({ status: 1 });

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
