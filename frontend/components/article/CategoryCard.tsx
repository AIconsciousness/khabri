import Link from "next/link";
import { FC } from "react";

interface CategoryCardProps {
  name: string;
  slug: string;
  icon: string;
}

export const CategoryCard: FC<CategoryCardProps> = ({ name, slug, icon }) => {
  return (
    <Link href={`/category/${slug}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-xl transition-all p-6 text-center group cursor-pointer border-2 border-transparent hover:border-primary">
        <div className="text-4xl mb-2">{icon}</div>
        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition">
          {name}
        </h3>
      </div>
    </Link>
  );
};
