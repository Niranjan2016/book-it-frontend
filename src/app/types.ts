export interface Category {
  category_id: number;
  id: number;
  name: string;
  image_url: string;
}

export interface FeaturedEvent {
  event_id: number;
  event_name: string;
  event_type: string;
  event_date: string;
  ticket_price: string;
  available_seats: number;
  image_url: string;
  venue: {
    name: string;
    image_url: string;
  };
}

export interface CustomSession {
  user: {
    accessToken: string;
    [key: string]: unknown;
  };
}
