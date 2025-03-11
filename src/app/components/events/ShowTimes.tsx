import { ShowTime } from "@/app/types/index";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DateSelector } from "./DateSelector";

interface ShowTimesProps {
  showTimes: ShowTime[];
  eventId: string;
}

export const ShowTimes = ({ showTimes, eventId }: ShowTimesProps) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleShowTimeSelect = (showTimeId: string) => {
    router.push(`/events/${eventId}/seats?showTime=${showTimeId}`);
  };

  // Get unique dates from show times with error handling
  const dates = [
    ...new Set(
      showTimes
        .map((st) => {
          try {
            const date = new Date(st.show_date);
            if (isNaN(date.getTime())) return null;
            return date.toISOString().split("T")[0];
          } catch {
            return null;
          }
        })
        .filter(Boolean) as string[]
    ),
  ].sort();

  // Filter show times for selected date with error handling
  const filteredShowTimes = showTimes.filter((st) => {
    try {
      const showDate = new Date(st.show_date);
      if (isNaN(showDate.getTime())) return false;
      return showDate.toISOString().split("T")[0] === selectedDate;
    } catch {
      return false;
    }
  });
  // console.log("filteredShowTimes:", filteredShowTimes);
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">Select Show Time</h2>

      <DateSelector
        dates={dates}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      {/* Show Times */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Available Show Times</h3>
        <div className="flex flex-wrap gap-3">
          {filteredShowTimes.map((showTime, index) => {
            try {
              const [hours, minutes] = showTime.start_time.split(":");
              const timeString = `${hours.padStart(2, "0")}:${minutes.padStart(
                2,
                "0"
              )}`;

              return (
                <button
                  key={index}
                  onClick={() => handleShowTimeSelect(showTime.showtime_id)}
                  className="group relative px-6 py-3 border-2 border-pink-600 text-pink-600 rounded-md 
                    hover:bg-pink-600 hover:text-white transition-colors"
                >
                  <div className="text-lg font-semibold">{timeString}</div>
                  <div className="text-sm opacity-75">
                    {showTime.available_seats} seats available
                  </div>
                  <div
                    className={`absolute -top-2 -right-2 ${
                      showTime.available_seats &&
                      (showTime.available_seats as number) > 0
                        ? "bg-green-500"
                        : "bg-red-500"
                    } text-white text-xs px-2 py-1 rounded-full`}
                  >
                    {showTime.available_seats &&
                    (showTime.available_seats as number) > 0
                      ? "Available"
                      : "Full"}
                  </div>
                </button>
              );
            } catch {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};
