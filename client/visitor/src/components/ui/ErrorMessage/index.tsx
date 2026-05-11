interface Props {
  message: string;
}

export const ErrorMessage = ({ message }: Props) => (
  <div style={{
    background: 'rgba(220,38,38,0.15)',
    border: '1px solid rgba(220,38,38,0.4)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: '#fca5a5',
    fontSize: '14px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  }}>
    <span>⚠️</span>
    {message}
  </div>
);
