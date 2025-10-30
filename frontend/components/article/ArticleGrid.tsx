import { FC } from "react";
import { ArticleCard } from "./ArticleCard";

interface Article {
  id: number | string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  categorySlug: string;
}

interface ArticleGridProps {
  articles: Article[];
  columns?: 2 | 3 | 4;
}

export const ArticleGrid: FC<ArticleGridProps> = ({ articles, columns = 3 }) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
  );
};
