"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LoadingSpinner } from "@/app/components/shared/LoadingSpinner";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('booking');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`
        );
        if (!response.ok) throw new Error("Failed to fetch booking");
        const data = await response.json();
        setBookingDetails(data);
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  const handlePayment = async () => {
    try {
      // Integrate with your payment gateway here
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}/pay`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error("Payment failed");
      
      // Redirect to success page
      router.push(`/booking-confirmation?booking=${bookingId}`);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!bookingDetails) return <div>Booking not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Complete Payment</h1>
          {/* Add your payment form here */}
          <button
            onClick={handlePayment}
            className="w-full bg-pink-600 text-white py-3 rounded-lg text-lg font-semibold 
              hover:bg-pink-700 transition-colors"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}