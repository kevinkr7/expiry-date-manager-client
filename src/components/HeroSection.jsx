function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-primary"
      aria-labelledby="hero-heading"
    >
      {/* Background decorative blobs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#EE4045' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: '#E8ADB1' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: '#FFFFFA' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" aria-hidden="true" />
          <span className="text-sm text-tertiary font-medium tracking-wide">Smart Expiry Tracking</span>
        </div>

        {/* Heading */}
        <h1
          id="hero-heading"
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-quaternary leading-tight tracking-tight"
        >
          Know Before{' '}
          <span
            className="relative inline-block"
            style={{ color: '#EE4045' }}
          >
            It Expires
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 9C60 3 120 3 150 5C180 7 240 9 298 4"
                stroke="#E8ADB1"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Sub-heading */}
        <p className="text-lg sm:text-xl text-quaternary/70 max-w-2xl leading-relaxed">
          ExpiryGuard helps you effortlessly track expiry dates of your products.
          Scan barcodes with your camera, get smart alerts, and{' '}
          <span className="text-tertiary font-medium">never waste food, medicine, or money again.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <a
            id="hero-login-cta"
            href="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold text-quaternary border-2 border-white/30 hover:border-white/60 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            Login
          </a>
          <a
            id="hero-register-cta"
            href="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold bg-secondary text-white shadow-xl hover:shadow-secondary/40 hover:bg-secondary-light transition-all duration-200 hover:-translate-y-0.5 hover:scale-105"
          >
            Get Started Free →
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mt-4 pt-8 border-t border-white/10 w-full">
          {[
            { value: 'UPC Scan', label: 'Barcode support' },
            { value: 'Instant', label: 'Expiry alerts' },
            { value: 'Free', label: 'To get started' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-quaternary">{stat.value}</div>
              <div className="text-sm text-quaternary/50 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-40" aria-hidden="true">
        <span className="text-quaternary text-xs tracking-widest uppercase">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
