import Link from "next/link";

export const BackButton = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center px-4 py-2 bg-white text-pink-600 border border-pink-600 rounded-lg hover:bg-pink-600 hover:text-white transition-colors duration-200 shadow-sm"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back to Home
    </Link>
  );
};