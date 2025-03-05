"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/app/types";
import { VenueFormData, Screen, SeatCategory } from "@/app/types/venues";
import { VenueDetailsForm } from "./VenueDetailsForm";
import { ScreensSection } from "./ScreensSection";

export default function VenueForm() {
  const router = useRouter();
  const { data: session } = useSession() as { data: CustomSession | null };
  const [imagePreview, setImagePreview] = useState<string>("");
  const defaultSeatCategories: SeatCategory[] = [
    {
      name: "GOLD",
      price_multiplier: 1.5,
      rows_from: 0,
      rows_to: 0,
      seats_per_row: 0,
      position: "BACK",
    },
    {
      name: "SILVER",
      price_multiplier: 1.0,
      rows_from: 0,
      rows_to: 0,
      seats_per_row: 0,
      position: "MIDDLE",
    },
    {
      name: "BRONZE",
      price_multiplier: 0.8,
      rows_from: 0,
      rows_to: 0,
      seats_per_row: 0,
      position: "FRONT",
    },
  ];
  const [formData, setFormData] = useState<VenueFormData>({
    name: "",
    address: "",
    city: "",
    contact_number: "",
    capacity: 0,
    screens: [
      {
        name: "",
        capacity: 0,
        rows: 0,
        seats_per_row: 0,
        base_price: 0,
        seatCategories: [...defaultSeatCategories],
      },
    ],
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === "number" ? Number(value) || 0 : value,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleScreenChange = (
    index: number,
    field: keyof Screen,
    value: string
  ) => {
    const updatedScreens = formData.screens.map((screen, i) => {
      if (i === index) {
        const updatedValue = field === "name" ? value : Number(value) || 0;
        return { ...screen, [field]: updatedValue };
      }
      return screen;
    });
    setFormData({ ...formData, screens: updatedScreens });
  };
  const handleSeatCategoryChange = (
    screenIndex: number,
    categoryIndex: number,
    field: keyof SeatCategory,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      screens: prev.screens.map((screen, sIndex) => {
        if (sIndex === screenIndex) {
          const updatedCategories = screen.seatCategories.map((cat, cIndex) => {
            if (cIndex === categoryIndex) {
              const updatedValue =
                typeof value === "string" && field !== "name"
                  ? Number(value) || 0
                  : value;
              return { ...cat, [field]: updatedValue };
            }
            return cat;
          });
          return { ...screen, seatCategories: updatedCategories };
        }
        return screen;
      }),
    }));
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
          seatCategories: [...defaultSeatCategories], // Add default seat categories
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
      console.log("formData", formData);
      // Validate screens data
      if (formData.screens.length === 0) {
        throw new Error("At least one screen is required");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("capacity", String(formData.capacity));
      formDataToSend.append("contact_number", formData.contact_number);

      // Convert screens array to JSON string and append
      const screensData = formData.screens.map((screen) => ({
        name: screen.name,
        capacity: Number(screen.capacity),
        rows: Number(screen.rows),
        seats_per_row: Number(screen.seats_per_row),
        base_price: Number(screen.base_price),
        seatCategories: screen.seatCategories.map((cat) => ({
          name: cat.name,
          price_multiplier: Number(cat.price_multiplier),
          rows_from: Number(cat.rows_from),
          rows_to: Number(cat.rows_to),
          seats_per_row: Number(cat.seats_per_row),
          position: cat.position,
        })),
      }));

      formDataToSend.append("screens", JSON.stringify(screensData));

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }
      console.log("formDataToSend", formDataToSend);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/venues`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to create venue: ${errorData}`);
      }

      router.push("/admin/venues");
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  };
  // Update the form layout in VenueForm
  return (
    <form
      onSubmit={handleSubmit}
      className="container max-w-[1920px] mx-auto px-8 py-6"
    >
      <div className="space-y-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <VenueDetailsForm
            name={formData.name}
            address={formData.address}
            city={formData.city}
            contact_number={formData.contact_number}
            capacity={formData.capacity}
            imagePreview={imagePreview}
            onInputChange={handleInputChange}
            onImageChange={handleImageChange}
          />
        </div>
        <div className="bg-white shadow-sm rounded-lg p-6">
          <ScreensSection
            screens={formData.screens}
            onScreenChange={handleScreenChange}
            onSeatCategoryChange={handleSeatCategoryChange}
            onAddScreen={addScreen}
            onRemoveScreen={removeScreen}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 px-4 rounded-md hover:bg-pink-700 font-medium"
          >
            Create Venue
          </button>
        </div>
      </div>
    </form>
  );
}
