import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { login as apiLogin } from '../../services/api';
import './auth.css';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await apiLogin(email, password);
      login(data.token, data.role, data.name);
      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.login.errorDefault'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">{t('auth.login.title')}</h1>
        <p className="auth-subtitle">{t('auth.login.subtitle')}</p>

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
            placeholder={t('auth.login.email')}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="auth-input"
            placeholder={t('auth.login.password')}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? t('auth.login.submitting') : t('auth.login.submit')}
          </button>
        </form>

        <div style={{
          marginTop: '12px',
          padding: '10px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '10px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          lineHeight: '1.6'
        }}>
          {t('auth.login.demo')}
        </div>

        <div className="auth-footer">
          {t('auth.login.noAccount')}{' '}
          <span className="auth-link" onClick={() => navigate('/signup')}>
            {t('auth.login.signup')}
          </span>
        </div>
      </div>
    </div>
  );
};
