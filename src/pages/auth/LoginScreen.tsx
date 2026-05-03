import { useNavigate } from 'react-router-dom';
import './auth.css';

export const LoginScreen = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Log in to ZooScan</p>
        
        <form className="auth-form" onSubmit={handleLogin}>
          <input 
            type="email" 
            className="auth-input" 
            placeholder="Email address" 
            required 
          />
          <input 
            type="password" 
            className="auth-input" 
            placeholder="Password" 
            required 
          />
          
          <button type="submit" className="auth-button">
            Log in
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? 
          <span className="auth-link" onClick={() => navigate('/signup')}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};
