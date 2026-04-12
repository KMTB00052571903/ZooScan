import { useNavigate } from 'react-router-dom';
import './auth.css';

export const SignupScreen = () => {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join ZooScan today</p>
        
        <form className="auth-form" onSubmit={handleSignup}>
          <input 
            type="text" 
            className="auth-input" 
            placeholder="Full name" 
            required 
          />
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
            Sign up
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? 
          <span className="auth-link" onClick={() => navigate('/login')}>
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};
