import axiosInstance from './axiosInstance';

const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await axiosInstance.post('/auth/forgot-password', { email });
    return response.data;
  },
};

export default authService;
