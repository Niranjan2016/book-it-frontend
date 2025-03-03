interface FiltersProps {
  selectedEventType: string;
  setSelectedEventType: (value: string) => void;
  priceRange: { min: string; max: string };
  setPriceRange: (value: { min: string; max: string }) => void;
  categories: Array<{
    category_id: number;
    name: string;
  }>; // Update type
  setCurrentPage: (value: number) => void;
}

export const Filters = ({
  selectedEventType,
  setSelectedEventType,
  priceRange,
  setPriceRange,
  categories,
  setCurrentPage,
}: FiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          {/* // Update the categories mapping in the select */}
          <select
            value={selectedEventType}
            onChange={(e) => {
              setSelectedEventType(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="" key="all">
              All Categories
            </option>
            {categories.map((category) => (
              <option
                key={category.category_id as number}
                value={category.category_id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (₹)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => {
                setPriceRange({
                  ...priceRange,
                  min: e.target.value,
                });
                setCurrentPage(1);
              }}
              placeholder="Min"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => {
                setPriceRange({ ...priceRange, max: e.target.value });
                setCurrentPage(1);
              }}
              placeholder="Max"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {(priceRange.min || priceRange.max) && (
              <button
                onClick={() => {
                  setPriceRange({ min: "", max: "" });
                  setCurrentPage(1);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
