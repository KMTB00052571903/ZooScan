import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

interface ToastMessage {
  id: number;
  message: string;
  animal: { name: string } | null;
}

// Componente global que escucha anuncios en tiempo real via WebSocket
// y los muestra como toasts en la parte superior de la pantalla
export const AnnouncementToast = () => {
  const { isAuthenticated } = useAuth();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // En dev conectamos directo al backend (Vite proxy no maneja bien WS de Socket.IO).
    // En producción usamos la misma origin.
    const SOCKET_URL = import.meta.env.DEV ? 'http://localhost:4000' : '';
    const socket = io(`${SOCKET_URL}/visitors`, {
      transports: ['polling', 'websocket']
    });

    socket.on('announcement:new', (data: ToastMessage) => {
      const toast: ToastMessage = {
        id: Date.now(),
        message: data.message,
        animal: data.animal
      };
      setToasts(prev => [toast, ...prev].slice(0, 3)); // máximo 3 toasts visibles

      // Auto-dismiss después de 6 segundos
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 6000);
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated]);

  const dismiss = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'min(90vw, 440px)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      pointerEvents: 'none'
    }}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          onClick={() => dismiss(toast.id)}
          style={{
            background: 'linear-gradient(135deg, #1B4D3E, #2d6a4f)',
            color: '#fff',
            borderRadius: '14px',
            padding: '14px 18px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(82,183,136,0.4)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            cursor: 'pointer',
            pointerEvents: 'auto',
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          <span style={{ fontSize: '20px', flexShrink: 0 }}>📢</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            {toast.animal && (
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#52b788',
                marginBottom: '3px'
              }}>
                🦁 {toast.animal.name}
              </div>
            )}
            <div style={{ fontSize: '14px', lineHeight: '1.4', fontFamily: 'Outfit, sans-serif' }}>
              {toast.message}
            </div>
          </div>
          <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>✕</span>
        </div>
      ))}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
