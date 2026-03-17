import { useReveal } from '../hooks/useReveal';
export default function Services({ data }) {
  const sectionRef = useReveal();
  const services = data?.items || [];

  return (
    <section id="services" ref={sectionRef} className="mesh-bg relative py-44 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 2xl:px-16">
        <div className="reveal text-center mb-20">
          <span className="section-tag">{data?.tag || 'What We Do'}</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-bone mt-6 mb-6">
            {data?.title || 'Meet Your Growth'}
            <span className="block bg-gradient-to-r from-teal to-blue bg-clip-text text-transparent">
              {data?.titleAccent || 'Everywhere It Matters'}
            </span>
          </h2>
          <p className="font-body text-lg text-smoke max-w-2xl mx-auto">
            {data?.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
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
