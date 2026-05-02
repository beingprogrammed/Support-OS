import axiosInstance from './axiosInstance';

const chatService = {
  getMessages: async (ticketId) => {
    const response = await axiosInstance.get(`/tickets/${ticketId}/messages`);
    return response.data;
  },
  sendMessage: async (ticketId, messageData) => {
    const response = await axiosInstance.post(`/tickets/${ticketId}/messages`, messageData);
    return response.data;
  },
  uploadAttachment: async (ticketId, formData) => {
    const response = await axiosInstance.post(`/tickets/${ticketId}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default chatService;
