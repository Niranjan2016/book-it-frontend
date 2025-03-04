"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { BackButton } from "@/app/components/shared/BackButton";
import { LoadingSpinner } from "@/app/components/shared/LoadingSpinner";
import { CategoryLegend } from "@/app/components/seats/CategoryLegend";
import { SeatingLayout } from "@/app/components/seats/SeatingLayout";
import { PaymentSummary } from "@/app/components/seats/PaymentSummary";

interface Seat {
  seatId: number;
  rowLabel: string;
  seatNumber: number;
  status: "available" | "booked" | "selected";
  price: number | string;
  category: string;
}

interface Row {
  rowNumber: number;
  rowLabel: string;
  seats: Seat[];
}

interface Category {
  name: string;
  basePrice: number | string;
}

interface CategoryLayout {
  categoryName: string;
  basePrice: number | string;
  rows: Row[];
}

interface ShowTimeDetails {
  showtime_id: number;
  show_date: string;
  start_time: string;
  available_seats: number;
  screen_id: number;
  event_id: number;
  screen: {
    screen_id: number;
    name: string;
    capacity: number;
    status: string;
  };
  event: {
    event_id: number;
    event_name: string;
    ticket_price: string;
  };
  seats: {
    totalCapacity: number;
    availableSeats: number;
    bookedSeats: number;
    occupancyRate: string;
    categories: Category[];
    layout: CategoryLayout[];
  };
}

export default function SeatsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = params.id as string;
  const showTimeId = searchParams.get("showTime");

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [showTimeDetails, setShowTimeDetails] = useState<ShowTimeDetails | null>(null);
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
      const isSelected = prev.find((s) => s.seatId === seat.seatId);
      if (isSelected) {
        return prev.filter((s) => s.seatId !== seat.seatId);
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
            seats: selectedSeats.map((seat) => seat.seatId),
            total_amount: selectedSeats.reduce(
              (sum, seat) => sum + parseFloat(seat.price.toString()),
              0
            ),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create booking");
      const booking = await response.json();
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
          <div className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {showTimeDetails.event.event_name}
            </h1>
            <p className="text-gray-600">
              {showTimeDetails.screen.name} | {showTimeDetails.start_time}
            </p>
          </div>

          <CategoryLegend categories={showTimeDetails.seats.categories} />

          <div className="text-center mb-12">
            <div className="w-full max-w-2xl mx-auto h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-2" />
            <div className="w-3/4 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-4 transform -skew-y-[4deg]" />
            <p className="text-xs text-gray-400 uppercase tracking-wider">Screen</p>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              {showTimeDetails.seats.layout ? (
                <SeatingLayout
                  layout={showTimeDetails.seats.layout}
                  selectedSeats={selectedSeats}
                  onSeatClick={handleSeatClick}
                />
              ) : (
                <div className="text-center text-gray-500">
                  No seats available
                </div>
              )}
            </div>
          </div>

          <PaymentSummary
            selectedSeats={selectedSeats}
            onProceed={handleProceedToPayment}
          />
        </div>
      </div>
    </div>
  );
}