import { useReveal } from '../hooks/useReveal';

const SERVICES = [
  {
    title: 'Data Analytics',
    desc: 'Transform raw data into actionable insights with advanced analytics frameworks tailored to your business vertical.',
    image: '/beyond_results.png',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    title: 'Growth Strategy',
    desc: 'Scalable, channel-specific strategies that eliminate guesswork and maximize your revenue potential across every touchpoint.',
    image: '/optimization.png',
    iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
  {
    title: 'Predictive Modeling',
    desc: 'Leverage machine learning to forecast market shifts, optimize pricing, and stay three steps ahead of your competition.',
    image: '/what_if.png',
    iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    title: 'Process Automation',
    desc: 'Streamline operations and eliminate bottlenecks with intelligent automation that scales with your growth.',
    image: '/business_cycle.png',
    iconPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  },
];

export default function Services() {
  const sectionRef = useReveal();

  return (
    <section id="services" ref={sectionRef} className="mesh-bg relative py-44 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 2xl:px-16">
        <div className="reveal text-center mb-20">
          <span className="section-tag">What We Do</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-bone mt-6 mb-6">
            Meet Your Growth
            <span className="block bg-gradient-to-r from-teal to-blue bg-clip-text text-transparent">
              Everywhere It Matters
            </span>
          </h2>
          <p className="font-body text-lg text-smoke max-w-2xl mx-auto">
            Unlock your full growth potential with services engineered for measurable impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} group relative glass-card rounded-sm overflow-hidden ${
                i === 0 ? 'lg:row-span-2' : ''
              }`}
            >
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                <img src={service.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-graphite/90 via-graphite/80 to-void/95" />

              <div className={`relative z-10 p-8 sm:p-10 ${i === 0 ? 'lg:p-12 flex flex-col justify-between min-h-[500px]' : ''}`}>
                <div>
                  <div className="text-teal mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.iconPath} />
                    </svg>
                  </div>
                  <h3 className={`font-display font-bold text-bone mb-4 ${i === 0 ? 'text-3xl lg:text-4xl' : 'text-2xl'}`}>
                    {service.title}
                  </h3>
                  <p className="font-body text-smoke leading-relaxed max-w-md">{service.desc}</p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-teal opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="font-heading text-xs uppercase tracking-widest">Learn More</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-teal/40 to-transparent" />
                <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-teal/40 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
