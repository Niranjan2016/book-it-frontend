"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { Hero } from "./components/home/Hero";
import { FeaturedEvents } from "./components/home/FeaturedEvents";
import { Categories } from "./components/category/Categories";
import { PopularVenues } from "./components/home/PopularVenues";
import { Event, PopularVenue, Category, Venue } from "@/app/types/index";
import { useSearchParams } from "next/navigation"; // Add this import at the top
import { SearchResults } from "./components/search/SearchResults";

// Remove the SearchResults component and its interface from here

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<{
    events: Event[];
    categories: Category[];
    venues: PopularVenue[];
  }>({
    events: [],
    categories: [],
    venues: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  // First useEffect for data fetching
  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const [venuesResponse, categoriesResponse, eventsResponse] =
          await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/venues`, {
              signal: controller.signal,
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
              },
            }),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
              signal: controller.signal,
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
              },
            }),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
              signal: controller.signal,
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
              },
            }),
          ]);

        // Check responses
        if (
          !venuesResponse.ok ||
          !categoriesResponse.ok ||
          !eventsResponse.ok
        ) {
          throw new Error("One or more API calls failed");
        }

        const [venuesData, categoriesData, eventsData] = await Promise.all([
          venuesResponse.json(),
          categoriesResponse.json(),
          eventsResponse.json(),
        ]);

        // Process events from events endpoint
        // In the main data fetching section
        const events = eventsData.map((event: Event) => ({
          event_id: event.event_id,
          title: event.event_name,
          event_name: event.event_name,
          venue: event.venue_name,
          venue_name: event.venue_name,
          price: Number(event.ticket_price || 0),
          ticket_price: String(event.ticket_price || "0"),
          image: event.image_url || "/placeholder.jpg",
          image_url: event.image_url || "/placeholder.jpg",
          description: event.description || "",
          date: event.event_date,
          event_date: event.event_date,
          category_id: Number(event.category_id),
          venue_id: Number(event.venue_id),
          location: event.location || "",
          event_type: event.event_type || "general",
          status: event.status || "active",
          available_seats: Number(event.available_seats || 0),
          show_times: event.show_times || [],
          screens: event.screen || [],
          isUpcoming: true,
        }));

        // Process venues and categories as before
        const venues: PopularVenue[] = (venuesData || [])
          .map(
            (venue: Venue) =>
              ({
                id: venue.venue_id,
                name: venue.name,
                location: venue.location,
                eventCount: venue.events?.length || 0,
                image_url: venue.image_url || "/placeholder.jpg",
              } as PopularVenue)
          )
          .sort(() => Math.random() - 0.5)
          .slice(0, 6);
        console.log(venuesData);
        const categories = (categoriesData || []).map((category: Category) => ({
          id: category.category_id,
          name: category.name,
          description: category.description || "",
          image_url: category.image_url || "/placeholder.jpg",
          category_id: category.category_id,
        }));

        setData({
          events: events || [],
          categories: categories || [],
          venues: venues || [],
        });
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          // Ignore abort errors
          return;
        }
        console.error("Error fetching data:", error);
        setData({
          events: [],
          categories: [],
          venues: [],
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  // Second useEffect for search handling
  // Update the search handling useEffect
  useEffect(() => {
    const handleSearch = () => {
      const query = searchParams.get("search");
      console.log("Current search query:", query);
      console.log("Available events:", data.events.length);

      if (query && query.trim()) {
        const filteredEvents = data.events.filter((event) => {
          const eventTitle = String(
            event.title || event.event_name || ""
          ).toLowerCase();
          const searchTerm = query.toLowerCase().trim();
          return eventTitle.includes(searchTerm);
        });
        console.log("Filtered events:", filteredEvents);
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    };

    handleSearch();
  }, [data.events, searchParams]); // Update dependencies

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" key="home-page">
      <div className="relative">
        <Hero />
      </div>

      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchResults data={data} searchParams={searchParams} />
      </Suspense>

      {!showResults && (
        <>
          <FeaturedEvents
            events={data.events.sort(() => Math.random() - 0.5).slice(0, 6)}
          />
          <Categories categories={data.categories} />
          <PopularVenues venues={data.venues} />
        </>
      )}
    </div>
  );
}
