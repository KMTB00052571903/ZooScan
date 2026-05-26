import { useEffect } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

export const useRealtime = () => {
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL ?? 'http://localhost:3000');
    socket.emit('join:visitor');

    socket.on('announcement:new', (data: { message: string; animal_id?: string }) => {
      toast(`📢 ${data.message}`, { duration: 5000 });
    });

    return () => { socket.disconnect(); };
  }, []);
};
