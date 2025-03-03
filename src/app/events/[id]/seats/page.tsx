"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { BackButton } from "@/app/components/shared/BackButton";
import { LoadingSpinner } from "@/app/components/shared/LoadingSpinner";

interface Seat {
  id: string;
  row: string;
  number: number;
  status: "available" | "booked" | "selected";
  price: number;
}

interface ShowTimeDetails {
  id: string;
  event_id: string;
  seats: Seat[];
  price: number;
}

export default function SeatsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = params.id as string;
  const showTimeId = searchParams.get("showTime");

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [showTimeDetails, setShowTimeDetails] =
    useState<ShowTimeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/show-times/${showTimeId}`
        );
        if (!response.ok) throw new Error("Failed to fetch seats");
        const data = await response.json();
        setShowTimeDetails(data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId && showTimeId) {
      fetchSeats();
    }
  }, [eventId, showTimeId]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "booked") return;

    setSelectedSeats((prev) => {
      const isSelected = prev.find((s) => s.id === seat.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== seat.id);
      }
      return [...prev, seat];
    });
  };

  const handleProceedToPayment = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_id: eventId,
            showtime_id: showTimeId,
            seats: selectedSeats.map((seat) => seat.id),
            total_amount: selectedSeats.reduce(
              (sum, seat) => sum + seat.price,
              0
            ),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create booking");
      const booking = await response.json();

      // Redirect to payment page with booking ID
      router.push(`/payment?booking=${booking.id}`);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!showTimeDetails) return <div>Show time not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <BackButton />

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-8">
            <div className="w-3/4 h-2 bg-gray-300 mx-auto mb-8 rounded-full" />
            <p className="text-gray-500 text-sm">SCREEN THIS WAY</p>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {showTimeDetails &&
              showTimeDetails.seats &&
              showTimeDetails.seats.length > 0 ? (
                Object.entries(
                  showTimeDetails.seats.reduce((acc, seat) => {
                    if (!acc[seat.row]) acc[seat.row] = [];
                    acc[seat.row].push(seat);
                    return acc;
                  }, {} as Record<string, Seat[]>)
                )
                  .sort()
                  .map(([row, seats]) => (
                    <div key={row} className="flex justify-center gap-2 mb-2">
                      <div className="w-8 text-center text-gray-500 pt-2">
                        {row}
                      </div>
                      {seats
                        .sort((a, b) => a.number - b.number)
                        .map((seat) => {
                          const isSelected = selectedSeats.find(
                            (s) => s.id === seat.id
                          );

                          return (
                            <button
                              key={seat.id}
                              onClick={() => handleSeatClick(seat)}
                              className={`
                          w-8 h-8 rounded-t-lg text-xs font-medium
                          ${
                            seat.status === "booked"
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : isSelected
                              ? "bg-pink-600 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }
                        `}
                              disabled={seat.status === "booked"}
                            >
                              {seat.number}
                            </button>
                          );
                        })}
                      <div className="w-8 text-center text-gray-500 pt-2">
                        {row}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center text-gray-500">
                  No seats available
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 rounded-t-sm" />
                  <span className="text-sm text-gray-600">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-600 rounded-t-sm" />
                  <span className="text-sm text-gray-600">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-400 rounded-t-sm" />
                  <span className="text-sm text-gray-600">Booked</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Selected Seats: {selectedSeats.length}
                </p>
                <p className="text-lg font-bold text-pink-600">
                  Total: ₹
                  {selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
                </p>
              </div>
            </div>
            <button
              onClick={handleProceedToPayment}
              className="w-full bg-pink-600 text-white py-3 rounded-lg text-lg font-semibold 
                                hover:bg-pink-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={selectedSeats.length === 0}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
