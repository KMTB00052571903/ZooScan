import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAnnouncements } from '../context/useAnnouncements';
import type { Animal } from '../types';

interface Props {
  animals: Animal[];
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('es-CO', {
    hour: '2-digit', minute: '2-digit',
  });
}

export const AnnouncementPanel = ({ animals }: Props) => {
  const { createAnnouncement, recentAnnouncements } = useAnnouncements();
  const [message, setMessage]   = useState('');
  const [animalId, setAnimalId] = useState<number | null>(null);
  const [sending, setSending]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const handleSend = async () => {
    if (!message.trim()) return;
    setError(null);
    setSending(true);
    try {
      await createAnnouncement(message.trim(), animalId);
      toast.success('¡Anuncio enviado a todos los visitantes!');
      setMessage('');
      setAnimalId(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al enviar anuncio';
      setError(msg);
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="announcement-panel">
      <div className="section-title">
        <span>📢</span> Enviar anuncio en vivo a los visitantes
      </div>

      <div className="announcement-form">
        <select
          className="announcement-select"
          value={animalId ?? ''}
          onChange={e => setAnimalId(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Sin animal específico</option>
          {animals.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

        <input
          type="text"
          className="announcement-input"
          placeholder="Ej: ¡Alimentación de pandas en 5 minutos en el sector B!"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') void handleSend(); }}
          maxLength={500}
        />

        <button
          className="announcement-btn"
          onClick={() => void handleSend()}
          disabled={sending || !message.trim()}
        >
          {sending ? 'Enviando...' : '📤 Enviar'}
        </button>
      </div>

      {error && (
        <div style={{
          marginTop: '10px', fontSize: '13px', color: '#fca5a5',
          background: 'rgba(239,68,68,0.1)', borderRadius: '8px', padding: '8px 12px',
        }}>
          {error}
        </div>
      )}

      {/* Last 5 announcements */}
      <div style={{ marginTop: '16px' }}>
        <p style={{
          fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px',
          color: 'rgba(226,238,255,0.35)', fontWeight: 600, marginBottom: '8px',
        }}>
          Últimos anuncios
        </p>

        {recentAnnouncements.length === 0 ? (
          <p style={{ fontSize: '13px', color: 'rgba(226,238,255,0.25)', fontStyle: 'italic' }}>
            No hay anuncios enviados aún.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {recentAnnouncements.map(a => (
              <div
                key={a.id}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '13px',
                }}
              >
                <span style={{ color: 'rgba(226,238,255,0.75)', flex: 1 }}>{a.message}</span>
                <span style={{ color: 'rgba(226,238,255,0.3)', whiteSpace: 'nowrap', flexShrink: 0, fontSize: '11px' }}>
                  {formatTime(a.created_at)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
