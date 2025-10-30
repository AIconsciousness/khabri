import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  timeAgo: string;
  readTime: string;
  href?: string;
}

export const FeaturedArticle: FC<FeaturedArticleProps> = ({
  title,
  excerpt,
  image,
  author,
  timeAgo,
  readTime,
  href = "#",
}) => {
  return (
    <Link href={href}>
      <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl group cursor-pointer">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">
            HEADLINE
          </span>
          <h2 className="text-white text-3xl font-bold mt-3 mb-2">{title}</h2>
          <p className="text-gray-200 mb-4">{excerpt}</p>
          <div className="flex items-center text-white text-sm">
            <span>By {author}</span>
            <span className="mx-2">•</span>
            <span>{timeAgo}</span>
            <span className="mx-2">•</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
