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

export const authStore = createStore({
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
});

export const setAuth = (userData) => {
  authStore.setState((state) => ({ ...state, user: userData, isAuthenticated: !!userData }));
};

export const setLoading = (loading) => {
  authStore.setState((state) => ({ ...state, loading }));
};
