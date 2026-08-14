import { useState } from 'react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md shadow-lg">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group" aria-label="ExpiryGuard Home">
          {/* Shield icon with clock */}
          <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 2L4 6V12C4 16.418 7.582 20.278 12 22C16.418 20.278 20 16.418 20 12V6L12 2Z" fill="white" fillOpacity="0.9"/>
              <circle cx="12" cy="12" r="4" fill="#EE4045" stroke="white" strokeWidth="1.5"/>
              <path d="M12 10V12.5L13.5 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-quaternary tracking-tight">
            Expiry<span className="text-tertiary">Guard</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2" role="navigation" aria-label="Main navigation">
          <a
            id="header-login-link"
            href="/login"
            className="px-5 py-2 rounded-lg text-sm font-medium text-quaternary/80 hover:text-quaternary hover:bg-white/10 transition-all duration-200"
          >
            Login
          </a>
          <a
            id="header-register-link"
            href="/register"
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-secondary text-white hover:bg-secondary-light shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            Register
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          id="header-menu-toggle"
          className="md:hidden p-2 rounded-lg text-quaternary hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-primary-dark border-t border-white/10 px-6 py-4 flex flex-col gap-2">
          <a
            id="header-mobile-login-link"
            href="/login"
            className="py-2.5 px-4 rounded-lg text-sm font-medium text-quaternary/80 hover:text-quaternary hover:bg-white/10 transition-all"
          >
            Login
          </a>
          <a
            id="header-mobile-register-link"
            href="/register"
            className="py-2.5 px-4 rounded-lg text-sm font-semibold bg-secondary text-white text-center hover:bg-secondary-light transition-all"
          >
            Register
          </a>
        </div>
      )}
    </header>
  )
}

export default Header
