"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Venue } from "@/app/types/";
import { EventBasicInfo } from "@/app/admin/components/events/EventBasicInfo";
import { ShowTimesList } from "@/app/admin/components/events/ShowTimesList";
import { EventImageUpload } from "@/app/admin/components/events/EventImageUpload";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/app/types";

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

  //fetchscreens function is used to fetch screens based on the selected venue
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

  const { data: session } = useSession() as { data: CustomSession | null };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!session?.user?.accessToken) {
          throw new Error("No authentication token found");
        }

        const [venuesResponse, categoriesResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/venues`, {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (!venuesResponse.ok || !categoriesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [venuesData, categoriesData] = await Promise.all([
          venuesResponse.json(),
          categoriesResponse.json(),
        ]);

        setVenues(venuesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load venues and categories");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, session]);

  // Also update the handleSubmit function to use session token
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form data
    const errors = [];
    if (!formData.event_name.trim()) errors.push("Event Name");
    if (!formData.description.trim()) errors.push("Description");
    if (!formData.start_date) errors.push("Start Date");
    if (!formData.end_date) errors.push("End Date");
    if (!formData.ticket_price) errors.push("Ticket Price");
    if (!formData.venue_id) errors.push("Venue");
    if (!formData.category_id) errors.push("Category");
    if (!selectedImage) errors.push("Event Image");

    // Validate show times
    showTimes.forEach((showTime, index) => {
      if (!showTime.screen_id) errors.push(`Screen for Show Time ${index + 1}`);
      if (!showTime.start_time)
        errors.push(`Start Time for Show Time ${index + 1}`);
      if (!showTime.available_seats)
        errors.push(`Available Seats for Show Time ${index + 1}`);
    });

    if (errors.length > 0) {
      toast.error(
        <div>
          <div>Please fill in the following fields:</div>
          {errors.map((error, index) => (
            <div key={index}>• {error}</div>
          ))}
        </div>
      );
      return;
    }

    try {
      if (!session?.user?.accessToken) {
        toast.error("No authentication token found");
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
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          body: eventFormData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create event");
      }

      toast.success("Event created successfully!");
      router.push("/admin/events");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create event"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#db27779e",
            color: "#fff",
            padding: "16px",
          },
          success: {
            style: {
              background: "#22c55e",
            },
          },
          error: {
            style: {
              background: "#db27779e",
            },
          },
        }}
      />
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
