import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthForm } from '../components/ui/AuthForm';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [error, setError]           = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de autenticación');
    } finally {
      setSubmitting(false);
    }
  };

  const demoCredentials = (
    <div style={{
      marginTop: '20px',
      padding: '12px',
      background: 'rgba(0,119,204,0.08)',
      borderRadius: '10px',
      fontSize: '12px',
      color: 'rgba(226,238,255,0.5)',
      textAlign: 'center',
      lineHeight: '1.7'
    }}>
      <strong style={{ color: 'rgba(226,238,255,0.7)' }}>Demo staff:</strong><br />
      staff@zoo.com / staff123<br />
      <span style={{ fontSize: '11px', color: 'rgba(226,238,255,0.35)' }}>
        Solo cuentas con rol "staff" pueden acceder
      </span>
    </div>
  );

  return (
    <AuthForm
      logo="🦁"
      title="ZooControl"
      subtitle="Dashboard del personal del zoológico"
      error={error}
      onSubmit={handleSubmit}
      email={email}
      onEmailChange={setEmail}
      password={password}
      onPasswordChange={setPassword}
      submitting={submitting}
      submitLabel="Entrar al dashboard"
      loadingLabel="Iniciando sesión..."
      footer={demoCredentials}
    />
  );
};
