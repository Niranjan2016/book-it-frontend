"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Event, Category } from "@/app/types/index";
import { CategoryEventList } from "../../components/category/CategoryEventList";
import { CategoryFilter } from "../../components/category/CategoryFilter";
import { LoadingSpinner } from "../../components/shared/LoadingSpinner";
import { BackButton } from "@/app/components/shared/BackButton";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 9; // Changed from 6 to 9 events per page

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      if (!categoryId) return;

      try {
        // Fetch categories first to ensure they're always available
        const categoriesRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          {
            signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const categoriesData = await categoriesRes.json();
        if (isMounted && categoriesData) {
          setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        }

        // Then fetch events
        const eventsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events/by-category/${categoryId}?page=${currentPage}&limit=${eventsPerPage}`,
          {
            signal,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const eventsData = await eventsRes.json();

        if (!isMounted) return;

        // Handle no events case
        if (!eventsRes.ok) {
          setEvents([]);
          setTotalPages(1);
          if (eventsRes.status !== 404) {
            throw new Error(eventsData.message || "Failed to fetch events");
          }
          return;
        }

        // Process events data
        const eventsList = eventsData.events || eventsData || [];
        const formattedEvents = Array.isArray(eventsList)
          ? eventsList.map((event) => ({
              event_id: event.event_id,
              event_name: event.event_name,
              title: event.event_name,
              venue_id: event.Venue?.venue_id || event.venue_id || "",
              category_id: event.category_id,
              event_type: event.event_type || "",
              event_date: event.event_date,
              ticket_price: event.ticket_price,
              price: event.ticket_price,
              available_seats: event.available_seats || 0,
              image_url: event.image_url || "/placeholder.jpg",
              description: event.description || "",
              venue: event.venue?.name || event.venue_name || "",
              venue_name: event.venue?.name || event.venue_name || "",
              image: event.image_url || "/placeholder.jpg",
              date: event.event_date,
              location: event.Venue?.location || event.location || "",
              show_times: event.show_times || [],
              showTimes: event.showTimes || [],
              screen: event.screen || [],
              status: event.status || "active",
              isUpcoming: true,
            }))
          : [];
        setEvents(formattedEvents);
        setTotalPages(
          Math.ceil((eventsData.total || eventsList.length) / eventsPerPage)
        );
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError" &&
          isMounted
        ) {
          console.error("Error fetching data:", error);
          setEvents([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    setIsLoading(true);
    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [categoryId, currentPage, eventsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when category changes
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 text-black">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <BackButton />
        </div>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        {isLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <CategoryEventList
            events={events.slice(
              (currentPage - 1) * eventsPerPage,
              currentPage * eventsPerPage
            )}
          />
        )}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded ${
                      currentPage === page
                        ? "bg-pink-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
