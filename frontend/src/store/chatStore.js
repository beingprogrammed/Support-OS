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

export const chatStore = createStore({
  messages: [],
  activeTicketId: null,
  isTyping: false,
});

export const setMessages = (messages) => {
  chatStore.setState((state) => ({ ...state, messages }));
};

export const addMessage = (message) => {
  chatStore.setState((state) => ({ ...state, messages: [...state.messages, message] }));
};
