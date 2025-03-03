import Image from "next/image";
import Link from "next/link";
import { Category } from "../../types";

interface CategoriesProps {
  categories: Category[];
}

export const Categories = ({ categories }: CategoriesProps) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              href={`/categories/${category.category_id}`}
              key={category.category_id}
              className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors"
            >
              {category.image_url && (
                <div className="mb-4">
                  <Image
                    src={category.image_url}
                    alt={category.name}
                    width={100}
                    height={100}
                    className="mx-auto rounded-lg"
                  />
                </div>
              )}
              <h3 className="text-xl font-medium">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
