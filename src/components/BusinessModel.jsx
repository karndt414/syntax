import { useReveal } from '../hooks/useReveal';
export default function BusinessModel({ data }) {
  const sectionRef = useReveal();
  const valueProps = data?.cards || [];

  const handleScroll = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="model" ref={sectionRef} className="relative py-44 overflow-hidden bg-obsidian dot-grid">
      {/* Diagonal accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

      {/* Ambient orb */}
      <div className="orb w-[700px] h-[700px] bg-blue/3 bottom-[-20%] left-[-15%]" style={{ animationDelay: '6s' }} />

      <div className="max-w-[100rem] mx-auto px-6 lg:px-12 2xl:px-16">
        {/* Header */}
        <div className="reveal text-center mb-6">
          <span className="section-tag">{data?.tag || 'Why Syntax'}</span>
        </div>

        <div className="reveal reveal-delay-1 text-center mb-20">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-bone leading-tight">
            {data?.title || 'The Growth Partner You Can'}
            <span className="block bg-gradient-to-r from-teal to-blue bg-clip-text text-transparent">
              {data?.titleAccent || 'Actually Count On'}
            </span>
          </h2>
          <p className="font-heading text-sm text-teal uppercase tracking-[0.2em] mt-6">
            {data?.subtitle || "We're not just different. We're better."}
          </p>
        </div>

        {/* Value Props — asymmetric bento grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {valueProps.map((prop, i) => (
            <div
              key={prop.title}
              className={`reveal reveal-delay-${i + 1} group relative glass-card rounded-sm p-8 hover:border-teal/20 transition-all duration-500 ${
                prop.span === 'wide' ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Tag */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal group-hover:bg-teal/20 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={prop.iconPath} />
                  </svg>
                </div>
                <span className="font-heading text-xs font-semibold text-teal uppercase tracking-[0.15em]">
                  {prop.tag}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-bone mb-3 group-hover:text-teal transition-colors duration-300">
                {prop.title}
              </h3>
              <p className="font-body text-smoke leading-relaxed">
                {prop.desc}
              </p>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 right-0 w-[1px] h-10 bg-gradient-to-t from-teal/30 to-transparent" />
                <div className="absolute bottom-0 right-0 w-10 h-[1px] bg-gradient-to-l from-teal/30 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal reveal-delay-4 text-center mt-16">
          <p className="font-body text-smoke max-w-2xl mx-auto mb-8">
            {data?.ctaText}
          </p>
          <a
            href="#team"
            onClick={(e) => handleScroll(e, '#team')}
            className="btn-primary"
          >
            {data?.ctaLabel || 'Meet The Team'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
