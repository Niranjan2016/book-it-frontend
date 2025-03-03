import { Venue } from "@/app/types/index";

interface EventsPaginationProps {
  venue: Venue;
  eventPages: { [key: number]: number };
  setEventPages: React.Dispatch<
    React.SetStateAction<{ [key: number]: number }>
  >;
  eventsPerPage: number;
}

export const EventsPagination = ({
  venue,
  eventPages,
  setEventPages,
  eventsPerPage,
}: EventsPaginationProps) => {
  if (Math.ceil(venue.events.length / eventsPerPage) <= 1) {
    return null;
  }

  return (
    <div className="mt-4 flex justify-center gap-2">
      <button
        onClick={() =>
          setEventPages((prev) => ({
            ...prev,
            [venue.venue_id]: Math.max((prev[venue.venue_id] || 1) - 1, 1),
          }))
        }
        disabled={eventPages[venue.venue_id] === 1}
        className="px-3 py-1 text-sm rounded-lg bg-white shadow-sm border disabled:opacity-50"
      >
        Previous
      </button>
      <div className="flex items-center gap-1">
        {Array.from(
          {
            length: Math.ceil(venue.events.length / eventsPerPage),
          },
          (_, i) => i + 1
        ).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() =>
              setEventPages((prev) => ({
                ...prev,
                [venue.venue_id]: pageNum,
              }))
            }
            className={`w-8 h-8 text-sm rounded-lg ${
              (eventPages[venue.venue_id] || 1) === pageNum
                ? "bg-pink-600 text-white"
                : "bg-white"
            }`}
          >
            {pageNum}
          </button>
        ))}
      </div>
      <button
        onClick={() =>
          setEventPages((prev) => ({
            ...prev,
            [venue.venue_id]: Math.min(
              (prev[venue.venue_id] || 1) + 1,
              Math.ceil(venue.events.length / eventsPerPage)
            ),
          }))
        }
        disabled={
          eventPages[venue.venue_id] ===
          Math.ceil(venue.events.length / eventsPerPage)
        }
        className="px-3 py-1 text-sm rounded-lg bg-white shadow-sm border disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
