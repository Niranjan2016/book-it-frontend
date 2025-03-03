"use client";

import { Event, PopularVenue, Category } from "@/app/types/index";
import { useState, useEffect } from "react";

import { EventCard } from "@/app/components/shared/EventCard";

interface SearchResultsProps {
  data: {
    events: Event[];
    categories: Category[];
    venues: PopularVenue[];
  };
  searchParams: URLSearchParams;
}

export function SearchResults({ data, searchParams }: SearchResultsProps) {
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const [showResults, setShowResults] = useState(false);
  const query = searchParams.get("search");

  useEffect(() => {
    if (query && query.trim()) {
      const filteredEvents = data.events
        .filter((event) => {
          const eventTitle = String(
            event.title || event.event_name || ""
          ).toLowerCase();
          const searchTerm = query.toLowerCase().trim();
          return eventTitle.includes(searchTerm);
        })
        .map((event) => ({
          event_id: Number(event.event_id),
          venue_id: Number(event.venue_id),
          category_id: Number(event.category_id),
          event_name: String(event.event_name || ""),
          title: String(event.event_name || ""),
          venue_name: String(event.venue_name || ""),
          venue: String(event.venue_name || ""),
          event_type: String(event.event_type || "general"),
          status: String(event.status || "active"),
          ticket_price: String(event.ticket_price || "0"),
          price: Number(event.ticket_price || 0),
          event_date: String(event.event_date || ""),
          date: String(event.event_date || ""),
          available_seats: Number(event.available_seats || 0),
          description: String(event.description || ""),
          image_url: String(event.image_url || "/placeholder.jpg"),
          image: String(event.image_url || "/placeholder.jpg"),
          location: String(event.location || ""),
          show_times: event.show_times || [],
          screen: event.screen || [],
          isUpcoming: true,
        }));

      setSearchResults(filteredEvents);
      setShowResults(true);
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
  }, [data.events, query]);

  if (!showResults) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">
        Search Results {query ? `for "${query}"` : ""}
      </h2>
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No events found matching your search.
        </p>
      )}
    </div>
  );
}
