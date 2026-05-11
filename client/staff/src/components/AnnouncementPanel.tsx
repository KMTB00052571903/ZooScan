import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAnnouncements } from '../context/useAnnouncements';
import type { Animal } from '../types';

interface Props {
  animals: Animal[];
}

export const AnnouncementPanel = ({ animals }: Props) => {
  const { createAnnouncement } = useAnnouncements();
  const [message, setMessage]   = useState('');
  const [animalId, setAnimalId] = useState<number | null>(null);
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const handleSend = async () => {
    if (!message.trim()) return;
    setError(null);
    setSending(true);
    try {
      await createAnnouncement(message.trim(), animalId);
      toast.success('¡Anuncio enviado a todos los visitantes!');
      setSent(true);
      setMessage('');
      setAnimalId(null);
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar anuncio');
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
          marginTop: '10px',
          fontSize: '13px',
          color: '#fca5a5',
          background: 'rgba(239,68,68,0.1)',
          borderRadius: '8px',
          padding: '8px 12px'
        }}>
          {error}
        </div>
      )}

      {sent && (
        <div className="announcement-success">
          ✅ Anuncio enviado a todos los visitantes conectados
        </div>
      )}
    </div>
  );
};
