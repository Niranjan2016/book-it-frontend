interface SeatButtonProps {
  seat: {
    seatId: number;
    seatNumber: number;
    status: string;
    category: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

export function SeatButton({ seat, isSelected, onClick }: SeatButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-7 h-7 rounded text-[11px] font-medium
        transition-all duration-200
        ${
          seat.status === "booked"
            ? "bg-gray-400 text-white cursor-not-allowed"
            : isSelected
            ? "bg-pink-600 text-white transform scale-95"
            : seat.category === "GOLD"
            ? "bg-yellow-100 text-gray-600 hover:bg-yellow-200"
            : seat.category === "SILVER"
            ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
            : "bg-amber-100 text-gray-600 hover:bg-amber-200"
        }
      `}
      disabled={seat.status === "booked"}
    >
      {seat.seatNumber}
    </button>
  );
}