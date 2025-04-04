"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Event } from "@/app/types/index";

export default function AdminEventsPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const { signal } = controller;

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events/admin`,
          {
            headers: {
              Authorization: `Bearer ${
                (session?.user as { accessToken?: string })?.accessToken
              }`,
              "Content-Type": "application/json",
            },
            signal,
          }
        );

        if (!isMounted) return;

        if (!response.ok) throw new Error("Failed to fetch events");

        const responseData = await response.json();

        if (!isMounted) return;

        const eventsData = responseData.data || responseData;
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      } catch (error) {
        if (
          error instanceof Error &&
          error.name !== "AbortError" &&
          isMounted
        ) {
          console.error("Error fetching events:", error);
          setEvents([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if ((session?.user as { accessToken?: string })?.accessToken) {
      setIsLoading(true);
      fetchEvents();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [session]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }
  const filteredEvents = events.filter((event: Event) =>
    activeTab === "upcoming" ? event.isUpcoming : !event.isUpcoming
  );
  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Events Management
          </h1>
          <Link
            href="/admin/events/create"
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Create Event
          </Link>
        </div>

        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 text-gray-600 border-b-2 transition-colors ${
              activeTab === "upcoming"
                ? "border-pink-600 text-pink-600"
                : "border-transparent hover:border-pink-600 hover:text-pink-600"
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 text-gray-600 border-b-2 transition-colors ${
              activeTab === "past"
                ? "border-pink-600 text-pink-600"
                : "border-transparent hover:border-pink-600 hover:text-pink-600"
            }`}
          >
            Past Events
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={String(event.event_id)}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-56">
                <Image
                  src={event.image_url || "/placeholder.jpg"}
                  alt={event.event_name as string}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                <div className="absolute top-0 right-0 m-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {event.event_name}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  {event.screen && (
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      {event.screen.name}
                    </span>
                  )}
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(event.event_date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    ₹{parseFloat(String(event.ticket_price)).toFixed(2)}
                  </span>
                </div>
                {event.showTimes &&
                  event.showTimes.length > 0 &&
                  event.screen && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Show Times
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {event.showTimes.map((showTime, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm hover:bg-gray-100 transition-colors"
                          >
                            <p className="font-medium text-gray-800 mb-1">
                              {String(showTime.start_time)}
                            </p>
                            <p className="text-xs text-gray-600">
                              {event.screen.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {showTime.available_seats} seats left
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="mt-6 text-right">
                  <Link
                    href={`/admin/events/${event.event_id}`}
                    className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Manage
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No {activeTab} events found.
              {activeTab === "upcoming" && " Create your first event!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
