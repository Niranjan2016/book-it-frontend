import { useState } from "react";

interface DateSelectorProps {
  dates: string[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export const DateSelector = ({
  dates,
  selectedDate,
  onDateSelect,
}: DateSelectorProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const datesPerPage = 7;
  const totalPages = Math.ceil(dates.length / datesPerPage);
  const paginatedDates = dates.slice(
    currentPage * datesPerPage,
    (currentPage + 1) * datesPerPage
  );

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Select Date</h3>
      <div className="relative flex items-center justify-center max-w-4xl mx-auto">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        <div className="flex gap-4 overflow-hidden p-2 transition-transform duration-300 ease-in-out justify-center">
          {paginatedDates.map((date) => {
            const dateObj = new Date(date);
            return (
              <button
                key={date}
                onClick={() => onDateSelect(date)}
                className={`flex flex-col items-center min-w-[100px] p-3 rounded-lg border-2 transform transition-all duration-300 ease-in-out
                  ${
                    selectedDate === date
                      ? "border-pink-600 bg-pink-50 text-pink-600 scale-105"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
              >
                <span className="text-sm font-medium">
                  {dateObj.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-lg font-bold">{dateObj.getDate()}</span>
                <span className="text-sm">
                  {dateObj.toLocaleDateString("en-US", { month: "short" })}
                </span>
              </button>
            );
          })}
        </div>

        {currentPage < totalPages - 1 && (
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentPage === index
                  ? "bg-pink-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
