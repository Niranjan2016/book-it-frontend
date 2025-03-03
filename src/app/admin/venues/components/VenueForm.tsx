"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Screen {
  name: string;
  capacity: number;
  rows: number;
  seats_per_row: number;
  base_price: number;
}

interface VenueFormData {
  name: string;
  address: string;
  city: string;
  contact_number: string;
  screens: Screen[];
}

export default function VenueForm() {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [formData, setFormData] = useState<VenueFormData>({
    name: "",
    address: "",
    city: "",
    contact_number: "",
    screens: [
      {
        name: "",
        capacity: 0,
        rows: 0,
        seats_per_row: 0,
        base_price: 0,
      },
    ],
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleScreenChange = (index: number, field: keyof Screen, value: string) => {
    const updatedScreens = formData.screens.map((screen, i) => {
      if (i === index) {
        return { ...screen, [field]: field === "name" ? value : Number(value) };
      }
      return screen;
    });
    setFormData({ ...formData, screens: updatedScreens });
  };
  const addScreen = () => {
    setFormData({
      ...formData,
      screens: [
        ...formData.screens,
        {
          name: "",
          capacity: 0,
          rows: 0,
          seats_per_row: 0,
          base_price: 0,
        },
      ],
    });
  };
  const removeScreen = (index: number) => {
    setFormData({
      ...formData,
      screens: formData.screens.filter((_, i) => i !== index),
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/venues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user?.accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to create venue: ${errorData}`);
      }
      
      router.push("/admin/venues");
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Venue Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <input
            type="tel"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Screens</h3>
          <button
            type="button"
            onClick={addScreen}
            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
          >
            Add Screen
          </button>
        </div>

        {formData.screens.map((screen, index) => (
          <div key={index} className="border p-4 rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-medium">Screen {index + 1}</h4>
              {formData.screens.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeScreen(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Screen Name
                </label>
                <input
                  type="text"
                  value={screen.name}
                  onChange={(e) => handleScreenChange(index, "name", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Capacity
                </label>
                <input
                  type="number"
                  value={screen.capacity}
                  onChange={(e) => handleScreenChange(index, "capacity", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rows
                </label>
                <input
                  type="number"
                  value={screen.rows}
                  onChange={(e) => handleScreenChange(index, "rows", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Seats per Row
                </label>
                <input
                  type="number"
                  value={screen.seats_per_row}
                  onChange={(e) => handleScreenChange(index, "seats_per_row", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Base Price
                </label>
                <input
                  type="number"
                  value={screen.base_price}
                  onChange={(e) => handleScreenChange(index, "base_price", e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700"
        >
          Create Venue
        </button>
      </div>
    </form>
  );
}