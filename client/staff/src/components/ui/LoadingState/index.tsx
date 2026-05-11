interface Props {
  fullScreen?: boolean;
  message?: string;
}

export const LoadingState = ({ fullScreen = false, message }: Props) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    ...(fullScreen ? { height: '100vh' } : { padding: '2rem 1rem' }),
  }}>
    <div style={{
      width: '36px',
      height: '36px',
      border: '3px solid rgba(226,238,255,0.1)',
      borderTopColor: '#0077cc',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    {message && (
      <p style={{ color: 'rgba(226,238,255,0.4)', fontSize: '0.85rem', margin: 0 }}>{message}</p>
    )}
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);
