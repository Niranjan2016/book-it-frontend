interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, setCurrentPage }: PaginationProps) => {
  return (
    <div className="mt-8 flex justify-center gap-2">
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-white shadow-sm border disabled:opacity-50"
      >
        Previous
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={`page-${pageNum}`}
            onClick={() => setCurrentPage(pageNum)}
            className={`w-10 h-10 rounded-lg ${
              currentPage === pageNum
                ? "bg-pink-600 text-white"
                : "bg-white hover:bg-pink-50"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-white shadow-sm border disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};