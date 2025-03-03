import { ReactNode } from "react";

export interface Event {
  venue_name: string;
  available_seats: ReactNode;
  event_date: string | number | Date;
  ticket_price: ReactNode;
  image_url: string;
  event_name: ReactNode | string | null | undefined;
  event_id: number;
  title: string;
  venue: string;
  price: number;
  image: string;
  description: string;
  date: string; // Added this field
  category_id: number;
  venue_id: number;
  location: string;
  event_type: string;
  status: string;
  show_times: ShowTime[];
  screen: Screen;
  isUpcoming: boolean;
}

interface ShowTime {
  available_seats: ReactNode;
  time: string | number | Date;
  show_time_id: string;
  start_time: string;
  end_time: string;
  screen: Screen;
}
// Update the Event interface
interface Screen {
  screen_id: string;
  name: string;
  capacity: number;
}

export interface UserProfile {
  name: ReactNode;
  user_id: number;
  username: string;
  email: string;
  full_name: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  bookings?: UserBooking[];
}

export interface UserBooking {
  booking_id: number;
  event_id: number;
  booking_date: string;
  number_of_tickets: number;
  total_amount: number;
  status: "confirmed" | "pending" | "cancelled";
  event: Event;
}
