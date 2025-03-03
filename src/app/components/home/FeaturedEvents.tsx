import { Event } from "@/app/types/index";
import { EventCard } from "@/app/components/shared/EventCard";

interface FeaturedEventsProps {
  events: Event[];
}

export const FeaturedEvents = ({ events }: FeaturedEventsProps) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Featured Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};
