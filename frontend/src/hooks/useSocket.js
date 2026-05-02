import { useEffect, useRef, useState } from 'react';
import { SOCKET_URL } from '../utils/constants';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Placeholder for actual socket implementation (e.g., socket.io-client)
    console.log(`Connecting to socket at ${SOCKET_URL}`);
    setIsConnected(true);

    return () => {
      console.log('Disconnecting socket');
      setIsConnected(false);
    };
  }, []);

  const emit = (event, data) => {
    console.log(`Emitting ${event}:`, data);
  };

  return { isConnected, emit };
};
