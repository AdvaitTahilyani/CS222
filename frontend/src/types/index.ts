export interface Ticket {
  id: number;
  event_name: string;
  description: string;
  price: number;
  date: string | null;
  location: string;
  quantity: number;
  seller: string | null;
}

export interface Transaction {
  id: number;
  quantity: number;
  total_price: number;
  timestamp: string;
  buyer_id: number;
  ticket_id: number;
} 