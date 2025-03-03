import { Event } from "../types";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => (
  <div key={`event-${event.event_id}`} className="bg-gray-50 p-4 rounded-lg">
    <h4 className="font-semibold text-lg">{event.event_name}</h4>
    <p className="text-sm text-gray-600 mt-1">
      {new Date(event.event_date)
        .toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
        .replace(/(\d+)/, (match) => {
          const day = parseInt(match);
          const suffix = ["th", "st", "nd", "rd"][day % 10 > 3 ? 0 : day % 10];
          return `${day}${suffix}`;
        })}
    </p>
    <p className="text-sm text-gray-500 mt-1">Type: {event.event_type}</p>
    <div className="flex justify-between items-center mt-3">
      <p className="text-pink-600 font-semibold text-lg">
        ₹{event.ticket_price}
      </p>
      <p className="text-sm text-gray-600">
        {event.available_seats} seats left
      </p>
    </div>
  </div>
);
