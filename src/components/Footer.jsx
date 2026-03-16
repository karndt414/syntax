export default function Footer() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-void border-t border-steel/20 overflow-hidden">
      {/* Top glow line */}
      <div className="glow-line w-full" />

      <div className="section-container py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Syntax" className="h-8 w-auto" />
              <span className="font-display text-xl font-bold tracking-tight text-bone">
                SYNTAX
              </span>
            </div>
            <p className="font-body text-sm text-smoke leading-relaxed max-w-xs">
              Data-driven strategies that accelerate your business growth
              with predictable, measurable results.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-xs font-semibold text-teal uppercase tracking-[0.15em] mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'Services', href: '#services' },
                { label: 'How We Work', href: '#process' },
                { label: 'Team', href: '#team' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="font-body text-sm text-smoke hover:text-teal transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-semibold text-teal uppercase tracking-[0.15em] mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {['Data Analytics', 'Growth Strategy', 'Predictive Modeling', 'Process Automation'].map((item) => (
                <li key={item}>
                  <span className="font-body text-sm text-smoke">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-semibold text-teal uppercase tracking-[0.15em] mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@syntax.io" className="font-body text-sm text-smoke hover:text-teal transition-colors duration-300">
                  hello@syntax.io
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="font-body text-sm text-smoke hover:text-teal transition-colors duration-300">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="font-body text-sm text-smoke">San Francisco, CA</li>
            </ul>
            <a
              href="#consultation"
              onClick={(e) => handleScroll(e, '#consultation')}
              className="btn-outline mt-6 text-xs py-2 px-5"
            >
              Book a Call
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-steel/30 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-body text-xs text-ash">
            © {new Date().getFullYear()} Syntax. All rights reserved.
          </span>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <span key={item} className="font-body text-xs text-ash">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
