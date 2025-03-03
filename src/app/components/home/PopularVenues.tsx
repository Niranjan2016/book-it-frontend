import Image from "next/image";
import Link from "next/link";
import { PopularVenue } from "@/app/types/index";

export function PopularVenues({ venues }: { venues: PopularVenue[] }) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Popular Venues
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <Link href={`/venues/${venue.id}`} key={venue.id} className="group">
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={venue.image_url || "/placeholder.jpg"}
                    alt={venue.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{venue.name}</h3>
                  <p className="text-gray-600 mb-2">{venue.location}</p>
                  <p className="text-pink-600">
                    {venue.eventCount}{" "}
                    {venue.eventCount === 1 ? "Event" : "Events"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
