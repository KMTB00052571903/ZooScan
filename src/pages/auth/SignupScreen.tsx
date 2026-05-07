import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { signup as apiSignup } from '../../services/api';
import './auth.css';

export const SignupScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  const [name, setName]               = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [error, setError]             = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [loading, setLoading]         = useState(false);

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
      const msg = err instanceof Error ? err.message : t('auth.signup.errorDefault');
      if (msg.toLowerCase().includes('ya existe') || msg.includes('409')) {
        setIsDuplicate(true);
        setError(t('auth.signup.errorExists'));
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
        <h1 className="auth-title">{t('auth.signup.title')}</h1>
        <p className="auth-subtitle">{t('auth.signup.subtitle')}</p>

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
                  {t('auth.signup.errorExistsLink')}
                </span>
              </div>
            )}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSignup}>
          <input
            type="text"
            className="auth-input"
            placeholder={t('auth.signup.name')}
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="auth-input"
            placeholder={t('auth.signup.email')}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="auth-input"
            placeholder={t('auth.signup.password')}
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? t('auth.signup.submitting') : t('auth.signup.submit')}
          </button>
        </form>

        <div className="auth-footer">
          {t('auth.signup.hasAccount')}{' '}
          <span className="auth-link" onClick={() => navigate('/login')}>
            {t('auth.signup.login')}
          </span>
        </div>
      </div>
    </div>
  );
};
