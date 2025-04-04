import React from "react";
import Image from "next/image";

type EventImageUploadProps = {
  imagePreview: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EventImageUpload = ({
  imagePreview,
  handleImageChange,
}: EventImageUploadProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Event Image
      </label>
      <div className="mt-1 flex flex-col items-center space-y-4">
        {imagePreview && (
          <div className="relative w-full h-48">
            <Image
              src={imagePreview}
              alt="Event preview"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-pink-50 file:text-pink-700
            hover:file:bg-pink-100"
        />
      </div>
    </div>
  );
};
