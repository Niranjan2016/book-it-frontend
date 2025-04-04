interface CategoryLegendProps {
  categories: Array<{
    name: string;
    basePrice: number | string;
  }>;
}

export function CategoryLegend({ categories }: CategoryLegendProps) {
  return (
    <div className="mb-6 flex gap-4">
      {categories.map((category) => (
        <div key={category.name} className="flex items-center gap-2">
          <div
            className={`w-4 h-4 border-2 ${
              category.name === "GOLD"
                ? "border-yellow-500 bg-yellow-100"
                : category.name === "SILVER"
                ? "border-gray-400 bg-gray-100"
                : "border-amber-700 bg-amber-100"
            }`}
          />
          <span className="text-sm">
            {category.name} - ₹{category.basePrice}
          </span>
        </div>
      ))}
    </div>
  );
}