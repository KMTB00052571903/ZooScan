import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import './auth.css';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Log in to ZooScan</p>

        {error && (
          <div style={{
            background: 'rgba(220,38,38,0.15)',
            border: '1px solid rgba(220,38,38,0.4)',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#fca5a5',
            fontSize: '14px',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            className="auth-input"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <span className="auth-link" onClick={() => navigate('/signup')}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};
