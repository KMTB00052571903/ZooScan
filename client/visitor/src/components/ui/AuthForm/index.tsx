import type { ReactNode, FormEvent } from 'react';
import { ErrorMessage } from '../ErrorMessage';

interface Props {
  title: string;
  subtitle: string;
  error: string | null;
  onSubmit: (e: FormEvent) => void;
  email: string;
  onEmailChange: (v: string) => void;
  password: string;
  onPasswordChange: (v: string) => void;
  submitting: boolean;
  submitLabel: string;
  loadingLabel: string;
  passwordMinLength?: number;
  footer?: ReactNode;
}

export const AuthForm = ({
  title, subtitle, error, onSubmit,
  email, onEmailChange, password, onPasswordChange,
  submitting, submitLabel, loadingLabel,
  passwordMinLength, footer,
}: Props) => (
  <div className="auth-container">
    <div className="auth-card">
      <h1 className="auth-title">{title}</h1>
      <p className="auth-subtitle">{subtitle}</p>

      {error && <div style={{ marginBottom: '12px' }}><ErrorMessage message={error} /></div>}

      <form className="auth-form" onSubmit={onSubmit}>
        <input
          type="email"
          className="auth-input"
          placeholder="Email address"
          value={email}
          onChange={e => onEmailChange(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={password}
          onChange={e => onPasswordChange(e.target.value)}
          minLength={passwordMinLength}
          required
        />
        <button type="submit" className="auth-button" disabled={submitting}>
          {submitting ? loadingLabel : submitLabel}
        </button>
      </form>

      {footer && <div className="auth-footer">{footer}</div>}
    </div>
  </div>
);
