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

export const uiStore = createStore({
  sidebarOpen: true,
  theme: 'dark',
  notifications: [],
});

export const toggleSidebar = () => {
  uiStore.setState((state) => ({ ...state, sidebarOpen: !state.sidebarOpen }));
};

export const addNotification = (notification) => {
  uiStore.setState((state) => ({
    ...state,
    notifications: [...state.notifications, { id: Date.now(), ...notification }],
  }));
};
