import Image from "next/image";

interface VenueDetailsFormProps {
  name: string;
  address: string;
  city: string;
  contact_number: string;
  capacity: number;
  imagePreview: string;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VenueDetailsForm({
  name,
  address,
  city,
  contact_number,
  capacity,
  imagePreview,
  onInputChange,
  onImageChange,
}: VenueDetailsFormProps) {
  return (
    <>
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Venue Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          />
        </div>

        {/* Add capacity field after venue name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Capacity
          </label>
          <input
            type="number"
            name="capacity"
            value={capacity}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            name="address"
            value={address}
            onChange={onInputChange}
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
            value={city}
            onChange={onInputChange}
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
            value={contact_number}
            onChange={onInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Venue Image
        </label>
        <div className="mt-1 flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-pink-50 file:text-pink-700
                hover:file:bg-pink-100"
          />
          {imagePreview && (
            <div className="relative w-24 h-24">
              <Image
                src={imagePreview}
                alt="Venue preview"
                width={96}
                height={96}
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
