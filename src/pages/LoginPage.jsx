import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { authApi } from '../utils/api'

function LoginPage() {
  const navigate = useNavigate()

  const location = useLocation()
  const justRegistered = location.state?.registered === true

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // ─── Validation ────────────────────────────────────────────────────────────
  function validate() {
    const errs = {}
    if (!form.email) {
      errs.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!form.password) errs.password = 'Password is required.'
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    if (serverError) setServerError('')
  }

  // ─── Submit ────────────────────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    setServerError('')
    try {
      await authApi.login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left Brand Panel ── */}
      <div className="auth-brand-panel">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#EE4045' }} aria-hidden="true" />
        <div className="absolute bottom-1/4 -right-24 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: '#E8ADB1' }} aria-hidden="true" />

        <div className="relative z-10 max-w-sm text-center flex flex-col items-center gap-6">
          {/* Logo */}
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
            Welcome back!<br />
            <span className="text-tertiary">Track. Alert. Never Waste.</span>
          </h2>

          <p className="text-quaternary/50 text-sm leading-relaxed">
            Sign in to manage your product expiry dates, scan barcodes, and stay on top of everything in your home.
          </p>

          {/* Feature pills */}
          <div className="flex flex-col gap-3 w-full mt-2">
            {[
              { icon: '🔒', text: 'Secure JWT authentication' },
              { icon: '📷', text: 'UPC barcode scanning' },
              { icon: '🔔', text: 'Smart expiry alerts' },
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
            <h1 className="text-3xl font-extrabold text-primary">Sign in</h1>
            <p className="text-primary/50 mt-1 text-sm">
              Don&apos;t have an account?{' '}
              <Link id="login-to-register-link" to="/register" className="text-secondary font-semibold hover:underline">
                Create one free
              </Link>
            </p>
          </div>

          {/* Success banner (after registration) */}
          {justRegistered && (
            <div
              id="login-registered-success"
              role="status"
              className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3"
            >
              <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <p className="text-green-700 text-sm font-medium">Account created! Please sign in to continue.</p>
            </div>
          )}

          {/* Server error banner */}
          {serverError && (
            <div
              id="login-server-error"
              role="alert"
              className="mb-6 flex items-start gap-3 bg-secondary/10 border border-secondary/30 rounded-xl px-4 py-3"
            >
              <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EE4045" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-secondary text-sm font-medium">{serverError}</p>
            </div>
          )}

          {/* Form */}
          <form id="login-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-email" className="text-sm font-semibold text-primary/80">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-primary bg-white placeholder:text-primary/30 outline-none transition-all duration-200
                  focus:ring-2 focus:ring-primary/30 focus:border-primary
                  ${errors.email ? 'border-secondary bg-secondary/5 focus:ring-secondary/20 focus:border-secondary' : 'border-primary/20'}`}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p id="login-email-error" role="alert" className="text-secondary text-xs font-medium mt-0.5">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-password" className="text-sm font-semibold text-primary/80">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm text-primary bg-white placeholder:text-primary/30 outline-none transition-all duration-200
                    focus:ring-2 focus:ring-primary/30 focus:border-primary
                    ${errors.password ? 'border-secondary bg-secondary/5 focus:ring-secondary/20 focus:border-secondary' : 'border-primary/20'}`}
                  aria-describedby={errors.password ? 'login-password-error' : undefined}
                  aria-invalid={!!errors.password}
                />
                <button
                  id="login-toggle-password"
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
              {errors.password && (
                <p id="login-password-error" role="alert" className="text-secondary text-xs font-medium mt-0.5">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3.5 rounded-xl bg-primary text-quaternary font-semibold text-sm
                hover:bg-primary-light transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round"/>
                </svg>
              )}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-primary/10" />
            <span className="text-xs text-primary/30 font-medium">OR</span>
            <div className="flex-1 h-px bg-primary/10" />
          </div>

          <p className="text-center text-sm text-primary/40">
            New to ExpiryGuard?{' '}
            <Link id="login-bottom-register-link" to="/register" className="text-primary font-semibold hover:text-secondary transition-colors">
              Create a free account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
