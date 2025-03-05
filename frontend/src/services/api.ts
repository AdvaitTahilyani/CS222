import axios from 'axios';
import { Ticket } from '../types';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ticketService = {
  getTickets: async (): Promise<Ticket[]> => {
    const response = await api.get('/tickets');
    return response.data.tickets;
  },

  getTicket: async (id: number): Promise<Ticket> => {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
  },

  createTicket: async (ticketData: Omit<Ticket, 'id' | 'seller'>): Promise<Ticket> => {
    const response = await api.post('/tickets', ticketData);
    return response.data;
  },

  purchaseTicket: async (id: number, quantity: number): Promise<any> => {
    const response = await api.post(`/tickets/${id}/purchase`, { quantity });
    return response.data;
  },
}; 