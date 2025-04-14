"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const AdminSidebar = () => {
  const pathname = usePathname();
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4  ">
      <div className="text-2xl font-bold mb-8">Admin Panel</div>
      <nav className="space-y-2">
        <Link
          href="/admin/dashboard"
          className={`block px-4 py-2 rounded hover:bg-gray-700 ${
            isActive("/admin/dashboard") ? "bg-gray-700" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/admin/venues"
          className={`block px-4 py-2 rounded hover:bg-gray-700 ${
            isActive("/admin/venues") ? "bg-gray-700" : ""
          }`}
        >
          Venues
        </Link>
        <Link
          href="/admin/events"
          className={`block px-4 py-2 rounded hover:bg-gray-700 ${
            isActive("/admin/events") ? "bg-gray-700" : ""
          }`}
        >
          Events
        </Link>
        <Link
          href="/admin/orders"
          className={`block px-4 py-2 rounded hover:bg-gray-700 ${
            isActive("/admin/orders") ? "bg-gray-700" : ""
          }`}
        >
          Orders
        </Link>
        <div className="text-white">
          <button
            onClick={() => setIsUsersOpen(!isUsersOpen)}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 flex items-center justify-between text-white"
          >
            <span>Users</span>
            <span
              className={`transform transition-transform ${
                isUsersOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {isUsersOpen && (
            <div className="ml-4 mt-2 space-y-2">
              <Link
                href="/admin/users"
                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                  isActive("/admin/users") ? "bg-gray-700" : ""
                }`}
              >
                Staff Users
              </Link>
              <Link
                href="/admin/users/customers"
                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                  isActive("/admin/users/customers") ? "bg-gray-700" : ""
                }`}
              >
                Customers
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};
