"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

interface Venue {
  venue_id: string;
  name: string;
  location: string;
  image_url: string;
  status: string;
}

export default function AdminVenuesPage() {
  const { data: session } = useSession();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/venues/admin`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.status === 401) {
          console.error("Unauthorized access");
          return;
        }

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(
            `Failed to fetch venues: ${response.status} ${errorData}`
          );
        }

        const data = await response.json();
        setVenues(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setVenues([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.accessToken) {
      fetchVenues();
    } else {
      setIsLoading(false);
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Venues</h1>
        <Link
          href="/admin/venues/create"
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
        >
          Add New Venue
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div
            key={venue.venue_id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={venue.image_url || "/placeholder.jpg"}
                alt={venue.name}
                fill
                className="object-cover"
                unoptimized // Add this prop to handle external URLs
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{venue.name}</h3>
              <p className="text-gray-600 mb-4">{venue.location}</p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    venue.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {venue.status}
                </span>
                <Link
                  href={`/admin/venues/${venue.venue_id}`}
                  className="text-pink-600 hover:text-pink-700"
                >
                  Manage →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {venues.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No venues found. Add your first venue!
          </p>
        </div>
      )}
    </div>
  );
}
