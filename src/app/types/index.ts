import { ReactNode } from "react";

// Add these interfaces to existing types
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
  showTimes: ShowTime[]; // Changed from show_times to showTimes
  screen: Screen;
  isUpcoming: boolean;
}

export interface PopularVenue {
  id: number;
  name: string;
  location: string;
  eventCount: number;
  image_url: string; // Add this field
}

export interface VenueWithEvents {
  venue_id: number;
  name: string;
  location: string;
  Events: Array<{
    event_id: number;
    event_name: string;
    ticket_price: number;
    event_image: string;
    event_type: string;
    image_url: string;
  }>;
}
// Add this interface to your types file
export interface Category {
  id: number;
  description: string;
  category_id: number;
  name: string;
  image_url: string;
}

export interface ShowTime {
  show_date: string | number | Date;
  screen_name: ReactNode;
  available_seats: ReactNode;
  // time: string | number | Date;
  show_time_id: string;
  showtime_id: string;
  start_time: string;
  end_time: string;
  screen: Screen;
}
// Update the Event interface
export interface Screen {
  screen_id: string;
  name: string;
  capacity: number;
}

export interface Venue {
  location: string;
  venue_id: number;
  name: string;
  address: string | null;
  capacity: number;
  description: string | null;
  image_url: string;
  images: string;
  events: Event[];
}
