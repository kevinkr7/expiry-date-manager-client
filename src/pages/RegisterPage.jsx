import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../utils/api'

// ─── Password strength helper ──────────────────────────────────────────────
function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '' }
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const levels = [
    { label: '', color: '' },
    { label: 'Very weak', color: '#EE4045' },
    { label: 'Weak', color: '#f97316' },
    { label: 'Fair', color: '#eab308' },
    { label: 'Strong', color: '#22c55e' },
    { label: 'Very strong', color: '#16a34a' },
  ]
  return { score, ...levels[score] }
}

function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState({ message: '', isEmailTaken: false })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const strength = getPasswordStrength(form.password)

  // ─── Validation ──────────────────────────────────────────────────────────
  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email) {
      errs.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!form.password) {
      errs.password = 'Password is required.'
    } else if (form.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.'
    }
    if (!form.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.'
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.'
    }
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    if (serverError.message) setServerError({ message: '', isEmailTaken: false })
  }

  // ─── Submit ───────────────────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    setServerError({ message: '', isEmailTaken: false })
    try {
      await authApi.register(form.name.trim(), form.email, form.password)
      navigate('/login', { state: { registered: true } })
    } catch (err) {
      if (err.status === 409) {
        setServerError({ message: err.message, isEmailTaken: true })
      } else {
        setServerError({ message: err.message, isEmailTaken: false })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left Brand Panel ── */}
      <div className="auth-brand-panel">
        <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#EE4045' }} aria-hidden="true" />
        <div className="absolute bottom-1/4 -right-24 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: '#E8ADB1' }} aria-hidden="true" />

        <div className="relative z-10 max-w-sm text-center flex flex-col items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Go to homepage">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-200">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2L4 6V12C4 16.418 7.582 20.278 12 22C16.418 20.278 20 16.418 20 12V6L12 2Z" fill="white" fillOpacity="0.9"/>
                <circle cx="12" cy="12" r="4" fill="#EE4045" stroke="white" strokeWidth="1.5"/>
                <path d="M12 10V12.5L13.5 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-3xl font-bold text-quaternary tracking-tight">
              Expiry<span className="text-tertiary">Guard</span>
            </span>
          </Link>

          <h2 className="text-2xl font-semibold text-quaternary/90 leading-snug">
            Start for free.<br />
            <span className="text-tertiary">No credit card needed.</span>
          </h2>

          <p className="text-quaternary/50 text-sm leading-relaxed">
            Create your account and start tracking product expiry dates in minutes. Scan barcodes, get smart reminders, reduce waste.
          </p>

          <div className="flex flex-col gap-3 w-full mt-2">
            {[
              { icon: '✅', text: 'Free forever plan' },
              { icon: '📦', text: 'Unlimited product tracking' },
              { icon: '🔔', text: 'Expiry notifications' },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                <span className="text-lg" aria-hidden="true">{f.icon}</span>
                <span className="text-sm text-quaternary/70">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex items-center justify-center bg-quaternary px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="auth-mobile-logo flex items-center gap-2 mb-8" aria-label="Go to homepage">
            <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L4 6V12C4 16.418 7.582 20.278 12 22C16.418 20.278 20 16.418 20 12V6L12 2Z" fill="white" fillOpacity="0.9"/>
                <circle cx="12" cy="12" r="4" fill="#EE4045" stroke="white" strokeWidth="1.5"/>
                <path d="M12 10V12.5L13.5 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-primary">Expiry<span className="text-secondary">Guard</span></span>
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-primary">Create account</h1>
            <p className="text-primary/50 mt-1 text-sm">
              Already have an account?{' '}
              <Link id="register-to-login-link" to="/login" className="text-secondary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Server error */}
          {serverError.message && (
            <div
              id="register-server-error"
              role="alert"
              className={`mb-6 flex items-start gap-3 rounded-xl px-4 py-3 border ${
                serverError.isEmailTaken
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-secondary/10 border-secondary/30'
              }`}
            >
              {serverError.isEmailTaken ? (
                // Email already in use — amber warning with login CTA
                <>
                  <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <p className="text-amber-800 text-sm">
                    <span className="font-semibold">This email is already registered.</span>{' '}
                    <Link
                      id="register-error-login-link"
                      to="/login"
                      className="underline font-semibold hover:text-amber-900 transition-colors"
                    >
                      Sign in instead →
                    </Link>
                  </p>
                </>
              ) : (
                // Generic error — red
                <>
                  <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EE4045" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p className="text-secondary text-sm font-medium">{serverError.message}</p>
                </>
              )}
            </div>
          )}

          {/* Form */}
          <form id="register-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="register-name" className="text-sm font-semibold text-primary/80">
                Full name
              </label>
              <input
                id="register-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                autoComplete="name"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-primary bg-white placeholder:text-primary/30 outline-none transition-all duration-200
                  focus:ring-2 focus:ring-primary/30 focus:border-primary
                  ${errors.name ? 'border-secondary bg-secondary/5 focus:ring-secondary/20 focus:border-secondary' : 'border-primary/20'}`}
                aria-describedby={errors.name ? 'register-name-error' : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p id="register-name-error" role="alert" className="text-secondary text-xs font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="register-email" className="text-sm font-semibold text-primary/80">
                Email address
              </label>
              <input
                id="register-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-primary bg-white placeholder:text-primary/30 outline-none transition-all duration-200
                  focus:ring-2 focus:ring-primary/30 focus:border-primary
                  ${errors.email ? 'border-secondary bg-secondary/5 focus:ring-secondary/20 focus:border-secondary' : 'border-primary/20'}`}
                aria-describedby={errors.email ? 'register-email-error' : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p id="register-email-error" role="alert" className="text-secondary text-xs font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="register-password" className="text-sm font-semibold text-primary/80">
                Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                  className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm text-primary bg-white placeholder:text-primary/30 outline-none transition-all duration-200
                    focus:ring-2 focus:ring-primary/30 focus:border-primary
                    ${errors.password ? 'border-secondary bg-secondary/5 focus:ring-secondary/20 focus:border-secondary' : 'border-primary/20'}`}
                  aria-describedby="register-password-strength"
                  aria-invalid={!!errors.password}
                />
                <button
                  id="register-toggle-password"
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
                >
                  {showPassword
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>

              {/* Strength meter */}
              {form.password && (
                <div id="register-password-strength" aria-live="polite" className="flex flex-col gap-1.5 mt-0.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          background: i <= strength.score ? strength.color : '#e5e7eb',
                        }}
                      />
                    ))}
                  </div>
                  {strength.label && (
                    <span className="text-xs font-medium" style={{ color: strength.color }}>
                      {strength.label}
                    </span>
                  )}
                </div>
              )}

              {errors.password && (
                <p role="alert" className="text-secondary text-xs font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="register-confirm-password" className="text-sm font-semibold text-primary/80">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="register-confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm text-primary bg-white placeholder:text-primary/30 outline-none transition-all duration-200
                    focus:ring-2 focus:ring-primary/30 focus:border-primary
                    ${errors.confirmPassword ? 'border-secondary bg-secondary/5 focus:ring-secondary/20 focus:border-secondary' : 'border-primary/20'}`}
                  aria-describedby={errors.confirmPassword ? 'register-confirm-error' : undefined}
                  aria-invalid={!!errors.confirmPassword}
                />
                <button
                  id="register-toggle-confirm"
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
                >
                  {showConfirm
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
              {errors.confirmPassword && (
                <p id="register-confirm-error" role="alert" className="text-secondary text-xs font-medium">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              id="register-submit-btn"
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3.5 rounded-xl bg-secondary text-white font-semibold text-sm
                hover:bg-secondary-light transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round"/>
                </svg>
              )}
              {loading ? 'Creating account…' : 'Create free account'}
            </button>
          </form>

          <p className="text-center text-sm text-primary/40 mt-6">
            Already registered?{' '}
            <Link id="register-bottom-login-link" to="/login" className="text-primary font-semibold hover:text-secondary transition-colors">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
