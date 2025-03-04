import { SeatButton } from "./SeatButton";

interface Seat {
  seatId: number;
  rowLabel: string;
  seatNumber: number;
  status: "available" | "booked";
  price: number | string;
  category: string;
}

interface Row {
  rowNumber: number;
  rowLabel: string;
  seats: Seat[];
}

interface CategoryLayout {
  categoryName: string;
  basePrice: number | string;
  rows: Row[];
}

interface SeatingLayoutProps {
  layout: CategoryLayout[];
  selectedSeats: Seat[];
  onSeatClick: (seat: Seat) => void;
}

export function SeatingLayout({ layout, selectedSeats, onSeatClick }: SeatingLayoutProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {layout.map((category) => (
        <div key={category.categoryName} className="mb-8">
          <h3 className="text-center text-sm font-medium mb-4">
            {category.categoryName} - ₹{category.basePrice}
          </h3>
          {category.rows.map((row) => {
            const seatsPerSection = Math.floor(row.seats.length / 3);
            const leftSeats = row.seats.slice(0, seatsPerSection);
            const middleSeats = row.seats.slice(seatsPerSection, seatsPerSection * 2);
            const rightSeats = row.seats.slice(seatsPerSection * 2);

            return (
              <div
                key={`${category.categoryName}-${row.rowLabel}`}
                className="flex justify-center gap-2 mb-2"
              >
                <div className="w-8 text-center text-gray-500 pt-2">
                  {row.rowLabel}
                </div>
                {[leftSeats, middleSeats, rightSeats].map((section, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex gap-2">
                      {section.map((seat) => (
                        <SeatButton
                          key={seat.seatId}
                          seat={seat}
                          isSelected={selectedSeats.some((s) => s.seatId === seat.seatId)}
                          onClick={() => onSeatClick(seat)}
                        />
                      ))}
                    </div>
                    {index < 2 && <div className="w-8" />}
                  </div>
                ))}
                <div className="w-8 text-center text-gray-500 pt-2">
                  {row.rowLabel}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}