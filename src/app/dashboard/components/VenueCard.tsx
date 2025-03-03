import Image from "next/image";
import { Venue } from "@/app/types/index";
import { EventsList } from "./EventsList";

interface VenueCardProps {
  venue: Venue;
  eventPages: { [key: number]: number };
  setEventPages: React.Dispatch<
    React.SetStateAction<{ [key: number]: number }>
  >;
  eventsPerPage: number;
}

export const VenueCard = ({
  venue,
  eventPages,
  setEventPages,
  eventsPerPage,
}: VenueCardProps) => {
  return (
    <div
      key={`venue-${venue.venue_id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <div className="relative h-48 md:h-64">
            <Image
              src={venue.image_url || "/placeholder-venue.jpg"}
              alt={venue.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
            <p className="text-gray-600 mb-2">Capacity: {venue.capacity}</p>
            {venue.address && (
              <p className="text-gray-500 text-sm">{venue.address}</p>
            )}
            {venue.description && (
              <p className="text-gray-500 text-sm mt-2">{venue.description}</p>
            )}
          </div>
        </div>
        <EventsList
          venue={venue}
          eventPages={eventPages}
          setEventPages={setEventPages}
          eventsPerPage={eventsPerPage}
        />
      </div>
    </div>
  );
};
