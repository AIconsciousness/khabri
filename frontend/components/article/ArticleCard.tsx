import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ArticleCardProps {
  id: number | string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  categorySlug: string;
}

export const ArticleCard: FC<ArticleCardProps> = ({
  id,
  image,
  category,
  title,
  excerpt,
  author,
  readTime,
  categorySlug,
}) => {
  return (
    <Link href={`/category/${categorySlug}`}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded text-xs font-bold">
            {category}
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="font-medium">{author}</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
