import React from "react";
import { Venue } from "@/app/types/";

// Define a custom type for the form data
// Update the EventFormData type to include event_date
type EventFormData = {
  event_name: string;
  description: string;
  start_date: string;
  end_date: string;
  event_date: string; // Add this field
  ticket_price: string;
  venue_id: string;
  category_id: string;
};

type EventBasicInfoProps = {
  formData: EventFormData;
  venues: Venue[];
  categories: Array<{ category_id: number; name: string }>;
  handleVenueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setFormData: (data: EventFormData) => void;
};

export const EventBasicInfo = ({
  formData,
  venues,
  categories,
  handleVenueChange,
  setFormData,
}: EventBasicInfoProps) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Venue
        </label>
        <select
          value={formData.venue_id}
          onChange={handleVenueChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
        >
          <option value="">Select a venue</option>
          {venues.map((venue) => (
            <option key={venue.venue_id} value={venue.venue_id}>
              {venue.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Name
        </label>
        <input
          type="text"
          value={formData.event_name}
          onChange={(e) =>
            setFormData({
              ...formData,
              event_name: e.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={formData.category_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              category_id: e.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
          rows={4}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={formData.start_date?.split("T")[0] || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                start_date: e.target.value,
              })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={formData.end_date?.split("T")[0] || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                end_date: e.target.value,
              })
            }
            min={formData.start_date?.split("T")[0] || ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ticket Price
        </label>
        <input
          type="number"
          value={formData.ticket_price || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              ticket_price: e.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
          min="0"
        />
      </div>
    </>
  );
};
