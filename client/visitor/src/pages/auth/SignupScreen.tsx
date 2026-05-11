import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/useAuth';
import { AuthForm } from '../../components/ui/AuthForm';
import './auth.css';

export const SignupScreen = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [error, setError]           = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signUp(email, password);
      toast.success('Account created! Welcome to ZooScan 🎉');
      navigate('/home');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error creating the account';
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthForm
      title="Create Account"
      subtitle="Join ZooScan today"
      error={error}
      onSubmit={handleSubmit}
      email={email}
      onEmailChange={setEmail}
      password={password}
      onPasswordChange={setPassword}
      submitting={submitting}
      submitLabel="Sign up"
      loadingLabel="Creating account..."
      passwordMinLength={6}
      footer={
        <>
          Already have an account?{' '}
          <span className="auth-link" onClick={() => navigate('/login')}>
            Log in
          </span>
        </>
      }
    />
  );
};
