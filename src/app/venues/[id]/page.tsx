"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Event, PopularVenue } from "@/app/types/index";
import Image from "next/image";
import { BackButton } from "@/app/components/shared/BackButton";
import { EventCard } from "@/app/components/shared/EventCard";

export default function VenuePage() {
  const params = useParams();
  const [venue, setVenue] = useState<PopularVenue | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVenueDetails() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/venues/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch venue");
        }

        const data = await response.json();
        console.log("API Response:", data); // Debug log

        // Simplify the data handling
        const venueData = data.data || data;
        setVenue(venueData);

        // Process events
        const venueEvents = venueData.Events || venueData.events || [];
        console.log("Events data:", venueEvents); // Debug log

        const formattedEvents = venueEvents.map((event: Event) => ({
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

        console.log("Formatted events:", formattedEvents); // Debug log
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching venue details:", error);
        setVenue(null);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (params.id) {
      fetchVenueDetails();
    }
  }, [params.id]);
  useEffect(() => {
    console.log(venue);
  }, [venue]);
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600" />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Venue not found</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <BackButton />
        </div>
        {/* Rest of your venue page content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={venue.image_url || "/placeholder.jpg"}
              alt={`${venue.name} - Venue Image`}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {venue.name}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{venue.location}</p>
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Upcoming Events
              </h2>
              {/* // In the return JSX, replace the events mapping section with: */}
              {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <EventCard
                      key={event.event_id}
                      event={event}
                      venueName={venue.name}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center">
                  No upcoming events at this venue.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
