import { ShowTime } from "@/app/types/index";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ShowTimesProps {
  showTimes: ShowTime[];
  eventId: string;
}

export const ShowTimes = ({ showTimes, eventId }: ShowTimesProps) => {
  const router = useRouter();

  const handleShowTimeSelect = (showTimeId: string) => {
    router.push(`/events/${eventId}/seats?showTime=${showTimeId}`);
  };
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

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
  console.log("filteredShowTimes:", filteredShowTimes);
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">Select Show Time</h2>

      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Select Date</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {dates.map((date) => {
            const dateObj = new Date(date);
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center min-w-[100px] p-3 rounded-lg border-2 
                  ${
                    selectedDate === date
                      ? "border-pink-600 bg-pink-50 text-pink-600"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
              >
                <span className="text-sm font-medium">
                  {dateObj.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-lg font-bold">{dateObj.getDate()}</span>
                <span className="text-sm">
                  {dateObj.toLocaleDateString("en-US", { month: "short" })}
                </span>
              </button>
            );
          })}
        </div>
      </div>

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
