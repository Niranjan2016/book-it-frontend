import { SeatCategory } from "@/app/types/venues";

interface SeatCategoryFormProps {
  category: SeatCategory;
  onCategoryChange: (field: keyof SeatCategory, value: string | number) => void;
}

export function SeatCategoryForm({ category, onCategoryChange }: SeatCategoryFormProps) {
  return (
    <div className="border-t pt-4 mb-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            value={category.name}
            onChange={(e) => onCategoryChange("name", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price Multiplier
          </label>
          <input
            type="number"
            step="0.1"
            value={category.price_multiplier}
            onChange={(e) => onCategoryChange("price_multiplier", parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <select
            value={category.position}
            onChange={(e) => onCategoryChange("position", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          >
            <option value="FRONT">Front</option>
            <option value="MIDDLE">Middle</option>
            <option value="BACK">Back</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rows From
          </label>
          <input
            type="number"
            value={category.rows_from}
            onChange={(e) => onCategoryChange("rows_from", parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rows To
          </label>
          <input
            type="number"
            value={category.rows_to}
            onChange={(e) => onCategoryChange("rows_to", parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          />
        </div>
      </div>
    </div>
  );
}