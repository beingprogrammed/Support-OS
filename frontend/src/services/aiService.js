import axiosInstance from './axiosInstance';

const aiService = {
  getSuggestedReply: async (ticketId) => {
    const response = await axiosInstance.get(`/ai/suggested-reply/${ticketId}`);
    return response.data;
  },
  summarizeTicket: async (ticketId) => {
    const response = await axiosInstance.post(`/ai/summarize/${ticketId}`);
    return response.data;
  },
  classifySentiment: async (text) => {
    const response = await axiosInstance.post('/ai/sentiment', { text });
    return response.data;
  },
};

export default aiService;
