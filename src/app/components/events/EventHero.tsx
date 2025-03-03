import Image from "next/image";
import { Event } from "@/app/types/index";
import { EventDetails } from "./EventDetails";

interface EventHeroProps {
  event: Event;
}

interface EventDescriptionProps {
  description: string;
}

const EventDescription = ({ description }: EventDescriptionProps) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-3">About the Event</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const EventHero = ({ event }: EventHeroProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/3 relative h-[400px] md:h-auto">
        <Image
          src={event.image_url || "/placeholder.jpg"}
          alt={`${event.event_name} - Event Image`}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="md:w-2/3 p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-4">{event.event_name}</h1>
        <EventDetails event={event} />
        <EventDescription description={event.description} />
      </div>
    </div>
  </div>
);