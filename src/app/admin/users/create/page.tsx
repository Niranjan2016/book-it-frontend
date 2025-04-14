"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

interface Venue {
  venue_id: string;
  name: string;
}

type FormDataType = {
  full_name: string;
  email: string;
  password: string;
  venue_id: string | null;
  phone: string;
  role: string; // Add role
};
export default function CreateUser() {
  const router = useRouter();
  const { data: session } = useSession();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormDataType>({
    full_name: "",
    email: "",
    password: "",
    venue_id: null,
    phone: "",
    role: "", // Add role field
  });

  const roles = [
    { value: "venue_admin", label: "Venue Admin" },
    { value: "venue_employee", label: "Venue Employee" },
  ];

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/venues/admin`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch venues");
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    if (session?.user?.accessToken) {
      fetchVenues();
    }
  }, [session]);

  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Create a copy of formData to modify
    const submissionData = { ...formData };
    console.log(formData);
    // Set venue_id to null for user role
    if (submissionData.role === "user") {
      submissionData.venue_id = null;
    }

    // Collect all empty field errors
    const missingFields = [];
    const newFieldErrors: Record<string, boolean> = {};

    if (!submissionData.full_name.trim()) {
      missingFields.push("Name");
      newFieldErrors.full_name = true;
    }
    if (!formData.email.trim()) {
      missingFields.push("Email");
      newFieldErrors.email = true;
    }
    if (!formData.password.trim()) {
      missingFields.push("Password");
      newFieldErrors.password = true;
    }
    if (!formData.phone.trim()) {
      missingFields.push("Phone Number");
      newFieldErrors.phone = true;
    }
    if (!formData.role) {
      missingFields.push("Role");
      newFieldErrors.role = true;
    }
    if (submissionData.role !== "user" && !submissionData.venue_id) {
      missingFields.push("Venue");
      newFieldErrors.venue_id = true;
    }
    setFieldErrors(newFieldErrors);

    if (missingFields.length > 0) {
      toast.error(
        <div>
          <div>Please fill in the following fields:</div>
          {missingFields.map((field, index) => (
            <div key={index}>• {field}</div>
          ))}
        </div>
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/create-venue-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify(submissionData), // Use the modified data
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create user");
      }

      toast.success("User created successfully!");
      router.push("/admin/users");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create user";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (fieldErrors[field]) {
      setFieldErrors({ ...fieldErrors, [field]: false });
    }
  };

  // Update input fields to use the new error state and handler
  return (
    <div className="p-6 max-w-2xl mx-auto">
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Add New Venue Admin
      </h1>

      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={formData.full_name}
            onChange={(e) => handleInputChange("full_name", e.target.value)}
            className={`w-full p-2 border rounded-md ${
              fieldErrors.full_name
                ? "border-pink-700 focus:ring-pink-700 border-2"
                : "border-gray-300"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full p-2 border rounded-md ${
              fieldErrors.email
                ? "border-pink-700 focus:ring-pink-700 border-2"
                : "border-gray-300"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className={`w-full p-2 border rounded-md ${
              fieldErrors.email
                ? "border-pink-700 focus:ring-pink-700 border-2"
                : "border-gray-300"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className={`w-full p-2 border rounded-md ${
              fieldErrors.email
                ? "border-pink-700 focus:ring-pink-700 border-2"
                : "border-gray-300"
            }`}
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className={`w-full p-2 border rounded-md ${
              fieldErrors.email
                ? "border-pink-700 focus:ring-pink-700 border-2"
                : "border-gray-300"
            }`}
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
        {formData.role !== "user" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue
            </label>
            <select
              value={formData.venue_id || 0}
              onChange={(e) =>
                setFormData({ ...formData, venue_id: e.target.value })
              }
              className={`w-full p-2 border rounded-md ${
                fieldErrors.email
                  ? "border-pink-700 focus:ring-pink-700 border-2"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select a venue</option>
              {venues.map((venue) => (
                <option key={venue.venue_id} value={venue.venue_id}>
                  {venue.name}
                </option>
              ))}
            </select>
          </div>
        )}

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
            disabled={isLoading}
            className="px-4 py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700 disabled:bg-pink-300"
          >
            {isLoading ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
}
