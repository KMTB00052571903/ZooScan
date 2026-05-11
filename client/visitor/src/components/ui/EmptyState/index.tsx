interface Props {
  icon?: string;
  title: string;
  message?: string;
}

export const EmptyState = ({ icon = '📭', title, message }: Props) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    gap: '0.5rem',
    textAlign: 'center',
  }}>
    <span style={{ fontSize: '2rem' }}>{icon}</span>
    <p style={{ color: 'var(--text-main)', fontWeight: 600, margin: 0 }}>{title}</p>
    {message && (
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>{message}</p>
    )}
  </div>
);
