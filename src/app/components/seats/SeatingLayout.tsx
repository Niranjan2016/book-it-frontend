import { SeatButton } from "./SeatButton";
import { Seat, CategoryLayout } from "@/app/types/seats";

interface SeatCategory {
  name: string;
  basePrice: number;
  color: string;
}

interface SeatingLayoutProps {
  layout: CategoryLayout[];
  selectedSeats: Seat[];
  onSeatClick: (seat: Seat) => void;
  categories?: SeatCategory[];
  isEditing?: boolean;
  onCategoryChange?: (rowIndex: number, seatIndex: number, category: string) => void;
}

export function SeatingLayout({ 
  layout, 
  selectedSeats, 
  onSeatClick, 
  categories = [],
  isEditing = false,
  onCategoryChange 
}: SeatingLayoutProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {layout.map((category) => (
        <div key={category.categoryName} className="mb-8">
          <h3 className="text-center text-sm font-medium mb-4">
            {category.categoryName} - ₹{category.basePrice}
          </h3>
          {category.rows.map((row, rowIndex) => {
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
                {[leftSeats, middleSeats, rightSeats].map((section, sectionIndex) => (
                  <div key={sectionIndex} className="flex items-center">
                    <div className="flex gap-2">
                      {section.map((seat, seatIndex) => (
                        <div key={seat.seatId} className="relative">
                          <SeatButton
                            seat={seat}
                            isSelected={selectedSeats.some((s) => s.seatId === seat.seatId)}
                            onClick={() => onSeatClick(seat)}
                          />
                          {isEditing && (
                            <select
                              value={seat.category}
                              onChange={(e) => 
                                onCategoryChange?.(
                                  rowIndex, 
                                  seatIndex + (sectionIndex * seatsPerSection), 
                                  e.target.value
                                )
                              }
                              className="absolute -bottom-6 left-0 w-7 text-[10px] p-0"
                            >
                              {categories.map((cat) => (
                                <option key={cat.name} value={cat.name}>
                                  {cat.name}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      ))}
                    </div>
                    {sectionIndex < 2 && <div className="w-8" />}
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