import { useState, useEffect } from 'react';
import { ticketStore, setTickets } from '../store/ticketStore';
import ticketService from '../services/ticketService';

export const useTickets = (params = {}) => {
  const [state, setState] = useState(ticketStore.getState());

  useEffect(() => {
    const unsubscribe = ticketStore.subscribe(setState);
    return unsubscribe;
  }, []);

  const fetchTickets = async () => {
    try {
      const data = await ticketService.getTickets(params);
      setTickets(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [JSON.stringify(params)]);

  return { ...state, fetchTickets };
};
