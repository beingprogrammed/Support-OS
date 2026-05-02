const createStore = (initialState) => {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,
    setState: (nextState) => {
      state = typeof nextState === 'function' ? nextState(state) : nextState;
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

export const ticketStore = createStore({
  tickets: [],
  filter: 'all',
  selectedTicket: null,
  loading: false,
});

export const setTickets = (tickets) => {
  ticketStore.setState((state) => ({ ...state, tickets }));
};

export const updateTicketInStore = (updatedTicket) => {
  ticketStore.setState((state) => ({
    ...state,
    tickets: state.tickets.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)),
  }));
};
