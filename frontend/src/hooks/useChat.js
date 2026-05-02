import { useState, useEffect } from 'react';
import { chatStore, addMessage, setMessages } from '../store/chatStore';
import chatService from '../services/chatService';

export const useChat = (ticketId) => {
  const [state, setState] = useState(chatStore.getState());

  useEffect(() => {
    const unsubscribe = chatStore.subscribe(setState);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (ticketId) {
      chatService.getMessages(ticketId).then(setMessages);
    }
  }, [ticketId]);

  const sendMessage = async (content) => {
    if (!ticketId) return;
    const newMessage = await chatService.sendMessage(ticketId, { content });
    addMessage(newMessage);
  };

  return { ...state, sendMessage };
};
