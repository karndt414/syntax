export default function Footer({ data }) {
  const handleScroll = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-void border-t border-steel/20 overflow-hidden">
      {/* Top glow line */}
      <div className="glow-line w-full" />

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 2xl:px-16 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Syntax" className="h-8 w-auto" />
              <span className="font-display text-xl font-bold tracking-tight text-bone">
                {data?.brand || 'SYNTAX'}
              </span>
            </div>
            <p className="font-body text-sm text-smoke leading-relaxed max-w-xs">
              {data?.brandText}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-xs font-semibold text-teal uppercase tracking-[0.15em] mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {(data?.navigation || []).map((link) => (
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
              {(data?.services || []).map((item) => (
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
                <a href={`mailto:${data?.email || 'hello@syntax.io'}`} className="font-body text-sm text-smoke hover:text-teal transition-colors duration-300">
                  {data?.email || 'hello@syntax.io'}
                </a>
              </li>
              <li>
                <a href={`tel:${(data?.phone || '+1 (555) 123-4567').replace(/[^+\d]/g, '')}`} className="font-body text-sm text-smoke hover:text-teal transition-colors duration-300">
                  {data?.phone || '+1 (555) 123-4567'}
                </a>
              </li>
              <li className="font-body text-sm text-smoke">{data?.location || 'San Francisco, CA'}</li>
            </ul>
            <a
              href="#consultation"
              onClick={(e) => handleScroll(e, '#consultation')}
              className="btn-outline mt-6 text-xs py-2 px-5"
            >
              {data?.ctaLabel || 'Book a Call'}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-steel/30 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-body text-xs text-ash">
            © {new Date().getFullYear()} Syntax. All rights reserved.
          </span>
          <div className="flex gap-6">
            {(data?.legalLinks || []).map((item) => (
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
