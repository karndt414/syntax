import { useReveal } from '../hooks/useReveal';

const ROTATING_WORDS = ['Optimize.', 'Analyze.', 'Scale.'];

export default function Hero() {
  const sectionRef = useReveal();

  const handleScroll = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="mesh-bg-hero relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="orb w-[600px] h-[600px] bg-teal/5 top-[-10%] left-[-5%]" />
      <div
        className="orb w-[400px] h-[400px] bg-blue/5 bottom-[10%] right-[5%]"
        style={{ animationDelay: '4s' }}
      />

      {/* Geometric accent lines */}
      <div className="absolute top-[20%] right-0 w-[40%] h-px bg-gradient-to-l from-teal/20 to-transparent" />
      <div className="absolute bottom-[30%] left-0 w-[30%] h-px bg-gradient-to-r from-teal/20 to-transparent" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-50" />

      <div className="section-container relative z-10 w-full py-20 lg:py-24">
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-12 lg:gap-10 items-center">
          {/* Left column — text */}
          <div className="max-w-[38rem] mx-auto lg:mx-0 text-center lg:text-left">
            <div className="reveal">
              <span className="section-tag mb-8 inline-block">
                <span className="glow-dot mr-2 inline-block w-2 h-2" />
                Data-Driven Growth
              </span>
            </div>

            <h1 className="reveal reveal-delay-1 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight mb-6">
              <span className="block text-bone">We Help You</span>
              <span className="block relative h-[1.15em] overflow-hidden word-cycle mt-2">
                {ROTATING_WORDS.map((word) => (
                  <span
                    key={word}
                    className="bg-gradient-to-r from-teal to-blue bg-clip-text text-transparent"
                  >
                    {word}
                  </span>
                ))}
              </span>
            </h1>

            <p className="reveal reveal-delay-2 font-body text-lg sm:text-xl text-smoke max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10">
              Syntax delivers data-driven strategies that accelerate your
              business growth with predictable, measurable results —
              turning complex data into your competitive edge.
            </p>

            <div className="reveal reveal-delay-3 flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#consultation"
                onClick={(e) => handleScroll(e, '#consultation')}
                className="btn-primary"
              >
                Schedule a Consultation
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#process"
                onClick={(e) => handleScroll(e, '#process')}
                className="btn-outline"
              >
                How We Work
              </a>
            </div>

            {/* Stats row */}
            <div className="reveal reveal-delay-4 flex flex-wrap gap-x-10 gap-y-6 mt-14 border-t border-steel/50 pt-8 justify-center lg:justify-start">
              {[
                { num: '200+', label: 'Clients Served' },
                { num: '97%', label: 'Retention Rate' },
                { num: '3.5×', label: 'Avg. ROI' },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="stat-glow font-display text-3xl sm:text-4xl font-extrabold text-teal">
                    {stat.num}
                  </span>
                  <span className="block font-heading text-xs text-ash uppercase tracking-widest mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — hero image */}
          <div className="reveal-scale reveal-delay-2 relative w-full max-w-[44rem] mx-auto lg:ml-auto">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-teal/20 rounded-sm" />
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-blue/10 rounded-sm" />
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src="/optimization.png"
                  alt="Syntax data optimization"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
              </div>
              {/* Floating accent badge */}
              <div className="absolute -bottom-6 -left-6 glass-card px-5 py-4 rounded-sm">
                <span className="font-heading text-xs text-teal uppercase tracking-widest block">
                  Performance
                </span>
                <span className="font-display text-2xl font-bold text-bone">
                  +340%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="font-heading text-[0.65rem] text-ash uppercase tracking-[0.2em]">
          Scroll
        </span>
        <svg className="w-4 h-4 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </div>
    </section>
  );
}
