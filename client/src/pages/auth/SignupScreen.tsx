import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import "./auth.css";

export const SignupScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 🔐 1) Crear usuario en Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const user = data.user;
      if (!user) throw new Error("User not returned after signup");

      // 👤 2) Crear profile en tabla profiles
      const usernameFromEmail = email.split("@")[0];

      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        name: "User",
        username: usernameFromEmail,
        avatar_url: "",
      });

      if (profileError) throw profileError;

      // ✅ 3) Redirigir
      navigate("/home");

    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error creating the account"
      );
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
          <div
            style={{
              background: "rgba(220,38,38,0.15)",
              border: "1px solid rgba(220,38,38,0.4)",
              borderRadius: "10px",
              padding: "10px 14px",
              color: "#fca5a5",
              fontSize: "14px",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSignup}>
          <input
            type="email"
            className="auth-input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="auth-input"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};