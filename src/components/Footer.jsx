function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-dark border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6V12C4 16.418 7.582 20.278 12 22C16.418 20.278 20 16.418 20 12V6L12 2Z" fill="white" fillOpacity="0.9"/>
              <circle cx="12" cy="12" r="4" fill="#EE4045" stroke="white" strokeWidth="1.5"/>
              <path d="M12 10V12.5L13.5 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-quaternary font-bold text-base">
            Expiry<span className="text-tertiary">Guard</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-quaternary/40 text-sm text-center">
          &copy; {currentYear} ExpiryGuard. All rights reserved.
        </p>

        {/* Links */}
        <nav className="flex items-center gap-5" aria-label="Footer navigation">
          <a
            id="footer-login-link"
            href="/login"
            className="text-sm text-quaternary/50 hover:text-quaternary transition-colors duration-200"
          >
            Login
          </a>
          <a
            id="footer-register-link"
            href="/register"
            className="text-sm text-quaternary/50 hover:text-quaternary transition-colors duration-200"
          >
            Register
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
