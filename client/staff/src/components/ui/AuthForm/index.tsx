import type { FormEvent, ReactNode } from 'react';
import { ErrorMessage } from '../ErrorMessage';

interface Props {
  logo?: string;
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
  footer?: ReactNode;
}

export const AuthForm = ({
  logo, title, subtitle, error, onSubmit,
  email, onEmailChange, password, onPasswordChange,
  submitting, submitLabel, loadingLabel, footer,
}: Props) => (
  <div className="auth-wrapper">
    <div className="auth-card">
      {logo && <div className="auth-logo">{logo}</div>}
      <h1 className="auth-title">{title}</h1>
      <p className="auth-subtitle">{subtitle}</p>

      {error && <div style={{ marginBottom: '12px' }}><ErrorMessage message={error} /></div>}

      <form onSubmit={onSubmit}>
        <input
          type="email"
          className="auth-input"
          placeholder="Email del staff"
          value={email}
          onChange={e => onEmailChange(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          className="auth-input"
          placeholder="Contraseña"
          value={password}
          onChange={e => onPasswordChange(e.target.value)}
          required
        />
        <button type="submit" className="auth-button" disabled={submitting}>
          {submitting ? loadingLabel : submitLabel}
        </button>
      </form>

      {footer}
    </div>
  </div>
);
