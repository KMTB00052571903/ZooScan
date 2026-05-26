import { useEffect } from 'react';
import { io } from 'socket.io-client';

export const useRealtime = (onNewScan: (data: unknown) => void) => {
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL ?? 'http://localhost:3000');
    socket.emit('join:staff');

    socket.on('scan:new', onNewScan);

    return () => { socket.disconnect(); };
  }, [onNewScan]);
};
