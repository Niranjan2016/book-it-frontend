"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { VenueCard } from "./components/VenueCard";
import { Filters } from "./components/Filters";
import { Pagination } from "./components/Pagination";
import { Event, Venue } from "@/app/types/index";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [venues, setVenues] = useState<Venue[]>([]);
  const venuesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [eventPages, setEventPages] = useState<{ [key: number]: number }>({});
  const [selectedEventType, setSelectedEventType] = useState<string>("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const eventsPerPage = 4;
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [categories, setCategories] = useState<
    Array<{ category_id: number; name: string }>
  >([]);
  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        if (authLoading) {
          return;
        }

        const token = localStorage.getItem("token");
        if (!authLoading && !isAuthenticated && !token) {
          router.push("/login");
          return;
        }

        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const [venuesResponse, categoriesResponse] = await Promise.all([
          fetch(`${apiUrl}/venues/with-events`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
          fetch(`${apiUrl}/categories`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (!venuesResponse.ok || !categoriesResponse.ok) {
          throw new Error(`API call failed`);
        }

        const [venuesData, categoriesData] = await Promise.all([
          venuesResponse.json(),
          categoriesResponse.json(),
        ]);

        const processedVenues = Array.isArray(venuesData)
          ? venuesData.map((venue) => {
              const events = venue.events || venue.Events || [];
              return {
                ...venue,
                Events: Array.isArray(events)
                  ? events.map((event: Event) => ({
                      ...event,
                      category_id: String(event.category_id),
                    }))
                  : [],
              };
            })
          : [];

        setVenues(processedVenues);
        setCategories(
          Array.isArray(categoriesData)
            ? categoriesData.map((cat) => ({
                category_id: cat.category_id,
                name: cat.name,
              }))
            : []
        );
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setVenues([]);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [isAuthenticated, authLoading, router]);
  // Move filteredVenues calculation here, before it's used
  // Add debug log for initial venues state
  console.log("Current filter state:", {
    selectedEventType,
    priceRange,
    totalVenues: venues.length,
  });
  const filteredVenues = venues
    .map((venue: Venue) => {
      const venueEvents = venue.events || [];
      console.log(`Filtering venue ${venue.venue_id}:`, {
        totalEvents: venueEvents.length,
        events: venueEvents,
      });

      const filteredEvents = venueEvents.filter((event: Event) => {
        const price = parseFloat(String(event.ticket_price || "0"));
        const matchesType =
          !selectedEventType || String(event.category_id) === selectedEventType;
        const matchesPrice =
          (!priceRange.min && !priceRange.max) ||
          ((!priceRange.min || price >= parseFloat(priceRange.min)) &&
            (!priceRange.max || price <= parseFloat(priceRange.max)));

        return matchesType && matchesPrice;
      });

      return {
        ...venue,
        Events: filteredEvents,
      };
    })
    .filter((venue) => venue.Events && venue.Events.length > 0);
  // Add debug log for filtered results
  console.log("Filtering results:", {
    originalVenues: venues.length,
    filteredVenues: filteredVenues.length,
    currentPage,
    venuesPerPage,
  });
  const indexOfLastVenue = currentPage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = filteredVenues.slice(
    indexOfFirstVenue,
    indexOfLastVenue
  );
  // Add debug log for pagination
  console.log("Pagination results:", {
    totalFiltered: filteredVenues.length,
    currentVenues: currentVenues.length,
    indexOfFirstVenue,
    indexOfLastVenue,
  });
  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage);
  // Show loading state while auth is initializing or data is loading
    if (authLoading || isLoading) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-8">
          <Filters
            selectedEventType={selectedEventType}
            setSelectedEventType={setSelectedEventType}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            categories={categories}
            setCurrentPage={setCurrentPage}
          />
        <div className="space-y-6">
          {currentVenues && currentVenues.length > 0 ? (
            <>
              <div className="space-y-6">
                {currentVenues.map((venue) => (
                  <VenueCard
                    key={`venue-${venue.venue_id}`}
                    venue={venue}
                    eventPages={eventPages}
                    setEventPages={setEventPages}
                    eventsPerPage={eventsPerPage}
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <p className="text-center text-gray-500">No venues available</p>
          )}
        </div>
      </div>
    </div>
  );
}
