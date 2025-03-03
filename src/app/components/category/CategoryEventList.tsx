import { Event } from "@/app/types/index";
import { EventCard } from "@/app/components/shared/EventCard";

interface CategoryEventListProps {
  events: Event[];
}

export const CategoryEventList = ({ events }: CategoryEventListProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No events found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event: Event) => (
        <EventCard key={event.event_id} event={event} />
      ))}
    </div>
  );
};
