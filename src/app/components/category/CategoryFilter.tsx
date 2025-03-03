import { Category } from "@/app/types/index";
import { useRouter } from "next/navigation";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId);
    router.push(`/categories/${categoryId}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.category_id}
            onClick={() => handleCategoryClick(category.category_id.toString())}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category.category_id.toString()
                ? "bg-pink-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-colors duration-200`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
