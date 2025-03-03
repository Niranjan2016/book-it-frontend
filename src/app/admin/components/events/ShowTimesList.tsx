import React from "react";

type Screen = {
  screen_id: number;
  name: string;
  capacity: number;
};

type ShowTime = {
  screen_id: string;
  start_time: string;
  available_seats: string;
};

type ShowTimesListProps = {
  showTimes: ShowTime[];
  screens: Screen[];
  updateShowTime: (index: number, field: keyof ShowTime, value: string) => void;
  removeShowTime: (index: number) => void;
  addShowTime: () => void;
};

export const ShowTimesList = ({
  showTimes,
  screens,
  updateShowTime,
  removeShowTime,
  addShowTime,
}: ShowTimesListProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Show Times
        </label>
        <button
          type="button"
          onClick={addShowTime}
          className="px-3 py-1 text-sm bg-pink-600 text-white rounded-md hover:bg-pink-700"
        >
          Add Show Time
        </button>
      </div>
      {showTimes.map((show, index) => (
        <div
          key={index}
          className="flex gap-4 items-start mb-4 p-4 border rounded-lg"
        >
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Screen
            </label>
            <select
              value={show.screen_id}
              onChange={(e) =>
                updateShowTime(index, "screen_id", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a screen</option>
              {screens.map((screen) => (
                <option key={screen.screen_id} value={screen.screen_id}>
                  {screen.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="time"
              value={show.start_time}
              onChange={(e) =>
                updateShowTime(index, "start_time", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Seats
            </label>
            <input
              type="number"
              value={show.available_seats}
              onChange={(e) =>
                updateShowTime(index, "available_seats", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              min="1"
              required
            />
          </div>

          <button
            type="button"
            onClick={() => removeShowTime(index)}
            className="mt-8 p-2 text-red-600 hover:text-red-700"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};
