import { useReveal } from '../hooks/useReveal';

const VALUE_PROPS = [
  {
    tag: 'Simple',
    title: 'One Partner. Total Coverage.',
    desc: 'No need to juggle multiple agencies and third-party consultants. We bring you a team of subject matter experts dedicated to growing your business under one roof.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    tag: 'Fast',
    title: 'Accelerate From Day One.',
    desc: 'Hit the ground running with all the tools and people in one place, ready to race. An immediate executive team to reduce friction and scale faster.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    tag: 'Targeted',
    title: 'Precision Growth.',
    desc: 'Reduce growth conflicts between channels. We ensure that the strategy and execution supports true omni-channel growth without cannibalization.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    tag: 'Value',
    title: 'Multiplier Returns.',
    desc: 'Eliminate overlapping costs and questionable impact at all growth stages. Executive leadership at a fraction of the cost with exponential return.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    tag: 'Long-Term',
    title: 'Sustained Partnerships.',
    desc: 'Personalized focus on select brand partners to ensure each client receives specialized expertise from our leadership team for lasting impact.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function BusinessModel() {
  const sectionRef = useReveal();

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

      <div className="section-container">
        {/* Header */}
        <div className="reveal text-center mb-6">
          <span className="section-tag">Why Syntax</span>
        </div>

        <div className="reveal reveal-delay-1 text-center mb-20">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-bone leading-tight">
            The Growth Partner You Can
            <span className="block bg-gradient-to-r from-teal to-blue bg-clip-text text-transparent">
              Actually Count On
            </span>
          </h2>
          <p className="font-heading text-sm text-teal uppercase tracking-[0.2em] mt-6">
            We're not just different. We're better.
          </p>
        </div>

        {/* Value Props — asymmetric bento grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUE_PROPS.map((prop, i) => (
            <div
              key={prop.title}
              className={`reveal reveal-delay-${i + 1} group relative glass-card rounded-sm p-8 hover:border-teal/20 transition-all duration-500 ${
                i === 0 ? 'lg:col-span-2' : ''
              } ${i === 3 ? 'lg:col-span-2' : ''}`}
            >
              {/* Tag */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal group-hover:bg-teal/20 transition-colors duration-300">
                  {prop.icon}
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
            The traditional growth model is broken. As your trusted partner,
            Syntax streamlines your sales and marketing efforts based on years
            of experience at the executive level.
          </p>
          <a
            href="#team"
            onClick={(e) => handleScroll(e, '#team')}
            className="btn-primary"
          >
            Meet The Team
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
