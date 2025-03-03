"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Venue } from "@/app/types/";
import { EventBasicInfo } from "@/app/admin/components/events/EventBasicInfo";
import { ShowTimesList } from "@/app/admin/components/events/ShowTimesList";
import { EventImageUpload } from "@/app/admin/components/events/EventImageUpload";

export default function CreateEvent() {
  const router = useRouter();

  type ShowTime = {
    screen_id: string;
    start_time: string;
    available_seats: string;
  };

  const [venues, setVenues] = useState<Venue[]>([]);
  const [categories, setCategories] = useState<
    Array<{ category_id: number; name: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    event_name: "",
    description: "",
    start_date: "",
    end_date: "",
    event_date: "",
    ticket_price: "",
    venue_id: "",
    category_id: "",
  });
  const [showTimes, setShowTimes] = useState<ShowTime[]>([
    { screen_id: "", start_time: "", available_seats: "" },
  ]);
  const [screens, setScreens] = useState<
    Array<{
      screen_id: number;
      name: string;
      capacity: number;
    }>
  >([]);

  const fetchScreens = async (venueId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/venues/${venueId}/screens`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const screensData = await response.json();
      setScreens(screensData);
    } catch (error) {
      console.error("Error fetching screens:", error);
      setScreens([]);
    }
  };

  const handleVenueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const venueId = e.target.value;
    setFormData({ ...formData, venue_id: venueId });
    if (venueId) {
      fetchScreens(venueId);
    } else {
      setScreens([]);
    }
    setShowTimes([]);
  };

  const addShowTime = () => {
    setShowTimes([
      ...showTimes,
      { screen_id: "", start_time: "", available_seats: "" },
    ]);
  };

  const removeShowTime = (index: number) => {
    setShowTimes(showTimes.filter((_, i) => i !== index));
  };

  const updateShowTime = (
    index: number,
    field: keyof ShowTime,
    value: string
  ) => {
    const updatedShowTimes = [...showTimes];
    updatedShowTimes[index] = { ...updatedShowTimes[index], [field]: value };

    if (field === "screen_id") {
      const selectedScreen = screens.find(
        (screen) => screen.screen_id.toString() === value
      );
      if (selectedScreen) {
        updatedShowTimes[index].available_seats =
          selectedScreen.capacity.toString();
      }
    }
    setShowTimes(updatedShowTimes);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const eventFormData = new FormData();
      const submissionData = {
        ...formData,
        event_date: formData.start_date,
      };

      Object.entries(submissionData).forEach(([key, value]) => {
        if (value) {
          eventFormData.append(key, value);
        }
      });

      if (selectedImage) {
        eventFormData.append("image", selectedImage);
      }

      eventFormData.append("show_times", JSON.stringify(showTimes));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: eventFormData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event");
      }

      router.push("/admin/events");
    } catch (error) {
      console.error("Error creating event:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create event"
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [venuesResponse, categoriesResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/venues/admin`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (!venuesResponse.ok) {
          throw new Error("Failed to fetch admin venues");
        }

        const [venuesData, categoriesData] = await Promise.all([
          venuesResponse.json(),
          categoriesResponse.json(),
        ]);

        setVenues(venuesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Create New Event
        </h1>
        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6 space-y-6"
        >
          <EventBasicInfo
            formData={formData}
            venues={venues}
            categories={categories}
            handleVenueChange={handleVenueChange}
            setFormData={(data) => setFormData({ ...formData, ...data })}
          />
          <EventImageUpload
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
          />
          <ShowTimesList
            showTimes={showTimes}
            screens={screens}
            updateShowTime={updateShowTime}
            removeShowTime={removeShowTime}
            addShowTime={addShowTime}
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
