import { Screen, SeatCategory } from "@/app/types/venues";
import { SeatCategoryForm } from "./SeatCategoryForm";

interface ScreenFormProps {
  screen: Screen;
  index: number;
  onScreenChange: (field: keyof Screen, value: string) => void;
  onSeatCategoryChange: (
    categoryIndex: number,
    field: keyof SeatCategory,
    value: string | number
  ) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function ScreenForm({
  screen,
  index,
  onScreenChange,
  onSeatCategoryChange,
  onRemove,
  canRemove,
}: ScreenFormProps) {
  // Update the screen form layout
  return (
    <div className="border p-6 rounded-md bg-white">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-medium">Screen {index + 1}</h4>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        )}
      </div>

      <div className="flex gap-12">
        {/* Screen Details Section */}
        <div className="w-[45%]">
          <h5 className="text-md font-medium mb-4">Screen Details</h5>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Screen Name
              </label>
              <input
                type="text"
                value={screen.name}
                onChange={(e) => onScreenChange("name", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacity
              </label>
              <input
                type="number"
                value={screen.capacity}
                onChange={(e) => onScreenChange("capacity", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rows
              </label>
              <input
                type="number"
                value={screen.rows}
                onChange={(e) => onScreenChange("rows", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Seats per Row
              </label>
              <input
                type="number"
                value={screen.seats_per_row}
                onChange={(e) =>
                  onScreenChange("seats_per_row", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Base Price
              </label>
              <input
                type="number"
                value={screen.base_price}
                onChange={(e) => onScreenChange("base_price", e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
              />
            </div>
          </div>
        </div>

        {/* Seat Categories Section */}
        <div className="w-[55%] border-l pl-12">
          <h5 className="text-md font-medium mb-4">Seat Categories</h5>
          <div className="space-y-6">
            {screen.seatCategories.map((category, categoryIndex) => (
              <SeatCategoryForm
                key={categoryIndex}
                category={category}
                onCategoryChange={(field, value) =>
                  onSeatCategoryChange(categoryIndex, field, value)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
