"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Venue {
  venue_id: string;
  name: string;
  location: string;
  image_url: string;
  status: string;
  description?: string;
  capacity: number;
  contact_number?: string;
}

export default function VenueDetailsPage() {
  // Move all state declarations together at the top
  const { data: session } = useSession();
  const params = useParams();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<Venue>({
    venue_id: "",
    name: "",
    location: "",
    image_url: "",
    status: "active",
    description: "",
    capacity: 0,
    contact_number: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  // Add image preview effect
  useEffect(() => {
    if (selectedImage) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedImage]);

  // Update the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      // Add required text fields with null checks
      formDataToSend.append("name", formData.name || "");
      formDataToSend.append("address", formData.location || "");
      formDataToSend.append("capacity", formData.capacity?.toString() || "0");
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("location", formData.location || "");
      formDataToSend.append("status", formData.status || "active");
      // Add image if selected
      if (selectedImage) {
        formDataToSend.append("image", selectedImage);
      }
      // Better way to log FormData contents
      console.log("Form Data Contents:");
      console.log("Raw form data:", Object.fromEntries(formDataToSend));
      console.log("Individual entries:");
      for (const pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: `, pair[1]);
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/venues/${params.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
            // "Content-Type": "multipart/form-data",
          },
          body: formDataToSend,
        }
      );
      // Log the response for debugging
      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);
      if (!response.ok) throw new Error("Failed to update venue");
      const venueData = responseData.data || responseData;
      setVenue(venueData);
      setFormData(venueData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setIsLoading(true);

        // Log the API URL for debugging
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/venues/${params.id}`;
        console.log("Fetching venue from:", apiUrl);

        // Check if we have the required data
        if (!session?.user?.accessToken) {
          throw new Error("No access token available");
        }
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedVenue = await response.json();
        setVenue(updatedVenue.data);
        setFormData(updatedVenue.data);
      } catch (error) {
        console.error("Error fetching venue:", error);
        // Log more details about the error
        if (error instanceof Error) {
          console.error("Error message:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    // Only fetch if we have both session and ID
    if (session?.user?.accessToken && params.id) {
      console.log("Session and params available, fetching venue...");
      fetchVenue();
    } else {
      console.log("Missing required data:", {
        hasSession: !!session,
        hasToken: !!session?.user?.accessToken,
        hasId: !!params.id,
      });
    }
  }, [session, params.id]);
  // Add image preview effect
  useEffect(() => {
    if (selectedImage) {
      const objectUrl = URL.createObjectURL(selectedImage);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedImage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="p-6">
        <p className="text-red-600">Venue not found</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Venue Details</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
        >
          {isEditing ? "Cancel" : "Edit Venue"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={formData?.name}
              onChange={(e) =>
                setFormData({ ...formData!, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={formData?.location}
              onChange={(e) =>
                setFormData({ ...formData!, location: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData?.description || ""}
              onChange={(e) =>
                setFormData({ ...formData!, description: e.target.value })
              }
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={formData?.status}
              onChange={(e) =>
                setFormData({ ...formData!, status: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          {/* // Add these fields inside the form, before the Status field */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Venue Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              {/* // In the edit form */}
              <div className="relative h-32 w-32">
                <Image
                  src={formData.image_url || imagePreview || "/placeholder.jpg"}
                  alt="Venue preview"
                  fill
                  className="object-cover rounded-lg"
                  unoptimized // Add this to handle external URLs
                />
              </div>
              <div className="flex flex-col space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setSelectedImage(e.target.files[0]);
                    }
                  }}
                  className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-pink-50 file:text-pink-700
            hover:file:bg-pink-100"
                />
                {selectedImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove selected image
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seating Capacity
            </label>
            <input
              type="number"
              value={formData?.capacity}
              onChange={(e) =>
                setFormData({
                  ...formData!,
                  capacity: parseInt(e.target.value) || 0,
                })
              }
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              value={formData?.contact_number || ""}
              onChange={(e) =>
                setFormData({ ...formData!, contact_number: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              placeholder="+91 1234567890"
            />
          </div>
          {/* // Add these fields in the display view, before the status span */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {venue.contact_number && (
              <div>
                <span className="text-gray-500">Contact:</span>
                <p className="text-gray-900">{venue.contact_number}</p>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-64">
            <Image
              src={venue.image_url || "/placeholder.jpg"}
              alt={venue.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">{venue.name}</h2>
            <p className="text-gray-600 mb-4">{venue.location}</p>
            {venue.description && (
              <p className="text-gray-600 mb-4">{venue.description}</p>
            )}
            <div className="flex items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  venue.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {venue.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
