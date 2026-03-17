import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'How We Work', href: '#process' },
  { label: 'Business Model', href: '#model' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(5,5,5,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 2xl:px-16 h-20 flex items-center justify-between">
        <a href="#hero" onClick={(e) => handleClick(e, '#hero')} className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Syntax" className="h-9 w-auto transition-transform duration-300 group-hover:scale-105" />
          <span className="font-display text-xl font-bold tracking-tight text-bone hidden sm:block">SYNTAX</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => handleClick(e, item.href)} className="nav-link">
              {item.label}
            </a>
          ))}
          <a href="#consultation" onClick={(e) => handleClick(e, '#consultation')} className="btn-primary ml-4 text-xs py-3 px-6">
            Book a Call
          </a>
        </div>

        <button
          className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          <span className={`block w-6 h-0.5 bg-bone transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-bone transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-bone transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div id="mobile-navigation" className={`mobile-nav fixed inset-0 bg-void/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 lg:hidden ${mobileOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className="font-display text-3xl font-bold text-bone hover:text-teal transition-colors duration-300"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {item.label}
          </a>
        ))}
        <a href="#consultation" onClick={(e) => handleClick(e, '#consultation')} className="btn-primary mt-4">
          Book a Call
        </a>
      </div>
    </nav>
  );
}
