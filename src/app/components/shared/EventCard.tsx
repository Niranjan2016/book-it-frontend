import { Event } from "@/app/types/index";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: Event;
  venueName?: string;
}

export const EventCard = ({ event, venueName }: EventCardProps) => (
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
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        {event.event_name}
      </h3>
      {event.description && (
        <h5 className="text-xl font-bold text-gray-800 mb-3">
          {event.description}
        </h5>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        {venueName && (
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
            {venueName}
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

      {event.showTimes && event.showTimes.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
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
                  Screen: {showTime.screen_name}
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
          href={`/events/${event.event_id}`}
          className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
        >
          Book Now
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
);
