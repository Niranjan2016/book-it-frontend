export interface SeatCategory {
  name: string;
  price_multiplier: number;
  rows_from: number;
  rows_to: number;
  seats_per_row: number;
  position: 'FRONT' | 'MIDDLE' | 'BACK';
}

export interface Screen {
  name: string;
  capacity: number;
  rows: number;
  seats_per_row: number;
  base_price: number;
  seatCategories: SeatCategory[];
}

export interface VenueFormData {
  name: string;
  address: string;
  city: string;
  contact_number: string;
  capacity: number;
  screens: Screen[];
  image?: File;
}