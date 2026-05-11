export interface FeedEvent {
  animal: {
    id: number;
    name: string;
    category: string;
    image_url: string;
  };
  user: {
    id: number;
    name: string;
  };
  timestamp: string;
}

interface Props {
  events: FeedEvent[];
}

// Formatea el tiempo relativo (ej: "hace 5s", "hace 2m")
function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60)  return `hace ${seconds}s`;
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)}m`;
  return `hace ${Math.floor(seconds / 3600)}h`;
}

export const LiveActivityFeed = ({ events }: Props) => {
  return (
    <div className="panel-card" style={{ height: '100%' }}>
      <div className="section-title">
        <span>📡</span> Actividad en vivo
        {events.length > 0 && (
          <span style={{
            marginLeft: 'auto',
            fontSize: '11px',
            color: 'rgba(226,238,255,0.3)',
            fontWeight: 400,
            textTransform: 'none',
            letterSpacing: 0
          }}>
            {events.length} evento{events.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="feed-list">
        {events.length === 0 ? (
          <div className="feed-empty">
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>📡</div>
            Esperando escaneos en tiempo real...
            <br />
            <span style={{ fontSize: '11px' }}>Los eventos aparecerán aquí al instante</span>
          </div>
        ) : (
          events.map((event, i) => (
            <div key={`${event.timestamp}-${i}`} className={`feed-item ${i === 0 ? 'new' : ''}`}>
              <img
                src={event.animal.image_url}
                alt={event.animal.name}
                className="feed-item-img"
                onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect fill="%230d1a2e" width="40" height="40"/><text x="50%" y="55%" text-anchor="middle" font-size="18">🦎</text></svg>'; }}
              />
              <div className="feed-item-info">
                <div className="feed-item-name">{event.animal.name}</div>
                <div className="feed-item-meta">
                  escaneado por <strong style={{ color: '#66b8f2' }}>{event.user.name}</strong>
                </div>
              </div>
              <div className="feed-item-time">{timeAgo(event.timestamp)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
