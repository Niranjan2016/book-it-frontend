import { signOut } from "next-auth/react";
import Link from "next/link";

export const AdminHeader = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="text-xl font-bold">
              Book-It Admin
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-pink-600 px-4 py-2 rounded hover:bg-pink-700 transition-colors"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
