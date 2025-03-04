export interface Seat {
  seatId: number;
  rowLabel: string;
  seatNumber: number;
  status: "available" | "booked" | "selected";
  price: number | string;
  category: string;
}

export interface Row {
  rowNumber: number;
  rowLabel: string;
  seats: Seat[];
}

export interface Category {
  name: string;
  basePrice: number | string;
}

export interface CategoryLayout {
  categoryName: string;
  basePrice: number | string;
  rows: Row[];
}