interface PaymentSummaryProps {
  selectedSeats: Array<{
    rowLabel: string;
    seatNumber: number;
    price: number | string;
  }>;
  onProceed: () => void;
}

export function PaymentSummary({ selectedSeats, onProceed }: PaymentSummaryProps) {
  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-6">
        <div>
          <p className="text-sm text-gray-600">Selected Seats</p>
          <p className="font-medium">
            {selectedSeats.map((seat) => `${seat.rowLabel}-${seat.seatNumber}`).join(", ")}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Amount Payable</p>
          <p className="text-xl font-bold text-pink-600">
            ₹
            {selectedSeats
              .reduce((sum, seat) => sum + parseFloat(seat.price.toString()), 0)
              .toFixed(2)}
          </p>
        </div>
      </div>

      <button
        onClick={onProceed}
        className="w-full bg-pink-600 text-white py-4 rounded-lg text-lg font-semibold 
          hover:bg-pink-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed
          shadow-lg shadow-pink-600/20"
        disabled={selectedSeats.length === 0}
      >
        Proceed to Payment
      </button>
    </div>
  );
}