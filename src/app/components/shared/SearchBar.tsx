"use client";

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const SearchBar = ({ onSearch, searchQuery }: SearchBarProps) => {
  return (
    <div className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for events..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};