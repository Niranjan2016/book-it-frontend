"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react"; // Add useEffect
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(status === "authenticated" && !!session);
  }, [session, status]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchTerm = encodeURIComponent(searchQuery.trim());
      // Navigate to home page with search query
      router.push(`/?search=${searchTerm}`);

      // Clear search input after navigation
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  // const handleSearch = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     const searchTerm = encodeURIComponent(searchQuery.trim());
  //     // Use window.history.pushState to update URL without full page reload
  //     const newUrl = `/?search=${searchTerm}`;
  //     console.log("New URL:", newUrl);
  //     window.history.pushState({ path: newUrl }, "", newUrl);

  //     // Dispatch a custom event to notify about URL change
  //     const event = new Event("pushstate");
  //     window.dispatchEvent(event);
  //   }
  // };
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-8 py-4 flex items-center">
        {/* Logo - Left */}
        <div className="flex-none">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/book-it-logo.png"
              alt="Book-It Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Search Bar - Center */}
        <div className="flex-1 mx-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
          </form>
        </div>

        {/* Navigation - Right */}
        <div className="flex-none flex items-center gap-4">
          <Link href="/about" className="text-gray-600 hover:text-pink-600 transition-colors">
            About
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-pink-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-pink-600 transition-colors">
                My Profile
              </Link>
              <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
