import React, { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignup } from '../../api/Signup';
import TextInput from '../../components/InputTypes/TestInput';
import Button from '../../components/Button';
import { NotebookIcon, AlertCircleIcon, EyeIcon, EyeOffIcon, SparklesIcon, ShieldIcon, LayersIcon } from '../../components/Icons';

function passwordScore(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export default function SignUp() {
  const navigate = useNavigate();
  const { signupMutation, isLoading, error: apiError } = useSignup();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const strength = useMemo(() => passwordScore(password), [password]);
  const strengthColor = ['var(--border)', 'var(--danger)', 'var(--warning)', 'var(--accent)', 'var(--success)'][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    try {
      await signupMutation({ name, email, password, confirmPassword });
      navigate('/login');
    } catch (err) {
      // API Error handled by hook
    }
  };

  const displayError = validationError || apiError;

  return (
    <div className="auth-shell">
      <div className="auth-hero">
        <div className="auth-hero-content">
          <span className="auth-hero-badge"><SparklesIcon width={14} height={14} /> Join in seconds</span>
          <h1>Start organizing<br />your notes today.</h1>
          <p>A clean, focused space to jot down everything on your mind — synced and searchable wherever you go.</p>

          <div style={{ marginTop: 28 }}>
            <div className="auth-hero-feature"><ShieldIcon /> Free to use, no clutter</div>
            <div className="auth-hero-feature"><LayersIcon /> Pin, tag, and filter effortlessly</div>
          </div>
        </div>
        <p className="auth-hero-quote">&ldquo;A place for every idea, and every idea in its place.&rdquo;</p>
      </div>

      <div className="auth-panel">
        <div className="auth-card animate-fade-up">
          <div className="auth-card-brand">
            <span className="brand-mark"><NotebookIcon width={18} height={18} /></span>
            <span className="brand-text" style={{ fontWeight: 800, fontSize: 18 }}>NotesApp</span>
          </div>

          <h1 className="auth-title">Create an account</h1>
          <p className="auth-subtitle">Start organizing your notes today.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <TextInput
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Jane Doe"
              autoComplete="name"
            />
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
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
                <button type="button" className="input-affix-btn" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? 'Hide characters' : 'Show characters'} title={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOffIcon width={16} height={16} /> : <EyeIcon width={16} height={16} />}
                </button>
              </div>
              {password && (
                <div className="password-strength" aria-hidden="true">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="password-strength-seg"
                      style={{ background: i < strength ? strengthColor : 'var(--border)' }}
                    />
                  ))}
                </div>
              )}
            </div>

            <TextInput
              id="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />

            {displayError && (
              <p className="auth-error">
                <AlertCircleIcon width={15} height={15} /> {displayError}
              </p>
            )}

            <Button type="submit" isLoading={isLoading} fullWidth>
              {isLoading ? 'Creating account...' : 'Sign up'}
            </Button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
