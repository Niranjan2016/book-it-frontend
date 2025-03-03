import { Venue } from "@/app/types/index";
import { EventCard } from "./EventCard";
import { EventsPagination } from "../components/EventsPagination";

interface EventsListProps {
  venue: Venue;
  eventPages: { [key: number]: number };
  setEventPages: React.Dispatch<
    React.SetStateAction<{ [key: number]: number }>
  >;
  eventsPerPage: number;
}

export const EventsList = ({
  venue,
  eventPages,
  setEventPages,
  eventsPerPage,
}: EventsListProps) => {
  const getEventsForVenue = (venue: Venue, pageNumber: number) => {
    const indexOfLastEvent = pageNumber * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    return venue.events.slice(indexOfFirstEvent, indexOfLastEvent);
  };

  return (
    <div className="md:w-2/3 border-t md:border-t-0 md:border-l">
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>
        {venue.events && venue.events.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {getEventsForVenue(venue, eventPages[venue.venue_id] || 1).map(
                (event) => (
                  <EventCard key={event.event_id} event={event} />
                )
              )}
            </div>
            <EventsPagination
              venue={venue}
              eventPages={eventPages}
              setEventPages={setEventPages}
              eventsPerPage={eventsPerPage}
            />
          </>
        ) : (
          <p className="text-gray-500 text-sm">No upcoming events</p>
        )}
      </div>
    </div>
  );
};
