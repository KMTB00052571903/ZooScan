import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signup as apiSignup } from '../../services/api';
import './auth.css';

export const SignupScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsDuplicate(false);
    setLoading(true);

    try {
      const data = await apiSignup(name, email, password);
      login(data.token, data.role, data.name);
      navigate('/home');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al crear la cuenta';
      // 409 Conflict: email already registered
      if (msg.toLowerCase().includes('ya existe') || msg.includes('409')) {
        setIsDuplicate(true);
        setError('Este correo ya está registrado.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join ZooScan today</p>

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
            {isDuplicate && (
              <div style={{ marginTop: '8px' }}>
                <span
                  className="auth-link"
                  onClick={() => navigate('/login')}
                  style={{ fontSize: '13px' }}
                >
                  ¿Ya tienes cuenta? Iniciar sesión →
                </span>
              </div>
            )}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSignup}>
          <input
            type="text"
            className="auth-input"
            placeholder="Full name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
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
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <span className="auth-link" onClick={() => navigate('/login')}>
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};
