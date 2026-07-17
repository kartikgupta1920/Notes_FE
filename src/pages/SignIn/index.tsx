import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '../../api/Login';
import TextInput from '../../components/InputTypes/TestInput';
import Button from '../../components/Button';
import { NotebookIcon, AlertCircleIcon, EyeIcon, EyeOffIcon, ShieldIcon, ZapIcon, LayersIcon } from '../../components/Icons';

export default function SignIn() {
  const navigate = useNavigate();
  const { loginMutation, isLoading, error } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation({ email, password });
      navigate('/notes');
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-hero">
        <div className="auth-hero-content">
          <span className="auth-hero-badge"><NotebookIcon width={14} height={14} /> Notes, reimagined</span>
          <h1>All your thoughts,<br />beautifully organized.</h1>
          <p>Capture ideas the moment they strike. Pin what matters, tag what's important, find anything in seconds.</p>

          <div style={{ marginTop: 28 }}>
            <div className="auth-hero-feature"><ShieldIcon /> Secure, private, always yours</div>
            <div className="auth-hero-feature"><ZapIcon /> Instant search across every note</div>
            <div className="auth-hero-feature"><LayersIcon /> Organize with categories and pins</div>
          </div>
        </div>
        <p className="auth-hero-quote">&ldquo;The best note is the one you actually write down.&rdquo;</p>
      </div>

      <div className="auth-panel">
        <div className="auth-card animate-fade-up">
          <div className="auth-card-brand">
            <span className="brand-mark"><NotebookIcon width={18} height={18} /></span>
            <span className="brand-text" style={{ fontWeight: 800, fontSize: 18 }}>NotesApp</span>
          </div>

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Enter your credentials to access your notes.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <TextInput
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              autoComplete="email"
            />

            <div className="field">
              <label htmlFor="password" className="field-label">Password</label>
              <div className="input-affix">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button type="button" className="input-affix-btn" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? 'Hide characters' : 'Show characters'} title={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOffIcon width={16} height={16} /> : <EyeIcon width={16} height={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="auth-error">
                <AlertCircleIcon width={15} height={15} /> {error}
              </p>
            )}

            <Button type="submit" isLoading={isLoading} fullWidth>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
