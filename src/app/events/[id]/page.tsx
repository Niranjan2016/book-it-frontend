"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Event } from "@/app/types/index";
import { LoadingSpinner } from "@/app/components/shared/LoadingSpinner";
import { BackButton } from "@/app/components/shared/BackButton";
import { EventHero } from "@/app/components/events/EventHero";
import { ShowTimes } from "@/app/components/events/ShowTimes";

export default function EventPage() {
  const params = useParams();
  const eventId = params.id as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`
        );
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData || 'Failed to fetch event');
        }
        const data = await response.json();
        setEvent(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError(error instanceof Error ? error.message : 'Failed to fetch event');
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <BackButton />
        </div>
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">Error: {error}</p>
        </div>
      </div>
    </div>
  );
  if (!event) return <div>Event not found</div>;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <BackButton />
        </div>

        <EventHero event={event} />
        {event.showTimes && event.showTimes.length > 0 && (
          <ShowTimes showTimes={event.showTimes} eventId={eventId} />
        )}
      </div>
    </div>
  );
}
